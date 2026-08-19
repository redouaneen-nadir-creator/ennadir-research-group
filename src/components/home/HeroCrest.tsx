/**
 * Decorative laurel crest used as the homepage "headfeature" — a large,
 * gilded seal-and-laurel emblem next to the hero title. Purely
 * ornamental (aria-hidden); the actual site mark is <Logo />.
 */
export default function HeroCrest({ className = '' }: { className?: string }) {
  const leaf = (x: number, y: number, angle: number, scale = 1) => (
    <ellipse
      cx={x}
      cy={y}
      rx={10 * scale}
      ry={4.2 * scale}
      transform={`rotate(${angle} ${x} ${y})`}
      fill="url(#leafFill)"
      opacity="0.92"
    />
  )

  const branch = (
    <g>
      <path
        d="M4 210 C 40 200, 62 160, 66 120 C 70 78, 96 40, 140 14"
        fill="none"
        stroke="url(#stemStroke)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {leaf(14, 202, -18)}
      {leaf(28, 182, -30, 0.95)}
      {leaf(42, 158, -42, 0.95)}
      {leaf(54, 132, -55, 0.9)}
      {leaf(62, 104, -66, 0.85)}
      {leaf(74, 76, -72, 0.8)}
      {leaf(94, 50, -80, 0.75)}
      {leaf(118, 26, -88, 0.7)}
    </g>
  )

  return (
    <svg viewBox="0 0 300 340" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="stemStroke" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#785a2a" />
          <stop offset="100%" stopColor="#e6c88e" />
        </linearGradient>
        <linearGradient id="leafFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e6c88e" />
          <stop offset="100%" stopColor="#9a7638" />
        </linearGradient>
        <linearGradient id="shieldStroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0dfb8" />
          <stop offset="100%" stopColor="#bd934a" />
        </linearGradient>
      </defs>

      <g transform="translate(150 300)">{branch}</g>
      <g transform="translate(150 300) scale(-1 1)">{branch}</g>

      <circle cx="150" cy="140" r="82" fill="none" stroke="#bd934a" strokeOpacity="0.35" strokeWidth="1" />

      <path
        d="M150 66 L196 88 V138 C196 178 174 206 150 218 C126 206 104 178 104 138 V88 Z"
        fill="#0a1220"
        stroke="url(#shieldStroke)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M116 122 H184" stroke="#e6c88e" strokeWidth="1.4" opacity="0.9" />
      <text
        x="150"
        y="115"
        textAnchor="middle"
        fontFamily="'Playfair Display', serif"
        fontSize="30"
        fontWeight="700"
        fill="#f0dfb8"
      >
        EN
      </text>
      <circle cx="150" cy="150" r="3.4" fill="#c25760" />
      <path d="M138 165 Q150 178 162 165" fill="none" stroke="#e6c88e" strokeWidth="1.2" opacity="0.85" />
    </svg>
  )
}
