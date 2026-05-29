// Premium South Indian decorative elements using CSS gradients, shadows, glow, and depth

export function PremiumMandala({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
        <defs>
          <radialGradient id="mandalaGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#B8860B" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#8B6914" stopOpacity="0.1"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E6A3"/>
            <stop offset="25%" stopColor="#D4A843"/>
            <stop offset="50%" stopColor="#F5D77A"/>
            <stop offset="75%" stopColor="#B8860B"/>
            <stop offset="100%" stopColor="#D4A843"/>
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#B8860B" floodOpacity="0.3"/>
          </filter>
        </defs>
        {/* Outer rings with glow */}
        <circle cx="200" cy="200" r="190" stroke="url(#goldFoil)" strokeWidth="1.5" opacity="0.4" filter="url(#glow)"/>
        <circle cx="200" cy="200" r="175" stroke="url(#goldFoil)" strokeWidth="0.8" opacity="0.3"/>
        <circle cx="200" cy="200" r="160" stroke="url(#goldFoil)" strokeWidth="1.2" opacity="0.35" filter="url(#glow)"/>
        <circle cx="200" cy="200" r="140" stroke="url(#goldFoil)" strokeWidth="0.5" opacity="0.25"/>
        {/* Petal layers */}
        {[...Array(16)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 22.5} 200 200)`}>
            <path d="M200 60 C210 100 215 140 200 170 C185 140 190 100 200 60Z"
              fill="url(#goldFoil)" opacity={0.15 + (i % 2) * 0.08} filter="url(#shadow)"/>
          </g>
        ))}
        {[...Array(12)].map((_, i) => (
          <g key={`inner${i}`} transform={`rotate(${i * 30 + 15} 200 200)`}>
            <path d="M200 100 C207 125 210 150 200 165 C190 150 193 125 200 100Z"
              fill="url(#goldFoil)" opacity={0.2 + (i % 3) * 0.05} filter="url(#glow)"/>
          </g>
        ))}
        {/* Center lotus */}
        {[...Array(8)].map((_, i) => (
          <g key={`lotus${i}`} transform={`rotate(${i * 45} 200 200)`}>
            <path d="M200 170 C205 180 207 190 200 198 C193 190 195 180 200 170Z"
              fill="url(#goldFoil)" opacity="0.5" filter="url(#glow)"/>
          </g>
        ))}
        <circle cx="200" cy="200" r="12" fill="url(#goldFoil)" opacity="0.6" filter="url(#glow)"/>
        <circle cx="200" cy="200" r="6" fill="#F5E6A3" opacity="0.8"/>
        {/* Outer dots */}
        {[...Array(32)].map((_, i) => (
          <circle key={`dot${i}`}
            cx={200 + 182 * Math.cos(i * Math.PI / 16)}
            cy={200 + 182 * Math.sin(i * Math.PI / 16)}
            r={i % 2 === 0 ? 3 : 2} fill="url(#goldFoil)" opacity="0.4" filter="url(#glow)"/>
        ))}
      </svg>
    </div>
  )
}

export function PremiumKalash({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 120 180" fill="none" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A843"/>
            <stop offset="30%" stopColor="#F5D77A"/>
            <stop offset="60%" stopColor="#B8860B"/>
            <stop offset="100%" stopColor="#8B6914"/>
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50"/>
            <stop offset="50%" stopColor="#2E7D32"/>
            <stop offset="100%" stopColor="#1B5E20"/>
          </linearGradient>
          <radialGradient id="coconutGrad">
            <stop offset="0%" stopColor="#8D6E63"/>
            <stop offset="70%" stopColor="#5D4037"/>
            <stop offset="100%" stopColor="#3E2723"/>
          </radialGradient>
          <filter id="kalashShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.2"/>
          </filter>
          <filter id="innerGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Mango leaves */}
        <path d="M60 28 C50 5 42 0 38 12" fill="url(#leafGrad)" opacity="0.9" filter="url(#innerGlow)"/>
        <path d="M60 28 C70 5 78 0 82 12" fill="url(#leafGrad)" opacity="0.9" filter="url(#innerGlow)"/>
        <path d="M60 28 C55 2 50 -3 48 8" fill="url(#leafGrad)" opacity="0.8"/>
        <path d="M60 28 C65 2 70 -3 72 8" fill="url(#leafGrad)" opacity="0.8"/>
        <path d="M60 28 L60 5" stroke="#2E7D32" strokeWidth="1.5"/>
        {/* Coconut */}
        <ellipse cx="60" cy="32" rx="12" ry="11" fill="url(#coconutGrad)" filter="url(#kalashShadow)"/>
        <ellipse cx="57" cy="29" rx="3" ry="2" fill="#8D6E63" opacity="0.5"/>
        {/* Pot body */}
        <path d="M32 48 Q25 85 30 125 Q38 148 60 152 Q82 148 90 125 Q95 85 88 48 Z"
          fill="url(#brassGrad)" filter="url(#kalashShadow)"/>
        {/* Pot rim */}
        <ellipse cx="60" cy="48" rx="28" ry="8" fill="url(#brassGrad)"/>
        <ellipse cx="60" cy="48" rx="26" ry="6" fill="#F5D77A" opacity="0.4"/>
        {/* Decorative bands */}
        <path d="M34 75 Q60 80 86 75" stroke="#F5E6A3" strokeWidth="1.5" opacity="0.5" fill="none"/>
        <path d="M33 95 Q60 100 87 95" stroke="#F5E6A3" strokeWidth="1.5" opacity="0.5" fill="none"/>
        <path d="M34 115 Q60 120 86 115" stroke="#F5E6A3" strokeWidth="1.5" opacity="0.5" fill="none"/>
        {/* Highlight reflection */}
        <path d="M42 55 Q45 85 43 120" stroke="#FFF" strokeWidth="2" opacity="0.15" fill="none"/>
        {/* Base */}
        <ellipse cx="60" cy="152" rx="18" ry="5" fill="url(#brassGrad)" opacity="0.8"/>
      </svg>
    </div>
  )
}

export function PremiumDiya({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 60 80" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="diyaBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A843"/>
            <stop offset="50%" stopColor="#F5D77A"/>
            <stop offset="100%" stopColor="#B8860B"/>
          </linearGradient>
          <radialGradient id="flameGrad" cx="50%" cy="70%">
            <stop offset="0%" stopColor="#FFF8E1"/>
            <stop offset="30%" stopColor="#FFD54F"/>
            <stop offset="70%" stopColor="#FF8F00"/>
            <stop offset="100%" stopColor="#E65100" stopOpacity="0"/>
          </radialGradient>
          <filter id="flameGlow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Flame glow */}
        <ellipse cx="30" cy="15" rx="10" ry="14" fill="#FFD54F" opacity="0.15" filter="url(#flameGlow)"/>
        {/* Flame */}
        <path d="M30 5 C26 12 24 18 30 25 C36 18 34 12 30 5Z" fill="url(#flameGrad)" filter="url(#flameGlow)"/>
        <path d="M30 9 C28 13 27 16 30 20 C33 16 32 13 30 9Z" fill="#FFF8E1" opacity="0.8"/>
        {/* Lamp body */}
        <path d="M18 32 Q13 45 16 58 Q22 66 30 67 Q38 66 44 58 Q47 45 42 32 Z" fill="url(#diyaBrass)"/>
        <ellipse cx="30" cy="32" rx="12" ry="4" fill="url(#diyaBrass)"/>
        <ellipse cx="30" cy="32" rx="10" ry="3" fill="#F5D77A" opacity="0.4"/>
        {/* Base */}
        <ellipse cx="30" cy="67" rx="10" ry="3.5" fill="url(#diyaBrass)"/>
        <rect x="24" y="67" width="12" height="5" rx="2" fill="url(#diyaBrass)"/>
        <ellipse cx="30" cy="72" rx="14" ry="4" fill="url(#diyaBrass)" opacity="0.8"/>
        {/* Reflection */}
        <path d="M22 38 Q23 48 22 56" stroke="#FFF" strokeWidth="1" opacity="0.2" fill="none"/>
      </svg>
    </div>
  )
}

export function PremiumMangoTorana({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 400 60" fill="none" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="toranaLeaf" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#66BB6A"/>
            <stop offset="40%" stopColor="#388E3C"/>
            <stop offset="100%" stopColor="#1B5E20"/>
          </linearGradient>
          <linearGradient id="toranaRope" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A843"/>
            <stop offset="50%" stopColor="#F5D77A"/>
            <stop offset="100%" stopColor="#B8860B"/>
          </linearGradient>
          <filter id="leafShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#000" floodOpacity="0.15"/>
          </filter>
        </defs>
        {/* Rope/string */}
        <path d="M0 48 Q100 55 200 50 Q300 55 400 48" stroke="url(#toranaRope)" strokeWidth="3" fill="none"/>
        {/* Leaves */}
        {[...Array(15)].map((_, i) => {
          const x = 13 + i * 26
          const sway = i % 2 === 0 ? -3 : 3
          return (
            <g key={i} filter="url(#leafShadow)">
              <path d={`M${x} 10 C${x - 4 + sway} 22 ${x - 5 + sway} 38 ${x + sway} 48 C${x + 5 + sway} 38 ${x + 4 + sway} 22 ${x} 10Z`}
                fill="url(#toranaLeaf)" opacity={0.8 + (i % 3) * 0.07}/>
              <path d={`M${x} 13 L${x + sway * 0.5} 45`} stroke="#1B5E20" strokeWidth="0.5" opacity="0.5"/>
            </g>
          )
        })}
        {/* Marigold flowers at intervals */}
        {[0, 4, 7, 10, 14].map((i) => {
          const x = 13 + i * 26
          return (
            <g key={`flower${i}`}>
              <circle cx={x} cy="52" r="5" fill="#FF8F00" opacity="0.8"/>
              <circle cx={x} cy="52" r="3" fill="#FFB300" opacity="0.9"/>
              <circle cx={x} cy="52" r="1.5" fill="#FFF8E1" opacity="0.7"/>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function GoldParticles({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(20)].map((_, i) => (
        <div key={i}
          className="absolute w-1 h-1 rounded-full animate-pulse"
          style={{
            left: `${5 + (i * 17) % 90}%`,
            top: `${10 + (i * 23) % 80}%`,
            background: `radial-gradient(circle, #F5D77A, #B8860B)`,
            opacity: 0.2 + (i % 5) * 0.1,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2 + i % 3}s`,
            boxShadow: '0 0 4px #D4A843',
          }}
        />
      ))}
    </div>
  )
}

export function FloralCorner({ className = '', flip = false }) {
  return (
    <div className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}>
      <svg viewBox="0 0 150 150" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="cornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#B8860B" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
        <path d="M0 0 C30 10 50 30 60 60 C50 50 30 45 0 50" fill="url(#cornerGold)" opacity="0.3"/>
        <path d="M0 0 C20 5 35 20 42 42 C35 35 20 30 0 35" fill="url(#cornerGold)" opacity="0.4"/>
        <path d="M0 0 Q40 5 50 40" stroke="#D4A843" strokeWidth="0.8" opacity="0.4" fill="none"/>
        <path d="M0 5 Q30 10 40 35" stroke="#D4A843" strokeWidth="0.5" opacity="0.3" fill="none"/>
        <circle cx="50" cy="42" r="4" fill="#D4A843" opacity="0.3"/>
        <circle cx="42" cy="42" r="2" fill="#F5D77A" opacity="0.4"/>
      </svg>
    </div>
  )
}

export function PremiumDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
      <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#D4A843] opacity-60" />
      <div className="h-px w-8 bg-gold opacity-40" />
      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gold-light to-gold shadow-[0_0_12px_#D4A843] opacity-70" />
      <div className="h-px w-8 bg-gold opacity-40" />
      <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_#D4A843] opacity-60" />
      <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-gold to-transparent opacity-50" />
    </div>
  )
}
