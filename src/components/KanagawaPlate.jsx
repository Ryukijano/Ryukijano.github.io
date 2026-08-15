/**
 * The plate as a hung print on an untrimmed block. Padding on .folio__block
 * is the paper margin, so kagi and hikitsuke sit off the image. Overlay
 * children share the image box; lane ticks hang into the bottom margin.
 */

export default function KanagawaPlate({ src, alt, children }) {
  return (
    <div className="folio__block">
      <div className="folio__sheet">
        <img src={src} alt={alt} fetchPriority="high" decoding="sync" />
        {children}
      </div>
      <span className="folio__kento folio__kento--hikitsuke" aria-hidden="true" />
      <span className="folio__kento folio__kento--kagi" aria-hidden="true" />
    </div>
  );
}
