export default function PlaceholderImage({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center justify-center border border-accent-500/20 bg-ink-950 text-center ${className}`}
    >
      <span className="px-3 text-xs font-medium uppercase tracking-wider text-white/60">{label}</span>
    </div>
  )
}
