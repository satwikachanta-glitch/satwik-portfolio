/**
 * Global film-grain texture. Static markup + CSS animation only (no client JS).
 */
export default function GrainOverlay() {
  return (
    <div
      className="grain-overlay pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden
    />
  );
}
