/**
 * The plate as a hung print, not a wallpaper. Overlay children (hit thirds)
 * share the image box so Engineer / AI / Quantum sit on the object.
 */

export default function KanagawaPlate({ src, alt, children }) {
  return (
    <div className="folio__sheet">
      <img src={src} alt={alt} fetchPriority="high" decoding="sync" />
      {children}
    </div>
  );
}
