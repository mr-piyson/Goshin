export default function FallbackBackground() {
  return (
    <div className="ntp-bg ntp-fallback" aria-hidden="true">
      <div className="ntp-fallback-logo">
        <img src="/logo.svg" alt="" draggable={false} />
        <span>Manganum</span>
      </div>
    </div>
  );
}
