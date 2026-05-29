import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { PremiumDivider, PremiumMandala } from './Decorations'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }

export default function Welcome() {
  const { t } = useLang()

  return (
    <section id="welcome" className="py-28 md:py-40 px-6 relative overflow-hidden">
      {/* Subtle mandala background */}
      <PremiumMandala className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04]" />

      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div variants={fadeUp}>
          <PremiumDivider className="mb-10" />
        </motion.div>

        <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl text-gray-800 mb-10">
          {t.inviteTitle}
        </motion.h2>

        <motion.p variants={fadeUp} className="font-serif text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
          {t.inviteBody}
        </motion.p>

        <motion.p variants={fadeUp} className="font-sans text-gray-500 text-base md:text-lg leading-relaxed mb-12">
          {t.inviteSub}
        </motion.p>

        <motion.div variants={fadeUp}>
          <PremiumDivider />
        </motion.div>
      </motion.div>
    </section>
  )
}
