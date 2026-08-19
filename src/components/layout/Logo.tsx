/** Classic crest/seal mark used as the site logo in the header and footer. */
export default function Logo({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const ring = tone === 'light' ? 'bg-ink-950 ring-1 ring-accent-500/40' : 'bg-white/10 ring-1 ring-accent-400/30'

  return (
    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ring}`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M12 3.3 L18.4 5.8 V11.3 C18.4 15.9 15.4 19.2 12 20.4 C8.6 19.2 5.6 15.9 5.6 11.3 V5.8 Z"
          className="stroke-accent-400"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M7.6 10.4 H16.4" className="stroke-accent-400" strokeWidth="1" />
        <circle cx="12" cy="14.6" r="1.1" className="fill-brand-400" />
      </svg>
    </span>
  )
}
