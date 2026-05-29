import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { Lotus, Rangoli } from './Decorations'

export default function LangSelect() {
  const { setLang } = useLang()

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-cream flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Rangoli className="absolute w-[600px] h-[600px] opacity-[0.04]" />

      <div className="text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Lotus className="w-20 h-20 mx-auto mb-6" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-3xl md:text-4xl text-gray-800 mb-2"
        >
          Seemantha Ceremony
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-kannada text-xl text-gold mb-12"
        >
          ಸೀಮಂತ ಸಮಾರಂಭ
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-sans text-gray-500 mb-8 text-sm tracking-widest uppercase"
        >
          Choose your language / ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => setLang('en')}
            className="px-10 py-4 border-2 border-gold text-gold rounded-full font-serif text-lg hover:bg-gold hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
          >
            English
          </button>
          <button
            onClick={() => setLang('kn')}
            className="px-10 py-4 border-2 border-gold text-gold rounded-full font-kannada text-lg hover:bg-gold hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
          >
            ಕನ್ನಡ
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
