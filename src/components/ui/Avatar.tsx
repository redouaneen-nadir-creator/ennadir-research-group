function initials(name: string): string {
  const clean = name.replace(/[[\]]/g, '')
  const parts = clean.split(' ').filter(Boolean)
  if (parts.length === 0) return '?'
  return (parts[0][0] + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

export default function Avatar({ name, className = '' }: { name: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-ink-800 font-serif font-semibold text-white ${className}`}
    >
      {initials(name)}
    </div>
  )
}
