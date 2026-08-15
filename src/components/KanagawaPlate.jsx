/**
 * Home ground: one full-viewport pull of the Kanagawa latent plate.
 * No second copy, no kento, no crop-pan. The three rooms sit on top.
 */

const SRC = '/assets/images/kanagawa_latentspace_autoencoder.jpg';

export default function KanagawaPlate() {
  return (
    <div className="hall__ground" aria-hidden="true">
      <img src={SRC} alt="" fetchPriority="high" decoding="async" />
    </div>
  );
}
