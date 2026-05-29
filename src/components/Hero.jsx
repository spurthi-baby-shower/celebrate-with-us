import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { Kalash, Rangoli, Diya, MangoLeaves, TempleBell, Lotus, Peacock, BananaLeaf } from './Decorations'

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-gold-pale/20 to-cream">
      {/* Background rangoli */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Rangoli className="w-[700px] h-[700px] md:w-[900px] md:h-[900px] opacity-[0.06]" />
      </div>

      {/* Mango leaves torana */}
      <div className="absolute top-0 left-0 right-0">
        <MangoLeaves className="w-full h-14 md:h-20" />
      </div>

      {/* Corner decorations */}
      <TempleBell className="absolute top-16 left-4 md:left-10 w-10 md:w-14 opacity-50" />
      <TempleBell className="absolute top-16 right-4 md:right-10 w-10 md:w-14 opacity-50 scale-x-[-1]" />
      <Diya className="absolute bottom-24 left-6 md:left-16 w-10 md:w-12 opacity-50" />
      <Diya className="absolute bottom-24 right-6 md:right-16 w-10 md:w-12 opacity-50 scale-x-[-1]" />
      <Peacock className="absolute bottom-10 left-1/4 w-16 opacity-20 hidden md:block" />
      <Peacock className="absolute bottom-10 right-1/4 w-16 opacity-20 scale-x-[-1] hidden md:block" />
      <BananaLeaf className="absolute top-1/3 left-0 w-10 opacity-20 hidden md:block" />
      <BananaLeaf className="absolute top-1/3 right-0 w-10 opacity-20 scale-x-[-1] hidden md:block" />

      {/* Gold decorative frame */}
      <div className="absolute inset-6 md:inset-12 border border-gold/15 rounded-3xl pointer-events-none" />
      <div className="absolute inset-8 md:inset-14 border border-gold/10 rounded-2xl pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16">
        {/* Kalash illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex justify-center mb-6"
        >
          <Kalash className="w-20 h-28 md:w-28 md:h-36" />
        </motion.div>

        {/* Lotus accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex justify-center mb-6"
        >
          <Lotus className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-4"
        >
          {t.ceremony}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-serif text-lg md:text-2xl text-gray-600 italic mb-8 max-w-2xl mx-auto"
        >
          {t.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <Diya className="w-6 h-8" />
          <div className="h-px w-16 md:w-24 bg-gold/40" />
          <span className="text-gold text-xl">✦</span>
          <div className="h-px w-16 md:w-24 bg-gold/40" />
          <Diya className="w-6 h-8 scale-x-[-1]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="font-display text-2xl md:text-4xl text-gray-700 mb-4"
        >
          {t.couple}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="inline-block px-8 py-3 border border-gold/30 rounded-full"
        >
          <p className="font-sans text-gold font-medium tracking-widest uppercase text-sm md:text-base">
            {t.date} • {t.day}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-14"
        >
          <a href="#welcome" className="inline-block animate-bounce text-gold">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
