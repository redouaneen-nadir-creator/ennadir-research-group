type IconProps = { className?: string }

const base = 'stroke-current'

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" className={base} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" className={base} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" className={base} strokeWidth="1.8" />
      <path d="M20 20l-4.35-4.35" className={base} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 6l6 6-6 6" className={base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 5h5v5M19 5l-8.5 8.5M12 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-5"
        className={base}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14"
        className={base}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 12h16M14 6l6 6-6 6" className={base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="5.5" width="16" height="15" rx="2" className={base} strokeWidth="1.8" />
      <path d="M4 10h16M8 3.5v4M16 3.5v4" className={base} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z"
        className={base}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" className={base} strokeWidth="1.8" />
    </svg>
  )
}

export function FilterIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" className={base} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" className={base} strokeWidth="1.8" />
      <path d="M4 7l8 6 8-6" className={base} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const AREA_ICON_PATHS: Record<string, string> = {
  atom: 'M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0',
  chip: 'M8 3v3M16 3v3M8 18v3M16 18v3M3 8h3M3 16h3M18 8h3M18 16h3M6 6h12v12H6z',
  solar: 'M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z',
  photon: 'M3 12c3-6 6-6 9 0s6 6 9 0M3 12c3 6 6 6 9 0s6-6 9 0',
  quantum: 'M12 12m-2.2 0a2.2 2.2 0 104.4 0 2.2 2.2 0 10-4.4 0M12 3.5C7 3.5 3.5 7.5 3.5 12S7 20.5 12 20.5 20.5 16.5 20.5 12 17 3.5 12 3.5zM4.5 8c4 2.5 11 2.5 15 0M4.5 16c4-2.5 11-2.5 15 0',
  nano: 'M12 3l2.6 5.3L20.5 9l-4.2 3.9L17.4 19 12 15.8 6.6 19l1.1-6.1L3.5 9l5.9-.7L12 3z',
  compute: 'M4 5h16v11H4zM9 20h6M12 16v4M8 9h3v3H8zM13 9h3v3h-3z',
  ai: 'M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2M12 8a4 4 0 100 8 4 4 0 000-8z',
}

export function AreaIcon({ name, className }: { name: string; className?: string }) {
  const d = AREA_ICON_PATHS[name] ?? AREA_ICON_PATHS.atom
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} className={base} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
