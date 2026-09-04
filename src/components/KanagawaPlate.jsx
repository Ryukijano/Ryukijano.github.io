/**
 * The plate as a hung print on an untrimmed block. Padding on .folio__block
 * is the paper margin, so kagi and hikitsuke sit off the image. Overlay
 * children share the block so lane ticks can live in the bottom gutter.
 */
export default function KanagawaPlate({ src, sources = [], alt, width, height, children }) {
  return (
    <div className="folio__block">
      <div className="folio__sheet">
        <picture>
          {sources.map((source) => (
            <source key={source.srcSet} type={source.type} srcSet={source.srcSet} sizes={source.sizes} />
          ))}
          <img src={src} alt={alt} width={width} height={height} fetchPriority="high" decoding="async" />
        </picture>
      </div>
      {children}
      <span className="folio__kento folio__kento--hikitsuke" aria-hidden="true" />
      <span className="folio__kento folio__kento--kagi" aria-hidden="true" />
    </div>
  );
}
