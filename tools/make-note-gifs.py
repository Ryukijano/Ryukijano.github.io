#!/usr/bin/env python3
"""Publication-quality schematic GIFs for Distill-style field notes.

Renders PNG frames with matplotlib (Agg), stitches GIFs with Pillow.
Figures are conceptual schematics — not measured data.

Run from the repo root:

    python tools/make-note-gifs.py
"""

from __future__ import annotations

import concurrent.futures
import io
import math
import threading
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")

import numpy as np
from matplotlib.backends.backend_agg import FigureCanvasAgg
from matplotlib.figure import Figure
from matplotlib.lines import Line2D
from matplotlib.patches import (
    Circle,
    Ellipse,
    FancyArrowPatch,
    FancyBboxPatch,
    Rectangle,
    RegularPolygon,
)
from PIL import Image

# ---------------------------------------------------------------------------
# Visual language (Anthropic / Distill-adjacent paper)
# ---------------------------------------------------------------------------
PAPER = "#faf9f5"
INK = "#141413"
MUTED = "#5e5d59"
TERRACOTTA = "#c96442"
SLATE = "#6f9fd8"  # site slate-blue; brief truncated this as #6f9d8
PANEL = "#f4f2ea"
HAIRLINE = "#d4d2c8"
TERR_SOFT = "#e8c4b4"
SLATE_SOFT = "#c5d7ee"
MASK_FILL = "#eceae3"

ROOT = Path(__file__).resolve().parents[1]
GIF_DIR = ROOT / "public" / "assets" / "gifs" / "notes"
POSTER_DIR = ROOT / "public" / "assets" / "images" / "notes"

FIGSIZE = (8.8, 4.8)  # inches → 880×480 at 100 dpi (fixed; never tight-crop)
DPI = 100
N_FRAMES = 20
DURATION_MS = 100
PALETTE_COLORS = 48

# Thread-safe figure construction: never use pyplot's global current-figure.
_SAVE_LOCK = threading.Lock()


def _configure_rc() -> None:
    matplotlib.rcParams.update(
        {
            "font.family": "sans-serif",
            "font.sans-serif": ["IBM Plex Sans", "DejaVu Sans", "sans-serif"],
            "font.size": 9,
            "font.weight": "normal",
            "axes.labelweight": "bold",
            "axes.titleweight": "bold",
            "axes.labelsize": 8,
            "axes.titlesize": 10,
            "legend.fontsize": 8,
            "legend.frameon": True,
            "legend.edgecolor": HAIRLINE,
            "legend.facecolor": PAPER,
            "figure.facecolor": PAPER,
            "axes.facecolor": PAPER,
            "axes.edgecolor": INK,
            "text.color": INK,
            "axes.labelcolor": MUTED,
            "xtick.color": MUTED,
            "ytick.color": MUTED,
            "axes.linewidth": 0.8,
            "xtick.major.width": 0.6,
            "ytick.major.width": 0.6,
            "savefig.facecolor": PAPER,
            "savefig.edgecolor": "none",
            "path.simplify": True,
        }
    )


def ease(t: float) -> float:
    t = float(np.clip(t, 0.0, 1.0))
    return 0.5 - 0.5 * math.cos(math.pi * t)


def phase(t: float, t0: float, t1: float) -> float:
    if t1 <= t0:
        return 1.0 if t >= t1 else 0.0
    return ease((t - t0) / (t1 - t0))


def lerp(a, b, s: float):
    return a + (b - a) * s


def new_figure() -> Figure:
    fig = Figure(figsize=FIGSIZE, dpi=DPI, facecolor=PAPER)
    FigureCanvasAgg(fig)
    return fig


def deco_axes(fig: Figure):
    ax = fig.add_axes([0.0, 0.0, 1.0, 1.0], facecolor=PAPER)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.set_axis_off()
    ax.set_clip_on(False)
    return ax


def fig_to_image(fig: Figure) -> Image.Image:
    buf = io.BytesIO()
    with _SAVE_LOCK:
        fig.savefig(buf, format="png", dpi=DPI, facecolor=PAPER, edgecolor="none")
    buf.seek(0)
    im = Image.open(buf).convert("RGB")
    im.load()
    buf.close()
    return im


def rounded(ax, xy, w, h, fc=PANEL, ec=HAIRLINE, lw=0.8, r=0.012, z=1, ls="-"):
    patch = FancyBboxPatch(
        xy,
        w,
        h,
        boxstyle=f"round,pad=0,rounding_size={r}",
        facecolor=fc,
        edgecolor=ec,
        linewidth=lw,
        linestyle=ls,
        zorder=z,
        clip_on=False,
    )
    ax.add_patch(patch)
    return patch


def arrow(ax, p0, p1, color=INK, lw=1.15, ms=11, style="-|>", ls="-", z=6, shrink=0.0):
    ax.add_patch(
        FancyArrowPatch(
            p0,
            p1,
            arrowstyle=style,
            mutation_scale=ms,
            linewidth=lw,
            linestyle=ls,
            color=color,
            zorder=z,
            clip_on=False,
            shrinkA=shrink,
            shrinkB=shrink,
        )
    )


def txt(ax, x, y, s, size=8, color=INK, weight="bold", ha="center", va="center", **kw):
    ax.text(
        x,
        y,
        s,
        fontsize=size,
        color=color,
        fontweight=weight,
        ha=ha,
        va=va,
        clip_on=False,
        zorder=kw.pop("z", 8),
        **kw,
    )


def schematic_stamp(ax) -> None:
    txt(ax, 0.987, 0.018, "schematic", size=7, color=MUTED, weight="normal", ha="right", va="bottom", fontstyle="italic")


def panel_title(ax, x, y, s) -> None:
    txt(ax, x, y, s, size=10, color=INK, weight="bold", ha="left", va="center")


def style_inset(ax) -> None:
    ax.set_facecolor(PAPER)
    for spine in ax.spines.values():
        spine.set_color(INK)
        spine.set_linewidth(0.8)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.tick_params(colors=MUTED, labelsize=7, width=0.6, length=3.5, pad=2)
    ax.set_clip_on(False)


def bold_legend(ax, handles, loc="upper right", fontsize=8):
    leg = ax.legend(
        handles=handles,
        loc=loc,
        frameon=True,
        fancybox=False,
        borderpad=0.45,
        handletextpad=0.5,
        borderaxespad=0.4,
        prop={"weight": "bold", "size": fontsize},
    )
    frame = leg.get_frame()
    frame.set_facecolor(PAPER)
    frame.set_edgecolor(HAIRLINE)
    frame.set_linewidth(0.8)
    for t in leg.get_texts():
        t.set_color(INK)
        t.set_fontweight("bold")
    return leg


def latent_fingerprint(ax, x, y, w, h, seed: int, color=INK, alpha=1.0, n=4) -> None:
    """Tiny barcode inside a token — reads as a latent, not an RGB patch."""
    rng = np.random.RandomState(seed + 11)
    heights = 0.35 + 0.6 * rng.rand(n)
    gap = 0.08 * w
    bw = (w - gap * (n + 1)) / n
    for i, ht in enumerate(heights):
        bh = h * float(ht)
        bx = x + gap + i * (bw + gap)
        by = y + 0.12 * h
        ax.add_patch(
            Rectangle(
                (bx, by),
                bw,
                bh * 0.78,
                facecolor=color,
                edgecolor="none",
                alpha=alpha,
                zorder=7,
                clip_on=False,
            )
        )


# ===========================================================================
# 1. contrastive-views
# ===========================================================================
def _shape_points(kind: str) -> np.ndarray:
    if kind == "pos":
        theta = np.linspace(0.35 * np.pi, 1.65 * np.pi, 16)
        ring = np.column_stack([0.50 + 0.30 * np.cos(theta), 0.50 + 0.30 * np.sin(theta)])
        rng = np.random.RandomState(4)
        core = rng.randn(8, 2) * 0.05 + np.array([0.42, 0.50])
        return np.vstack([ring, core])
    rng = np.random.RandomState(21)
    blob = rng.randn(22, 2) * 0.16 + np.array([0.62, 0.40])
    return np.clip(blob, 0.08, 0.92)


def _augment_cloud(pts: np.ndarray, t: float, view: int) -> np.ndarray:
    """Jitter / rotate a view during the first half of the loop."""
    j = phase(t, 0.0, 0.42)
    amp = 0.045 * (0.25 + 0.75 * math.sin(2 * math.pi * t) ** 2) * (1.0 if t < 0.5 else 0.35)
    rng = np.random.RandomState(view * 19 + 7)
    jitter = (rng.randn(*pts.shape) * amp) * (0.4 + 0.6 * j)
    angle = (0.18 if view == 0 else -0.22 if view == 1 else 0.31) * math.sin(2 * math.pi * t)
    if t > 0.5:
        angle *= 0.2
    c, s = math.cos(angle), math.sin(angle)
    rot = np.array([[c, -s], [s, c]])
    centered = pts - 0.5
    out = centered @ rot.T + 0.5 + jitter
    shift = np.array([0.04, -0.03]) * (1 if view == 0 else -1 if view == 1 else 0.4)
    return np.clip(out + shift * 0.5, 0.04, 0.96)


def _draw_cloud_panel(ax, x, y, w, h, pts, color, title, badge) -> None:
    rounded(ax, (x, y), w, h, fc=PAPER, ec=HAIRLINE, lw=0.9, r=0.01, z=2)
    # faint patch grid behind the cloud
    n = 4
    for i in range(n + 1):
        gx = x + 0.08 * w + i * (0.84 * w / n)
        gy = y + 0.12 * h + i * (0.72 * h / n)
        ax.plot([x + 0.08 * w, x + 0.92 * w], [gy, gy], color=HAIRLINE, lw=0.4, zorder=3, clip_on=False)
        ax.plot([gx, gx], [y + 0.12 * h, y + 0.84 * h], color=HAIRLINE, lw=0.4, zorder=3, clip_on=False)
    px = x + 0.08 * w + pts[:, 0] * 0.84 * w
    py = y + 0.12 * h + pts[:, 1] * 0.72 * h
    ax.scatter(px, py, s=16, c=color, edgecolors=INK, linewidths=0.35, zorder=5, clip_on=False)
    txt(ax, x + 0.06 * w, y + h - 0.045, title, size=7.5, color=INK, weight="bold", ha="left", va="top")
    txt(ax, x + w - 0.05 * w, y + h - 0.045, badge, size=7.5, color=color, weight="bold", ha="right", va="top")


def draw_contrastive(i: int) -> Image.Image:
    t = i / (N_FRAMES - 1)
    fig = new_figure()
    ax = deco_axes(fig)
    schematic_stamp(ax)
    panel_title(ax, 0.045, 0.955, "Contrastive views → shared embedding")
    txt(
        ax,
        0.045,
        0.915,
        "Two augmentations of one example pull together; a third view is a negative.",
        size=8,
        color=MUTED,
        weight="normal",
        ha="left",
    )

    pos = _shape_points("pos")
    neg = _shape_points("neg")
    a = _augment_cloud(pos, t, 0)
    b = _augment_cloud(pos, t, 1)
    c = _augment_cloud(neg, t, 2)

    _draw_cloud_panel(ax, 0.045, 0.62, 0.23, 0.26, a, TERRACOTTA, "view A", "+")
    _draw_cloud_panel(ax, 0.045, 0.335, 0.23, 0.26, b, TERRACOTTA, "view B", "+")
    _draw_cloud_panel(ax, 0.045, 0.05, 0.23, 0.26, c, SLATE, "view C", "−")

    # encoder pills
    for ey in (0.75, 0.465, 0.18):
        rounded(ax, (0.295, ey - 0.028), 0.055, 0.056, fc=PAPER, ec=INK, lw=0.8, r=0.008, z=4)
        txt(ax, 0.322, ey, r"$f_\theta$", size=8, color=INK, weight="bold")

    arrow(ax, (0.275, 0.75), (0.295, 0.75), color=MUTED, lw=0.9, ms=8)
    arrow(ax, (0.275, 0.465), (0.295, 0.465), color=MUTED, lw=0.9, ms=8)
    arrow(ax, (0.275, 0.18), (0.295, 0.18), color=MUTED, lw=0.9, ms=8)
    arrow(ax, (0.350, 0.75), (0.445, 0.70), color=TERRACOTTA, lw=1.05, ms=9)
    arrow(ax, (0.350, 0.465), (0.445, 0.50), color=TERRACOTTA, lw=1.05, ms=9)
    arrow(ax, (0.350, 0.18), (0.445, 0.28), color=SLATE, lw=1.05, ms=9)

    # embedding inset with conceptual axes
    e = fig.add_axes([0.46, 0.12, 0.50, 0.74])
    style_inset(e)
    e.set_xlim(-1.15, 1.15)
    e.set_ylim(-1.15, 1.15)
    e.set_xlabel("embedding dim A", fontweight="bold")
    e.set_ylabel("embedding dim B", fontweight="bold")
    e.set_xticks([-1, 0, 1])
    e.set_yticks([-1, 0, 1])
    e.axhline(0, color=HAIRLINE, lw=0.6, zorder=0)
    e.axvline(0, color=HAIRLINE, lw=0.6, zorder=0)
    e.set_title("shared embedding space", fontweight="bold", color=INK, loc="left", pad=6)

    z1_0 = np.array([-0.62, 0.58])
    z2_0 = np.array([0.70, -0.22])
    meet = np.array([0.18, 0.28])
    zneg = np.array([-0.55, -0.72])
    pull = phase(t, 0.40, 0.88)
    z1 = lerp(z1_0, meet + np.array([-0.10, 0.08]), pull)
    z2 = lerp(z2_0, meet + np.array([0.10, -0.08]), pull)

    # attraction / repulsion marks
    e.annotate(
        "",
        xy=z2,
        xytext=z1,
        arrowprops=dict(arrowstyle="<->", color=TERRACOTTA, lw=1.3, mutation_scale=10),
        zorder=3,
    )
    e.plot([z1[0], zneg[0]], [z1[1], zneg[1]], color=SLATE, lw=0.8, ls="--", zorder=2)
    e.scatter(*z1, s=90, c=TERRACOTTA, edgecolors=INK, linewidths=0.6, zorder=5, label="positive")
    e.scatter(*z2, s=90, c=TERRACOTTA, edgecolors=INK, linewidths=0.6, zorder=5)
    e.scatter(*zneg, s=90, c=SLATE, edgecolors=INK, linewidths=0.6, zorder=5, label="negative")
    e.text(z1[0], z1[1] + 0.14, r"$z_A$", ha="center", va="bottom", fontweight="bold", color=INK, fontsize=8)
    e.text(z2[0], z2[1] + 0.14, r"$z_B$", ha="center", va="bottom", fontweight="bold", color=INK, fontsize=8)
    e.text(zneg[0], zneg[1] - 0.14, r"$z_C$", ha="center", va="top", fontweight="bold", color=INK, fontsize=8)
    if pull > 0.55:
        e.text(
            0.18,
            0.52,
            "pull +",
            ha="center",
            va="center",
            fontweight="bold",
            color=TERRACOTTA,
            fontsize=8,
        )

    handles = [
        Line2D([0], [0], marker="o", color="none", markerfacecolor=TERRACOTTA, markeredgecolor=INK, markersize=8, label="positive pair"),
        Line2D([0], [0], marker="o", color="none", markerfacecolor=SLATE, markeredgecolor=INK, markersize=8, label="negative"),
        Line2D([0], [0], color=TERRACOTTA, lw=1.4, label="attract"),
    ]
    bold_legend(e, handles, loc="upper right")
    return fig_to_image(fig)


# ===========================================================================
# 2. latent-predict  (JEPA — predict latents, not pixels)
# ===========================================================================
def _token_box(ax, x, y, w, h, kind: str, seed: int, fill: float) -> None:
    if kind == "context":
        rounded(ax, (x, y), w, h, fc=SLATE_SOFT, ec=INK, lw=0.8, r=0.008, z=4)
        latent_fingerprint(ax, x + 0.08 * w, y + 0.18 * h, 0.84 * w, 0.62 * h, seed, color=INK, alpha=1)
    elif kind == "mask":
        rounded(ax, (x, y), w, h, fc=MASK_FILL, ec=MUTED, lw=0.8, r=0.008, z=4, ls="--")
        ax.add_patch(
            Rectangle((x, y), w, h, facecolor="none", edgecolor=MUTED, hatch="///", linewidth=0, zorder=5, alpha=0.55)
        )
        txt(ax, x + 0.5 * w, y + 0.52 * h, "?", size=11, color=MUTED, weight="bold")
    else:  # predicted latent
        rounded(ax, (x, y), w, h, fc=TERR_SOFT, ec=TERRACOTTA, lw=0.9, r=0.008, z=4)
        latent_fingerprint(ax, x + 0.08 * w, y + 0.18 * h, 0.84 * w, 0.62 * h, seed, color=TERRACOTTA, alpha=max(0.2, fill))


def draw_latent_predict(i: int) -> Image.Image:
    t = i / (N_FRAMES - 1)
    mask_on = phase(t, 0.08, 0.32)
    pred_on = phase(t, 0.48, 0.92)
    fig = new_figure()
    ax = deco_axes(fig)
    schematic_stamp(ax)
    panel_title(ax, 0.045, 0.955, "Latent prediction (JEPA)")
    txt(
        ax,
        0.045,
        0.915,
        "Mask tokens, then predict their latents — not a pixel reconstruction.",
        size=8,
        color=MUTED,
        weight="normal",
        ha="left",
    )

    n = 8
    masked = {2, 4, 5}
    x0, y0, tw, th, gap = 0.05, 0.70, 0.085, 0.12, 0.018
    txt(ax, x0, 0.845, "input tokens", size=8, color=MUTED, weight="bold", ha="left")
    for k in range(n):
        x = x0 + k * (tw + gap)
        kind = "context"
        if k in masked and mask_on > 0.45:
            kind = "pred" if pred_on > 0.35 else "mask"
        _token_box(ax, x, y0, tw, th, kind, seed=k, fill=pred_on)
        txt(ax, x + tw / 2, y0 - 0.028, f"t{k+1}", size=7, color=MUTED, weight="normal")

    # predictor block
    rounded(ax, (0.05, 0.46), 0.28, 0.16, fc=PAPER, ec=TERRACOTTA, lw=1.1, r=0.012, z=3)
    txt(ax, 0.19, 0.555, "predictor  gθ", size=9, color=TERRACOTTA, weight="bold")
    txt(ax, 0.19, 0.505, "context latents → ẑ_masked", size=7.5, color=MUTED, weight="normal")
    arrow(ax, (0.38, 0.54), (0.48, 0.54), color=TERRACOTTA, lw=1.4, ms=12)

    txt(ax, 0.50, 0.62, "predicted latents  (not RGB)", size=8, color=INK, weight="bold", ha="left")
    for j, k in enumerate(sorted(masked)):
        x = 0.50 + j * 0.12
        show = pred_on > 0.12 or mask_on > 0.5
        if not show:
            continue
        filled = pred_on > 0.22
        rounded(
            ax,
            (x, 0.46),
            0.10,
            0.14,
            fc=TERR_SOFT if filled else MASK_FILL,
            ec=TERRACOTTA if filled else MUTED,
            lw=0.9,
            r=0.01,
            z=4,
        )
        if filled:
            latent_fingerprint(ax, x + 0.012, 0.485, 0.076, 0.09, seed=k + 40, color=TERRACOTTA, alpha=pred_on)
        else:
            txt(ax, x + 0.05, 0.53, "…", size=11, color=MUTED, weight="bold")
        txt(ax, x + 0.05, 0.435, rf"$\hat{{z}}_{k+1}$", size=8, color=INK, weight="bold")

    # latent-space inset
    e = fig.add_axes([0.08, 0.08, 0.58, 0.32])
    style_inset(e)
    e.set_xlim(-0.2, 7.4)
    e.set_ylim(-0.15, 1.25)
    e.set_xlabel("token index  (sequence)", fontweight="bold")
    e.set_ylabel("latent coord  (schematic)", fontweight="bold")
    e.set_xticks(range(8))
    e.set_xticklabels([f"t{k+1}" for k in range(8)])
    e.set_yticks([0, 0.5, 1.0])
    e.set_title("latent space — fill missing ẑ, not pixels", fontweight="bold", color=INK, loc="left", pad=4)

    rng = np.random.RandomState(3)
    ctx_y = 0.35 + 0.45 * rng.rand(8)
    pred_y = 0.30 + 0.50 * np.array([0.62, 0.28, 0.74])  # for masked 2,4,5
    xs = np.arange(8)
    for k in range(8):
        if k in masked:
            continue
        e.scatter(xs[k], ctx_y[k], s=42, c=SLATE, edgecolors=INK, linewidths=0.5, zorder=4)
        e.vlines(xs[k], 0, ctx_y[k], colors=SLATE, lw=1.1, zorder=3)
    mi = 0
    for k in sorted(masked):
        if pred_on > 0.18:
            yy = 0.12 + pred_y[mi] * pred_on
            e.scatter(xs[k], yy, s=52, c=TERRACOTTA, edgecolors=INK, linewidths=0.5, zorder=5)
            e.vlines(xs[k], 0, yy, colors=TERRACOTTA, lw=1.4, zorder=3)
        elif mask_on > 0.5:
            e.scatter(xs[k], 0.55, s=36, facecolors=PAPER, edgecolors=MUTED, linewidths=1.0, zorder=4)
        mi += 1

    handles = [
        Line2D([0], [0], marker="o", color="none", markerfacecolor=SLATE, markeredgecolor=INK, markersize=7, label="observed latent"),
        Line2D([0], [0], marker="o", color="none", markerfacecolor=TERRACOTTA, markeredgecolor=INK, markersize=7, label="predicted latent"),
    ]
    bold_legend(e, handles, loc="upper right", fontsize=7.5)

    # reminder callout
    rounded(ax, (0.72, 0.08), 0.24, 0.32, fc=PAPER, ec=HAIRLINE, lw=0.8, r=0.012, z=2)
    txt(ax, 0.84, 0.34, "not this", size=8, color=MUTED, weight="bold")
    # crossed-out fake RGB patch
    rounded(ax, (0.775, 0.14), 0.13, 0.14, fc="#d9c2b0", ec=MUTED, lw=0.7, r=0.008, z=3)
    ax.plot([0.785, 0.895], [0.155, 0.265], color=TERRACOTTA, lw=1.6, zorder=6)
    ax.plot([0.785, 0.895], [0.265, 0.155], color=TERRACOTTA, lw=1.6, zorder=6)
    txt(ax, 0.84, 0.115, "pixel decode", size=7, color=MUTED, weight="normal")
    return fig_to_image(fig)


# ===========================================================================
# 3. video-temporal
# ===========================================================================
def _mini_frame(ax, x, y, w, h, ball_u: float, idx: int, highlight: bool) -> None:
    ec = TERRACOTTA if highlight else INK
    lw = 1.3 if highlight else 0.8
    rounded(ax, (x, y), w, h, fc=PAPER, ec=ec, lw=lw, r=0.008, z=4)
    # horizon
    ax.plot([x + 0.08 * w, x + 0.92 * w], [y + 0.38 * h, y + 0.38 * h], color=HAIRLINE, lw=0.8, zorder=5)
    bx = x + 0.12 * w + ball_u * 0.76 * w
    by = y + 0.52 * h
    ax.add_patch(Circle((bx, by), 0.07 * h, facecolor=TERRACOTTA, edgecolor=INK, lw=0.4, zorder=6, clip_on=False))
    txt(ax, x + 0.12 * w, y + 0.14 * h, f"{idx}", size=7, color=MUTED, weight="bold", ha="left", va="center")


def draw_video_temporal(i: int) -> Image.Image:
    t = i / (N_FRAMES - 1)
    fig = new_figure()
    ax = deco_axes(fig)
    schematic_stamp(ax)
    panel_title(ax, 0.045, 0.955, "Order ignored  vs  temporal encoder")
    txt(
        ax,
        0.045,
        0.915,
        "A bag of frames cannot see motion; an ordered stream can.",
        size=8,
        color=MUTED,
        weight="normal",
        ha="left",
    )

    n = 5
    balls = np.linspace(0.08, 0.92, n)

    # ---- left: bag of shuffled frames ----
    rounded(ax, (0.04, 0.08), 0.44, 0.78, fc=PAPER, ec=HAIRLINE, lw=0.9, r=0.014, z=1)
    txt(ax, 0.26, 0.81, "bag of frames", size=10, color=INK, weight="bold")
    txt(ax, 0.26, 0.775, "order ignored  ·  permutation invariant", size=7.5, color=MUTED, weight="normal")
    bag = Ellipse((0.26, 0.42), 0.36, 0.52, facecolor=PANEL, edgecolor=MUTED, lw=1.0, ls="--", zorder=2)
    ax.add_patch(bag)

    fw, fh = 0.088, 0.125
    for k in range(n):
        ang = -0.55 + k * (2 * math.pi / n) + 2 * math.pi * t * 0.55
        px = 0.26 + 0.125 * math.cos(ang) - fw / 2
        py = 0.42 + 0.175 * math.sin(ang) - fh / 2
        _mini_frame(ax, px, py, fw, fh, balls[k], k + 1, highlight=False)
    txt(ax, 0.26, 0.12, "shuffle", size=8, color=MUTED, weight="bold")

    # ---- right: ordered temporal flow ----
    rounded(ax, (0.52, 0.08), 0.44, 0.78, fc=PAPER, ec=HAIRLINE, lw=0.9, r=0.014, z=1)
    txt(ax, 0.74, 0.81, "ordered stream", size=10, color=INK, weight="bold")
    txt(ax, 0.74, 0.775, "time is a first-class axis", size=7.5, color=MUTED, weight="normal")

    cursor = int(phase(t, 0.0, 1.0) * (n - 0.01))
    y_row = 0.58
    fw2, fh2 = 0.068, 0.11
    x_start = 0.555
    for k in range(n):
        x = x_start + k * (fw2 + 0.012)
        _mini_frame(ax, x, y_row, fw2, fh2, balls[k], k + 1, highlight=(k == cursor))
        if k < n - 1:
            arrow(ax, (x + fw2 + 0.002, y_row + fh2 / 2), (x + fw2 + 0.011, y_row + fh2 / 2), color=MUTED, lw=0.8, ms=7)
    txt(ax, 0.555, 0.545, "time →", size=8, color=MUTED, weight="bold", ha="left")

    # temporal encoder block
    rounded(ax, (0.58, 0.28), 0.32, 0.18, fc=SLATE_SOFT, ec=SLATE, lw=1.05, r=0.012, z=3)
    txt(ax, 0.74, 0.40, "temporal encoder", size=9, color=INK, weight="bold")
    txt(ax, 0.74, 0.355, "self-attention over t   /   conv-1d", size=7, color=MUTED, weight="normal")
    # flow from frames into encoder
    arrow(ax, (0.74, 0.57), (0.74, 0.46), color=SLATE, lw=1.3, ms=11)
    # output
    arrow(ax, (0.74, 0.28), (0.74, 0.205), color=SLATE, lw=1.3, ms=11)
    rounded(ax, (0.64, 0.12), 0.20, 0.075, fc=PAPER, ec=INK, lw=0.85, r=0.01, z=4)
    txt(ax, 0.74, 0.157, r"$z_{\mathrm{video}}$", size=9, color=INK, weight="bold")

    # circulating flow highlight along the ordered row
    flow = phase(t, 0.0, 1.0)
    fx = x_start + flow * (n - 1) * (fw2 + 0.012)
    ax.add_patch(Circle((fx + fw2 / 2, y_row - 0.025), 0.008, facecolor=TERRACOTTA, edgecolor="none", zorder=8))
    return fig_to_image(fig)


# ===========================================================================
# 4. sft-then-rl
# ===========================================================================
def draw_sft_then_rl(i: int) -> Image.Image:
    t = i / (N_FRAMES - 1)
    fig = new_figure()
    ax = deco_axes(fig)
    schematic_stamp(ax)
    panel_title(ax, 0.045, 0.955, "SFT, then RL")
    txt(
        ax,
        0.045,
        0.915,
        "Clone demonstrations first; then close the loop with reward.",
        size=8,
        color=MUTED,
        weight="normal",
        ha="left",
    )

    # left SFT panel
    rounded(ax, (0.04, 0.08), 0.42, 0.78, fc=PAPER, ec=HAIRLINE, lw=0.9, r=0.014, z=1)
    txt(ax, 0.25, 0.80, "SFT", size=12, color=INK, weight="bold")
    txt(ax, 0.25, 0.762, "behaviour cloning   x → y", size=8, color=MUTED, weight="normal")

    demos = [(r"$x_1$", r"$y_1$"), (r"$x_2$", r"$y_2$"), (r"$x_3$", r"$y_3$")]
    for d, (xs, ys) in enumerate(demos):
        appear = phase(t, 0.04 + d * 0.12, 0.20 + d * 0.12)
        y = 0.60 - d * 0.155
        alpha_ec = TERRACOTTA if appear > 0.85 else HAIRLINE
        rounded(ax, (0.075, y), 0.12, 0.088, fc=PANEL, ec=INK, lw=0.8, r=0.01, z=3)
        txt(ax, 0.135, y + 0.052, xs, size=9, color=INK, weight="bold")
        txt(ax, 0.135, y + 0.022, "state", size=6.5, color=MUTED, weight="normal")
        if appear > 0.08:
            arrow(ax, (0.205, y + 0.044), (0.205 + 0.11 * appear, y + 0.044), color=TERRACOTTA, lw=1.35, ms=11)
        rounded(ax, (0.325, y), 0.105, 0.088, fc=TERR_SOFT if appear > 0.7 else PANEL, ec=alpha_ec, lw=0.85, r=0.01, z=3)
        txt(ax, 0.377, y + 0.052, ys, size=9, color=INK if appear > 0.4 else MUTED, weight="bold")
        txt(ax, 0.377, y + 0.022, "action", size=6.5, color=MUTED, weight="normal")

    txt(ax, 0.25, 0.145, r"$\mathcal{L}_{\mathrm{BC}} \;=\; \|\,\pi_\theta(x)-y\,\|$", size=8.5, color=MUTED, weight="bold")

    # THEN pill
    rounded(ax, (0.455, 0.44), 0.09, 0.07, fc=TERRACOTTA, ec=TERRACOTTA, lw=0, r=0.02, z=5)
    txt(ax, 0.50, 0.475, "then", size=8, color=PAPER, weight="bold")

    # right RL panel
    rounded(ax, (0.54, 0.08), 0.42, 0.78, fc=PAPER, ec=HAIRLINE, lw=0.9, r=0.014, z=1)
    txt(ax, 0.75, 0.80, "RL", size=12, color=INK, weight="bold")
    txt(ax, 0.75, 0.762, "env → reward → update", size=8, color=MUTED, weight="normal")

    cx, cy, rr = 0.75, 0.425, 0.138
    nodes = [
        (cx, cy + rr, r"agent  $\pi_\theta$"),
        (cx + rr, cy, "action"),
        (cx, cy - rr, "env"),
        (cx - rr, cy, r"reward  $r$"),
    ]
    # circulating highlight
    loop_u = (phase(t, 0.40, 1.0) * 4.0) % 4.0
    active = int(loop_u) if t > 0.40 else -1

    # loop path
    circle = Circle((cx, cy), rr, facecolor="none", edgecolor=HAIRLINE, lw=1.2, zorder=2)
    ax.add_patch(circle)
    # directional arrows on the circle
    for ang in (45, 135, 225, 315):
        rad = math.radians(ang)
        px = cx + rr * math.cos(rad)
        py = cy + rr * math.sin(rad)
        tx = -math.sin(rad)
        ty = math.cos(rad)
        arrow(ax, (px - 0.012 * tx, py - 0.012 * ty), (px + 0.012 * tx, py + 0.012 * ty), color=MUTED, lw=0.9, ms=8)

    for ni, (nx, ny, lab) in enumerate(nodes):
        on = ni == active
        rounded(
            ax,
            (nx - 0.062, ny - 0.034),
            0.124,
            0.068,
            fc=TERR_SOFT if on else PAPER,
            ec=TERRACOTTA if on else INK,
            lw=1.15 if on else 0.85,
            r=0.012,
            z=4,
        )
        txt(ax, nx, ny, lab, size=7.5, color=INK, weight="bold")

    # circulating bead
    if t > 0.40:
        ang = math.radians(90 - loop_u * 90)
        bx = cx + rr * math.cos(ang)
        by = cy + rr * math.sin(ang)
        ax.add_patch(Circle((bx, by), 0.012, facecolor=TERRACOTTA, edgecolor=INK, lw=0.4, zorder=7))

    txt(ax, 0.75, 0.145, r"$\theta \leftarrow \theta + \alpha\,\nabla \hat{A}$", size=8.5, color=MUTED, weight="bold")
    return fig_to_image(fig)


# ===========================================================================
# 5. denoise-trajectory
# ===========================================================================
def _blob_to_structure(rng: np.random.RandomState, n: int, target: np.ndarray, s: float) -> np.ndarray:
    noise = rng.randn(n, 2)
    # map particles toward target slots
    idx = np.arange(n) % len(target)
    dest = target[idx] + rng.randn(n, 2) * (0.04 * (1 - s))
    return (1 - s) * (noise * 0.22 + 0.0) + s * dest + (1 - s) * rng.randn(n, 2) * 0.05


def draw_denoise(i: int) -> Image.Image:
    t = i / (N_FRAMES - 1)
    s = phase(t, 0.05, 0.90)
    fig = new_figure()
    ax = deco_axes(fig)
    schematic_stamp(ax)
    panel_title(ax, 0.045, 0.955, "Denoise trajectory")
    txt(
        ax,
        0.045,
        0.915,
        "One noisy blob; two read-outs — pixels/actions vs tokens.",
        size=8,
        color=MUTED,
        weight="normal",
        ha="left",
    )

    # shared conceptual x-axis
    ax.annotate(
        "",
        xy=(0.93, 0.07),
        xytext=(0.22, 0.07),
        arrowprops=dict(arrowstyle="-|>", color=INK, lw=1.0, mutation_scale=9),
        zorder=4,
    )
    txt(ax, 0.22, 0.045, "high noise", size=8, color=MUTED, weight="bold", ha="left")
    txt(ax, 0.93, 0.045, "low noise  /  structure", size=8, color=MUTED, weight="bold", ha="right")
    txt(ax, 0.575, 0.028, "denoising step  t  (schematic)", size=7.5, color=MUTED, weight="normal")

    # moving read-head
    hx = lerp(0.24, 0.90, s)
    ax.plot([hx, hx], [0.10, 0.86], color=HAIRLINE, lw=0.9, ls=":", zorder=2)
    ax.add_patch(RegularPolygon((hx, 0.07), 3, radius=0.012, orientation=0, facecolor=TERRACOTTA, edgecolor="none", zorder=6))

    # ---- track A: pixels / actions ----
    rounded(ax, (0.04, 0.50), 0.92, 0.36, fc=PAPER, ec=HAIRLINE, lw=0.85, r=0.012, z=1)
    txt(ax, 0.055, 0.82, "pixels  /  actions", size=9, color=INK, weight="bold", ha="left")

    n_act = 8
    n_stat = 4
    stations = np.linspace(0.24, 0.80, n_stat)
    station_t = ["t = T", r"$t \approx 2T/3$", r"$t \approx T/3$", "t = 0"]
    targets_a = np.column_stack([np.linspace(-0.32, 0.32, n_act), np.zeros(n_act)])
    for si, sx in enumerate(stations):
        # Left (t=T) stays noisy; right (t=0) resolves. Structure grows rightward.
        local = float(s * (si / (n_stat - 1)))
        pts = _blob_to_structure(np.random.RandomState(9 + si), 48, targets_a, local)
        px = sx + pts[:, 0] * 0.10
        py = 0.66 + pts[:, 1] * 0.14
        col = TERRACOTTA if local > 0.55 else MUTED
        ax.scatter(px, py, s=7, c=col, edgecolors="none", alpha=0.88 * (1.0 - 0.82 * local), zorder=4, clip_on=False)
        if local > 0.62:
            bar_a = (local - 0.62) / 0.38
            for k in range(n_act):
                bx = sx - 0.072 + k * 0.018
                bh = (0.035 + 0.075 * (0.25 + 0.75 * ((k * 3 + 1) % 5) / 5)) * bar_a
                ax.add_patch(
                    Rectangle((bx, 0.575), 0.014, bh, facecolor=TERRACOTTA, edgecolor=INK, lw=0.25, zorder=5, alpha=bar_a)
                )
        txt(ax, sx, 0.525, station_t[si], size=7, color=MUTED, weight="normal")

    # ---- track B: tokens (reading) ----
    rounded(ax, (0.04, 0.12), 0.92, 0.36, fc=PAPER, ec=HAIRLINE, lw=0.85, r=0.012, z=1)
    txt(ax, 0.055, 0.44, "tokens  (reading)", size=9, color=INK, weight="bold", ha="left")

    token_labels = ["the", "cat", "sat", "on", "the", "mat"]
    targets_b = np.column_stack([np.linspace(-0.34, 0.34, 6), np.zeros(6)])
    tw = 0.048
    gap_t = 0.006
    row_w = 6 * tw + 5 * gap_t
    for si, sx in enumerate(stations):
        local = float(s * (si / (n_stat - 1)))
        pts = _blob_to_structure(np.random.RandomState(21 + si), 40, targets_b, local)
        px = sx + pts[:, 0] * 0.10
        py = 0.28 + pts[:, 1] * 0.13
        col = SLATE if local > 0.55 else MUTED
        ax.scatter(px, py, s=7, c=col, edgecolors="none", alpha=0.88 * (1.0 - 0.82 * local), zorder=4, clip_on=False)
        if local > 0.78:
            bar_a = (local - 0.78) / 0.22
            bx0 = sx - row_w / 2
            for k, lab in enumerate(token_labels):
                bx = bx0 + k * (tw + gap_t)
                rounded(ax, (bx, 0.205), tw, 0.065, fc=SLATE_SOFT, ec=SLATE, lw=0.7, r=0.006, z=6)
                txt(ax, bx + tw / 2, 0.237, lab, size=6.5, color=INK, weight="bold", alpha=bar_a)

    handles = [
        Line2D([0], [0], marker="o", color="none", markerfacecolor=TERRACOTTA, markersize=7, label="pixels / actions"),
        Line2D([0], [0], marker="s", color="none", markerfacecolor=SLATE_SOFT, markeredgecolor=SLATE, markersize=7, label="tokens (reading)"),
    ]
    # legend on deco axes
    leg = ax.legend(
        handles=handles,
        loc="upper right",
        bbox_to_anchor=(0.98, 0.90),
        frameon=True,
        fancybox=False,
        prop={"weight": "bold", "size": 8},
    )
    leg.get_frame().set_facecolor(PAPER)
    leg.get_frame().set_edgecolor(HAIRLINE)
    for t_ in leg.get_texts():
        t_.set_fontweight("bold")
        t_.set_color(INK)
    return fig_to_image(fig)


# ===========================================================================
# 6. ssl-family  (contrastive vs self-distillation)
# ===========================================================================
def draw_ssl_family(i: int) -> Image.Image:
    t = i / (N_FRAMES - 1)
    pull = phase(t, 0.12, 0.88)
    fig = new_figure()
    ax = deco_axes(fig)
    schematic_stamp(ax)
    panel_title(ax, 0.045, 0.955, "Two SSL families")
    txt(
        ax,
        0.045,
        0.915,
        "Same job: a geometry without y. Different anti-collapse device.",
        size=8,
        color=MUTED,
        weight="normal",
        ha="left",
    )

    rounded(ax, (0.035, 0.08), 0.45, 0.80, fc=PAPER, ec=HAIRLINE, lw=0.9, r=0.014, z=1)
    txt(ax, 0.26, 0.82, "Contrastive", size=11, color=INK, weight="bold")
    txt(ax, 0.26, 0.785, "InfoNCE  ·  SimCLR  ·  MoCo", size=7.5, color=MUTED, weight="normal")

    z1 = np.array([0.13, 0.58])
    z2 = np.array([0.39, 0.58])
    meet = np.array([0.26, 0.52])
    zneg = np.array([0.26, 0.22])
    p1 = lerp(z1, meet + np.array([-0.045, 0.02]), pull)
    p2 = lerp(z2, meet + np.array([0.045, -0.02]), pull)
    npos = lerp(zneg, np.array([0.26, 0.18]), pull)

    ax.annotate(
        "",
        xy=p2,
        xytext=p1,
        arrowprops=dict(arrowstyle="<->", color=TERRACOTTA, lw=1.35, mutation_scale=11),
        zorder=3,
    )
    ax.plot([p1[0], npos[0]], [p1[1], npos[1]], color=SLATE, lw=0.9, ls="--", zorder=2)
    ax.plot([p2[0], npos[0]], [p2[1], npos[1]], color=SLATE, lw=0.9, ls="--", zorder=2)
    ax.scatter(*p1, s=110, c=TERRACOTTA, edgecolors=INK, linewidths=0.6, zorder=5)
    ax.scatter(*p2, s=110, c=TERRACOTTA, edgecolors=INK, linewidths=0.6, zorder=5)
    ax.scatter(*npos, s=110, c=SLATE, edgecolors=INK, linewidths=0.6, zorder=5)
    txt(ax, p1[0], p1[1] + 0.055, r"$z_A$", size=8, color=INK, weight="bold")
    txt(ax, p2[0], p2[1] + 0.055, r"$z_B$", size=8, color=INK, weight="bold")
    txt(ax, npos[0], npos[1] - 0.05, r"$z^{-}$", size=8, color=INK, weight="bold")
    txt(ax, 0.26, 0.12, "negatives keep the space from a point", size=7.5, color=MUTED, weight="normal")

    rounded(ax, (0.515, 0.08), 0.45, 0.80, fc=PAPER, ec=HAIRLINE, lw=0.9, r=0.014, z=1)
    txt(ax, 0.74, 0.82, "Self-distillation", size=11, color=INK, weight="bold")
    txt(ax, 0.74, 0.785, "BYOL  ·  SimSiam  ·  DINO", size=7.5, color=MUTED, weight="normal")

    rounded(ax, (0.56, 0.58), 0.16, 0.12, fc=SLATE_SOFT, ec=SLATE, lw=1.0, r=0.012, z=4)
    txt(ax, 0.64, 0.655, r"teacher  $f_{\bar\theta}$", size=8, color=INK, weight="bold")
    txt(ax, 0.64, 0.615, "momentum", size=7, color=MUTED, weight="normal")
    rounded(ax, (0.76, 0.58), 0.16, 0.12, fc=TERR_SOFT, ec=TERRACOTTA, lw=1.0, r=0.012, z=4)
    txt(ax, 0.84, 0.655, r"student  $f_\theta$", size=8, color=INK, weight="bold")
    txt(ax, 0.84, 0.615, "online", size=7, color=MUTED, weight="normal")
    arrow(ax, (0.72, 0.64), (0.76, 0.64), color=TERRACOTTA, lw=1.2, ms=10)

    n_bar = 6
    teacher = np.array([0.08, 0.18, 0.42, 0.12, 0.09, 0.11])
    teacher = teacher / teacher.sum()
    student0 = np.full(n_bar, 1.0 / n_bar)
    student = lerp(student0, teacher, pull)
    bx0, bw, gap = 0.58, 0.028, 0.018
    for k in range(n_bar):
        x = bx0 + k * (bw + gap)
        ax.add_patch(Rectangle((x, 0.28), bw, 0.22 * teacher[k] / teacher.max(), facecolor=SLATE, edgecolor=INK, lw=0.3, zorder=4))
        ax.add_patch(
            Rectangle(
                (x + 0.19, 0.28),
                bw,
                0.22 * student[k] / teacher.max(),
                facecolor=TERRACOTTA,
                edgecolor=INK,
                lw=0.3,
                zorder=4,
            )
        )
    txt(ax, 0.64, 0.24, "teacher p", size=7.5, color=MUTED, weight="bold")
    txt(ax, 0.83, 0.24, "student p", size=7.5, color=MUTED, weight="bold")
    txt(ax, 0.74, 0.12, "no negative batch  ·  match the teacher", size=7.5, color=MUTED, weight="normal")
    handles = [
        Line2D([0], [0], marker="o", color="none", markerfacecolor=TERRACOTTA, markeredgecolor=INK, markersize=8, label="positive pair / student"),
        Line2D([0], [0], marker="o", color="none", markerfacecolor=SLATE, markeredgecolor=INK, markersize=8, label="negative / teacher"),
    ]
    leg = ax.legend(
        handles=handles,
        loc="upper right",
        bbox_to_anchor=(0.985, 0.905),
        frameon=True,
        fancybox=False,
        borderpad=0.4,
        prop={"weight": "bold", "size": 7.5},
    )
    frame = leg.get_frame()
    frame.set_facecolor(PAPER)
    frame.set_edgecolor(HAIRLINE)
    frame.set_linewidth(0.8)
    for t_ in leg.get_texts():
        t_.set_color(INK)
        t_.set_fontweight("bold")
    return fig_to_image(fig)


# ===========================================================================
# 7. qec-pipeline  (hidden error → syndrome → recovery)
# ===========================================================================
def draw_qec_pipeline(i: int) -> Image.Image:
    t = i / (N_FRAMES - 1)
    hide = phase(t, 0.00, 0.18)
    fire = phase(t, 0.16, 0.42)
    infer = phase(t, 0.38, 0.62)
    act = phase(t, 0.52, 0.80)
    fig = new_figure()
    ax = deco_axes(fig)
    schematic_stamp(ax)
    panel_title(ax, 0.045, 0.955, "Hidden error  →  syndrome  →  recovery")
    txt(
        ax,
        0.045,
        0.915,
        "The decoder never sees the state. It sees detector clicks.",
        size=8,
        color=MUTED,
        weight="normal",
        ha="left",
    )

    n = 5
    xs = np.linspace(0.12, 0.88, n)
    yq = 0.70
    fault = 2
    for k, x in enumerate(xs):
        on = k == fault and hide > 0.4
        ax.add_patch(Circle((x, yq), 0.042, facecolor=TERR_SOFT if on else PANEL, edgecolor=INK, lw=0.9, zorder=4))
        txt(ax, x, yq, rf"$q_{k}$", size=8, color=INK, weight="bold")
        if on:
            ax.add_patch(
                Rectangle((x - 0.038, yq - 0.038), 0.076, 0.076, facecolor="none", edgecolor=MUTED, hatch="////", lw=0, zorder=5, alpha=0.55)
            )
            txt(ax, x, yq + 0.07, "fault (hidden)", size=7, color=TERRACOTTA, weight="bold")

    txt(ax, 0.045, 0.78, "physical qubits", size=8, color=MUTED, weight="bold", ha="left")

    yd = 0.48
    clicks = {1, 2}
    for k in range(n - 1):
        x = 0.5 * (xs[k] + xs[k + 1])
        lit = k in clicks and fire > 0.35
        ax.add_patch(
            RegularPolygon(
                (x, yd),
                4,
                radius=0.032,
                orientation=0.785,
                facecolor=TERRACOTTA if lit else PAPER,
                edgecolor=TERRACOTTA if lit else INK,
                lw=0.9,
                zorder=4,
            )
        )
        if lit:
            ax.add_patch(Circle((x, yd), 0.006 + 0.01 * fire, facecolor=TERRACOTTA, edgecolor="none", zorder=6, alpha=0.35))
        arrow(ax, (x, yq - 0.055), (x, yd + 0.04), color=MUTED if not lit else TERRACOTTA, lw=0.85, ms=8)
    txt(ax, 0.045, 0.48, "syndrome s", size=8, color=MUTED, weight="bold", ha="left")

    rounded(ax, (0.33, 0.22), 0.34, 0.14, fc=SLATE_SOFT if infer > 0.4 else PAPER, ec=SLATE if infer > 0.4 else INK, lw=1.05, r=0.012, z=4)
    txt(ax, 0.50, 0.31, "decoder", size=10, color=INK, weight="bold")
    txt(ax, 0.50, 0.265, r"$s \;\rightarrow\;$ recovery", size=8, color=MUTED, weight="normal")
    arrow(ax, (0.50, 0.445), (0.50, 0.36), color=SLATE, lw=1.2, ms=10)

    yr = 0.10
    for k, x in enumerate(xs):
        recovered = k == fault and act > 0.45
        rounded(
            ax,
            (x - 0.04, yr),
            0.08,
            0.07,
            fc=TERR_SOFT if recovered else PAPER,
            ec=TERRACOTTA if recovered else HAIRLINE,
            lw=0.9 if recovered else 0.7,
            r=0.01,
            z=4,
        )
        lab = "X" if recovered else "I"
        txt(ax, x, yr + 0.035, lab, size=8, color=TERRACOTTA if recovered else MUTED, weight="bold")
    txt(ax, 0.045, 0.135, "recovery", size=8, color=MUTED, weight="bold", ha="left")
    if act > 0.45:
        arrow(ax, (0.50, 0.22), (xs[fault], yr + 0.07), color=TERRACOTTA, lw=1.15, ms=9)
    handles = [
        Line2D([0], [0], marker="o", color="none", markerfacecolor=TERR_SOFT, markeredgecolor=INK, markersize=8, label="hidden fault"),
        Line2D([0], [0], marker="D", color="none", markerfacecolor=TERRACOTTA, markeredgecolor=INK, markersize=7, label="detector click"),
        Line2D([0], [0], marker="s", color="none", markerfacecolor=TERR_SOFT, markeredgecolor=TERRACOTTA, markersize=7, label="recovery"),
    ]
    leg = ax.legend(
        handles=handles,
        loc="upper right",
        bbox_to_anchor=(0.985, 0.905),
        frameon=True,
        fancybox=False,
        borderpad=0.4,
        ncol=3,
        prop={"weight": "bold", "size": 7.5},
    )
    frame = leg.get_frame()
    frame.set_facecolor(PAPER)
    frame.set_edgecolor(HAIRLINE)
    frame.set_linewidth(0.8)
    for t_ in leg.get_texts():
        t_.set_color(INK)
        t_.set_fontweight("bold")
    return fig_to_image(fig)


# ===========================================================================
# GIF assembly
# ===========================================================================
SPECS = [
    ("contrastive-views", draw_contrastive),
    ("latent-predict", draw_latent_predict),
    ("video-temporal", draw_video_temporal),
    ("sft-then-rl", draw_sft_then_rl),
    ("denoise-trajectory", draw_denoise),
    ("ssl-family", draw_ssl_family),
    ("qec-pipeline", draw_qec_pipeline),
]


def quantize_shared(frames: list[Image.Image], colors: int = PALETTE_COLORS) -> list[Image.Image]:
    """One adaptive palette from first/mid/last frames so the loop does not flicker."""
    w, h = frames[0].size
    sheet = Image.new("RGB", (w, h * 3))
    sheet.paste(frames[0], (0, 0))
    sheet.paste(frames[len(frames) // 2], (0, h))
    sheet.paste(frames[-1], (0, 2 * h))
    pal = sheet.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    return [im.quantize(palette=pal, dither=Image.Dither.NONE) for im in frames]


def write_gif_and_poster(name: str, frames: list[Image.Image]) -> tuple[Path, Path, int, int]:
    gif_path = GIF_DIR / f"{name}.gif"
    poster_path = POSTER_DIR / f"{name}-poster.png"
    GIF_DIR.mkdir(parents=True, exist_ok=True)
    POSTER_DIR.mkdir(parents=True, exist_ok=True)

    poster_idx = min(len(frames) - 1, max(0, int(round(0.70 * (len(frames) - 1)))))
    frames[poster_idx].save(poster_path, format="PNG", optimize=True)

    quantized = quantize_shared(frames)
    quantized[0].save(
        gif_path,
        save_all=True,
        append_images=quantized[1:],
        duration=DURATION_MS,
        loop=0,
        optimize=True,
        disposal=2,
    )
    return gif_path, poster_path, gif_path.stat().st_size, poster_path.stat().st_size


def build_one(name: str) -> tuple[str, Path, Path, int, int]:
    draw = dict(SPECS)[name]
    with concurrent.futures.ThreadPoolExecutor(max_workers=min(8, N_FRAMES)) as pool:
        frames = list(pool.map(draw, range(N_FRAMES)))
    gif_path, poster_path, gsz, psz = write_gif_and_poster(name, frames)
    return name, gif_path, poster_path, gsz, psz


def _fmt(n: int) -> str:
    if n >= 1024 * 1024:
        return f"{n / (1024 * 1024):.2f} MB"
    return f"{n / 1024:.1f} KB"


def main() -> None:
    _configure_rc()
    GIF_DIR.mkdir(parents=True, exist_ok=True)
    POSTER_DIR.mkdir(parents=True, exist_ok=True)
    requested = [a for a in sys.argv[1:] if not a.startswith("-")]
    names = [n for n, _ in SPECS if not requested or n in requested]
    if requested:
        missing = [n for n in requested if n not in dict(SPECS)]
        if missing:
            raise SystemExit(f"unknown schematic(s): {', '.join(missing)}")
    print(f"Rendering {len(names)} schematics × {N_FRAMES} frames @ {DPI} dpi…")

    results = []
    # Parallelise GIFs; each GIF parallelises its own frames.
    with concurrent.futures.ThreadPoolExecutor(max_workers=len(names)) as pool:
        futs = [pool.submit(build_one, n) for n in names]
        for fut in concurrent.futures.as_completed(futs):
            results.append(fut.result())

    results.sort(key=lambda r: names.index(r[0]))
    print()
    print(f"{'name':<24} {'gif':>10} {'poster':>10}  paths")
    print("-" * 88)
    for name, gif_path, poster_path, gsz, psz in results:
        print(f"{name:<24} {_fmt(gsz):>10} {_fmt(psz):>10}  {gif_path.relative_to(ROOT)}")
        print(f"{'':<24} {'':>10} {'':>10}  {poster_path.relative_to(ROOT)}")
        if gsz > 1.5 * 1024 * 1024:
            print(f"  WARNING: {name} GIF exceeds 1.5 MB")
    print("-" * 88)
    total = sum(r[3] + r[4] for r in results)
    print(f"{'total':<24} {_fmt(total):>10}")


if __name__ == "__main__":
    main()
