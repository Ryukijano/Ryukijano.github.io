/** Slow lattice for the Ryoushi room — not a racing Tron floor. */
export default function CircuitField() {
  return (
    <div className="hall-field hall-field--circuit" aria-hidden="true">
      <div className="hall-field__lattice" />
      <div className="hall-field__horizon" />
    </div>
  );
}
