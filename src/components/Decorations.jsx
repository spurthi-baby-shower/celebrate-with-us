export function Lotus({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      {[...Array(8)].map((_, i) => (
        <path key={i}
          d="M50 50 C45 35 40 20 50 10 C60 20 55 35 50 50"
          fill="#B8860B" opacity={0.3 + i * 0.05}
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <path key={`inner${i}`}
          d="M50 50 C47 40 45 30 50 22 C55 30 53 40 50 50"
          fill="#D4A843" opacity={0.4 + i * 0.05}
          transform={`rotate(${i * 45 + 22.5} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="6" fill="#B8860B" opacity="0.5" />
      <circle cx="50" cy="50" r="3" fill="#D4A843" opacity="0.7" />
    </svg>
  )
}

export function Rangoli({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="95" stroke="#B8860B" strokeWidth="0.5" opacity="0.2"/>
      <circle cx="100" cy="100" r="80" stroke="#B8860B" strokeWidth="0.5" opacity="0.25"/>
      <circle cx="100" cy="100" r="65" stroke="#B8860B" strokeWidth="0.8" opacity="0.3"/>
      <circle cx="100" cy="100" r="50" stroke="#B8860B" strokeWidth="0.5" opacity="0.2"/>
      <circle cx="100" cy="100" r="10" fill="#B8860B" opacity="0.15"/>
      {[...Array(12)].map((_, i) => (
        <g key={i} transform={`rotate(${i * 30} 100 100)`}>
          <path d="M100 35 C105 50 105 65 100 80" stroke="#B8860B" strokeWidth="0.8" opacity="0.3"/>
          <path d="M100 35 C95 50 95 65 100 80" stroke="#B8860B" strokeWidth="0.8" opacity="0.3"/>
          <circle cx="100" cy="32" r="3" fill="#B8860B" opacity="0.2"/>
        </g>
      ))}
      {[...Array(24)].map((_, i) => (
        <circle key={`o${i}`} cx={100 + 88 * Math.cos(i * Math.PI / 12)} cy={100 + 88 * Math.sin(i * Math.PI / 12)} r="2" fill="#B8860B" opacity="0.2"/>
      ))}
    </svg>
  )
}

export function MangoLeaves({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 300 50" fill="none" preserveAspectRatio="none">
      <path d="M0 45 Q150 50 300 45" stroke="#B8860B" strokeWidth="1.5" opacity="0.4"/>
      {[...Array(11)].map((_, i) => (
        <g key={i} transform={`translate(${15 + i * 27}, 8)`}>
          <path d="M7 0 C3 12 0 28 7 40 C14 28 11 12 7 0Z" fill="#2E7D32" opacity="0.7"/>
          <path d="M7 3 L7 37" stroke="#1B5E20" strokeWidth="0.4" opacity="0.5"/>
        </g>
      ))}
    </svg>
  )
}

export function TempleBell({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 60 90" fill="none">
      <path d="M28 5 L32 5 L30 0 Z" fill="#B8860B" opacity="0.7"/>
      <rect x="29" y="5" width="2" height="15" fill="#B8860B" opacity="0.6"/>
      <path d="M15 20 Q15 50 10 65 Q30 72 50 65 Q45 50 45 20 Q30 15 15 20Z" fill="#B8860B" opacity="0.4"/>
      <ellipse cx="30" cy="67" rx="20" ry="5" fill="#B8860B" opacity="0.5"/>
      <circle cx="30" cy="55" r="4" fill="#B8860B" opacity="0.6"/>
      <path d="M30 60 L30 75" stroke="#B8860B" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="30" cy="77" r="3" fill="#B8860B" opacity="0.5"/>
    </svg>
  )
}

export function Diya({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 50 60" fill="none">
      <path d="M25 5 C22 10 20 14 25 18 C30 14 28 10 25 5Z" fill="#FF8C00" opacity="0.8"/>
      <path d="M25 8 C23 11 22 13 25 16 C28 13 27 11 25 8Z" fill="#FFD700" opacity="0.9"/>
      <path d="M15 22 Q10 35 13 45 Q20 52 25 52 Q30 52 37 45 Q40 35 35 22 Z" fill="#B8860B" opacity="0.5"/>
      <ellipse cx="25" cy="22" rx="10" ry="3.5" fill="#B8860B" opacity="0.6"/>
      <ellipse cx="25" cy="52" rx="7" ry="2.5" fill="#B8860B" opacity="0.4"/>
    </svg>
  )
}

export function Kalash({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 110" fill="none">
      <circle cx="40" cy="18" r="9" fill="#6D4C41" opacity="0.6"/>
      <path d="M40 9 C36 -2 32 -2 30 5" stroke="#2E7D32" strokeWidth="2" fill="#2E7D32" opacity="0.7"/>
      <path d="M40 9 C44 -2 48 -2 50 5" stroke="#2E7D32" strokeWidth="2" fill="#2E7D32" opacity="0.7"/>
      <path d="M40 9 L40 0" stroke="#2E7D32" strokeWidth="2"/>
      <path d="M40 9 C37 -4 34 0 33 8" stroke="#2E7D32" strokeWidth="1.5" fill="#2E7D32" opacity="0.5"/>
      <path d="M40 9 C43 -4 46 0 47 8" stroke="#2E7D32" strokeWidth="1.5" fill="#2E7D32" opacity="0.5"/>
      <path d="M24 28 Q19 55 23 82 Q28 98 40 100 Q52 98 57 82 Q61 55 56 28 Z" fill="#B8860B" opacity="0.45"/>
      <ellipse cx="40" cy="28" rx="16" ry="5" fill="#D4A843" opacity="0.5"/>
      <path d="M26 50 Q40 54 54 50" stroke="#FFF" strokeWidth="0.6" opacity="0.3"/>
      <path d="M25 65 Q40 69 55 65" stroke="#FFF" strokeWidth="0.6" opacity="0.3"/>
      <path d="M26 80 Q40 84 54 80" stroke="#FFF" strokeWidth="0.6" opacity="0.3"/>
    </svg>
  )
}

export function Peacock({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none">
      {[...Array(7)].map((_, i) => (
        <g key={i} transform={`rotate(${-45 + i * 15} 50 85)`}>
          <path d={`M50 85 C${48 - i * 0.5} 60 ${45 - i} 35 50 15`} stroke="#006064" strokeWidth="1" opacity="0.5"/>
          <ellipse cx="50" cy="15" rx="5" ry="8" fill="#006064" opacity="0.3"/>
          <circle cx="50" cy="13" r="2.5" fill="#B8860B" opacity="0.4"/>
        </g>
      ))}
      <ellipse cx="50" cy="85" rx="6" ry="10" fill="#006064" opacity="0.4"/>
      <circle cx="50" cy="78" r="3" fill="#006064" opacity="0.5"/>
    </svg>
  )
}

export function BananaLeaf({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 60 120" fill="none">
      <path d="M30 0 C20 30 15 60 20 90 Q25 105 30 110 Q35 105 40 90 C45 60 40 30 30 0Z" fill="#2E7D32" opacity="0.3"/>
      <path d="M30 5 L30 108" stroke="#1B5E20" strokeWidth="0.8" opacity="0.4"/>
      {[...Array(8)].map((_, i) => (
        <path key={i} d={`M30 ${15 + i * 12} C${25 - i * 0.5} ${18 + i * 12} ${22 - i} ${15 + i * 12} ${20} ${15 + i * 12}`} stroke="#1B5E20" strokeWidth="0.4" opacity="0.3"/>
      ))}
    </svg>
  )
}

export function FloralDivider({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 400 40" fill="none" preserveAspectRatio="none">
      <path d="M0 20 Q100 8 200 20 Q300 32 400 20" stroke="#B8860B" strokeWidth="0.8" opacity="0.3"/>
      <path d="M0 20 Q100 32 200 20 Q300 8 400 20" stroke="#B8860B" strokeWidth="0.8" opacity="0.2"/>
      {[...Array(5)].map((_, i) => (
        <g key={i}>
          <circle cx={40 + i * 80} cy="20" r="4" fill="none" stroke="#B8860B" strokeWidth="0.8" opacity="0.4"/>
          <circle cx={40 + i * 80} cy="20" r="1.5" fill="#B8860B" opacity="0.4"/>
        </g>
      ))}
    </svg>
  )
}
