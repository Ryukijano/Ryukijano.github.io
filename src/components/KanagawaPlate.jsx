/**
 * The plate as a contained 16:9 object, not a wallpaper. Overlay children
 * (hit thirds) share the image box so Engineer / AI / Quantum sit on it.
 */

export default function KanagawaPlate({ src, alt, children }) {
  return (
    <div className="folio__sheet">
      <img src={src} alt={alt} fetchPriority="high" decoding="sync" />
      {children}
    </div>
  );
}
