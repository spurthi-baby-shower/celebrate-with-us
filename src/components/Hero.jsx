import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { PremiumMandala, PremiumKalash, PremiumDiya, PremiumMangoTorana, GoldParticles, FloralCorner, PremiumDivider } from './Decorations'

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 1: Warm ivory texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF8F0] via-[#FFF5E6] to-[#FDF8F0]" />

      {/* Layer 2: Large faded mandala */}
      <div className="absolute inset-0 flex items-center justify-center">
        <PremiumMandala className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.12]" />
      </div>

      {/* Layer 3: Gold particles */}
      <GoldParticles />

      {/* Layer 4: Floral corners */}
      <FloralCorner className="absolute top-0 left-0 w-28 md:w-40" />
      <FloralCorner className="absolute top-0 right-0 w-28 md:w-40" flip />
      <FloralCorner className="absolute bottom-0 left-0 w-28 md:w-40 rotate-[-90deg]" />
      <FloralCorner className="absolute bottom-0 right-0 w-28 md:w-40 rotate-[-90deg]" flip />

      {/* Layer 5: Soft light effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gold/3 rounded-full blur-[80px]" />

      {/* Mango torana at top */}
      <div className="absolute top-0 left-0 right-0">
        <PremiumMangoTorana className="w-full h-16 md:h-20" />
      </div>

      {/* Premium diyas */}
      <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-20 left-6 md:left-16">
        <PremiumDiya className="w-12 md:w-16" />
      </motion.div>
      <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-6 md:right-16">
        <PremiumDiya className="w-12 md:w-16" />
      </motion.div>

      {/* Gold frame with glow */}
      <div className="absolute inset-6 md:inset-12 border border-gold/20 rounded-3xl pointer-events-none shadow-[inset_0_0_30px_rgba(184,134,11,0.05)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        {/* Premium Kalash centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <PremiumKalash className="w-24 h-36 md:w-32 md:h-48" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-4 drop-shadow-sm"
        >
          {t.ceremony}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-serif text-lg md:text-2xl text-gray-600 italic mb-8 max-w-2xl mx-auto"
        >
          {t.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <PremiumDivider className="mb-8" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="font-display text-2xl md:text-4xl text-gray-700 mb-5"
        >
          {t.couple}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="inline-block px-8 py-3 bg-white/60 backdrop-blur-sm border border-gold/20 rounded-full shadow-lg"
        >
          <p className="font-sans text-gold font-medium tracking-widest uppercase text-sm md:text-base">
            {t.date} • {t.day}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="mt-14">
          <a href="#welcome" className="inline-block animate-bounce text-gold drop-shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
