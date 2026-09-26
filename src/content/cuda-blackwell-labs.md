The DGX Spark is an unusual machine to learn CUDA on. Its GB10 chip puts a Blackwell GPU and a Grace CPU in one package, and gives both of them the same 128 GB of LPDDR5X. That is a great deal of memory for a desktop box, but it is not HBM: the peak bandwidth is 273 GB/s. Most CUDA advice is written for data-centre cards with several times that, so not all of it carries over.

CUDA Blackwell Labs is the plan I worked through to find out what does. It has twenty-two small projects, each built around one question and a number that answers it. All of them ran on a single DGX Spark with CUDA 13.0.

## The machine

The first project is a hardware probe, and everything after it leans on what it found.

| | GB10 (DGX Spark) |
|---|---|
| Compute capability | 12.1 (SM121) |
| Streaming multiprocessors | 48 |
| CUDA cores | 6,144 (128 per SM) |
| L2 cache | 24 MB |
| Memory | 128 GB LPDDR5X, shared by CPU and GPU |
| Peak memory bandwidth | 273 GB/s |
| Toolkit | CUDA 13.0 |

The repository's warning about this chip is one line long: no TMEM, no WGMMA, no DSMEM. The features that recent kernel write-ups lean on are not here. The tensor-core labs therefore use the warp-level `mma.sync` instructions that SM121 does have.

## Memory before compute

Project 02 measures bandwidth, and most of what follows depends on it. I swept the working set from a few megabytes up to gigabytes, for sequential reads, writes and copies.

While the data fits in cache, the GPU reads far faster than the memory's rated peak. At a 4 MB working set, sequential reads ran at 978.15 GB/s and coalesced access at 980.34 GB/s. A deeper run reached 1,219.3 GB/s at 8 MB. Those numbers come from the L2 cache, not from LPDDR5X.

Then the cliff. At 16 MB, sequential reads fell to 275.98 GB/s. By 64 MB they had settled at 211.56 GB/s, and at 4 GB they were 201.70 GB/s, about three-quarters of the 273 GB/s peak. The drop arrives between 8 MB and 16 MB, well before the 24 MB that the spec sheet gives for L2. The repository records where it happens, not why.

<!-- figure 1 -->

Two smaller results from the same project matter as much. Random reads at a 256 MB working set managed 30.45 GB/s, under a sixth of the sequential rate. And across the labs, the access pattern mattered more than occupancy: the repository notes a sixfold difference from the pattern alone.

## Unified memory is not free

The shared 128 GB invites you to stop thinking about where data lives. Projects 18 to 20 test whether you can get away with that, looking at bandwidth through unified memory, atomic coherence between CPU and GPU, and page-fault latency.

In my deep-dive run, memory from `cudaMalloc` read at 241.5 GB/s. Managed memory with no hints read at 164.9 GB/s. Adding `cudaMemAdvise` and prefetching brought it to 165.5 GB/s, so in that run the hints did not close the gap. Allocation still matters on a unified machine.

Two practical notes came out of this part:

- `cudaMemGetInfo()` under-reports on this system. Cross-check free memory against `/proc/meminfo` before trusting it.
- Prefetching managed memory with `cudaMemPrefetchAsync` was 25 times faster than an explicit `cudaMemcpy` in my measurement.

## The toolchain in between

Several labs are about seeing what the compiler and the runtime actually do:

- **CUDA to PTX to SASS** (Project 03): the same kernel followed down through each representation.
- **Occupancy and stalls** (Project 04).
- **Streams, events and asynchronous allocation** (Project 07). The version with pinned memory and non-blocking streams finished in 2.87 ms, which the lab records as 165 times faster than its baseline.
- **CUDA Graphs** (Project 08), where capturing the same work as a graph gave a 1.86× speedup (44.9 ms), and **conditional and while graphs** (Project 12).
- **CUPTI tracing** (Project 13). Hardware counter sampling is blocked on this system with `ERR_NVGPUCTRPERM`, so tracing through CUPTI was the way to see inside a run.
- **An NVDEC decode pipeline** (Project 09) and **a PSI stall monitor** (Project 21) for the system around the GPU.

## Tensor cores, from FP32 to FP4

The compute half of the plan climbs down the precision ladder.

Project 05 races five ways of doing a matrix multiply. At 4096 × 4096, cuBLAS reached 17.9 TFLOP/s against 1.22 for the naive kernel, 14.7 times faster. Project 10 writes an FP16 tensor-core multiply by hand. My naive WMMA kernel reached about 14 TFLOP/s at 2048³, where cuBLAS reached about 83. That gap is the honest measure of what a library's tiling and pipelining are worth.

Project 06 goes through the precisions cuBLASLt offers on this chip. FP8 (E4M3) reached about 150 TFLOP/s at 4096², and NVFP4 (E2M1) about 350 TFLOP/s. Those are library numbers, not mine.

Project 16 is the smallest lab and the furthest down the stack. A single warp issues one block-scaled FP4 matrix instruction written directly in PTX:

`mma.sync.aligned.m16n8k64.row.col.kind::mxf4nvf4.block_scale.scale_vec::4X.f32.e2m1.e2m1.f32.ue4m3`

The accumulators come back with the expected values (64.0 in lane 0), which is the point: the instruction runs, with its scale factors, from hand-written code. Getting there meant compiling for `sm_121a` rather than `sm_121`. The default target's assembler rejects the `.kind::mxf4nvf4` modifier. It is a probe and a building block, not a tiled FP4 GEMM, and the lab says so.

The later projects put these pieces together: a TMA 2D tile copy (11), a tiny transformer (14), a CUTLASS 3.8 GEMM (15), an online-softmax attention kernel in the FlashAttention style (17), and a CuTe GEMM (22).

## What I would tell someone starting on a Spark

> The 128 GB is not HBM.

Plan every kernel around 273 GB/s, and treat the L2 as the real fast memory, even though it runs out before its nominal 24 MB. Do not trust `cudaMemGetInfo()` on its own. Expect profiler counters to be locked, and bring CUPTI. For the FP4 instructions, target `sm_121a`. And measure the access pattern before tuning occupancy, because on this machine it moved performance more.

Every number here is my own microbenchmark, on one DGX Spark, with CUDA 13.0, and most are single runs. The GEMM and FP8/FP4 throughputs are cuBLAS and cuBLASLt; the only tensor-core kernel of mine with a throughput figure is the naive WMMA one at about 14 TFLOP/s.
