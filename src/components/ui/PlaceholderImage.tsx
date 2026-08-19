export default function PlaceholderImage({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-ink-900 to-brand-900 text-center ${className}`}
    >
      <span className="px-3 text-xs font-medium uppercase tracking-wider text-white/60">{label}</span>
    </div>
  )
}
