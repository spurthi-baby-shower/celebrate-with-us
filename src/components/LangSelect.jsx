import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { PremiumMandala, PremiumKalash, GoldParticles, FloralCorner } from './Decorations'

export default function LangSelect() {
  const { setLang } = useLang()

  return (
    <div className="fixed inset-0 z-[100] bg-[#FDF8F0] flex items-center justify-center overflow-hidden">
      {/* Background mandala */}
      <PremiumMandala className="absolute w-[600px] h-[600px] opacity-[0.08]" />
      <GoldParticles />
      <FloralCorner className="absolute top-0 left-0 w-32" />
      <FloralCorner className="absolute top-0 right-0 w-32" flip />
      <FloralCorner className="absolute bottom-0 left-0 w-32 rotate-[-90deg]" />
      <FloralCorner className="absolute bottom-0 right-0 w-32 rotate-[-90deg]" flip />

      <div className="text-center px-6 relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <PremiumKalash className="w-20 h-28 mx-auto mb-8" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-display text-3xl md:text-5xl text-gray-800 mb-2">
          Seemantha Ceremony
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="font-kannada text-xl text-gold mb-12">
          ಸೀಮಂತ ಸಮಾರಂಭ
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="font-sans text-gray-400 mb-10 text-sm tracking-[0.2em] uppercase">
          Choose your language
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-5 justify-center">
          <button onClick={() => setLang('en')}
            className="px-12 py-4 bg-white/70 backdrop-blur-sm border-2 border-gold/40 text-gold rounded-full font-serif text-lg hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold/20">
            English
          </button>
          <button onClick={() => setLang('kn')}
            className="px-12 py-4 bg-white/70 backdrop-blur-sm border-2 border-gold/40 text-gold rounded-full font-kannada text-lg hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold/20">
            ಕನ್ನಡ
          </button>
        </motion.div>
      </div>
    </div>
  )
}
