import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { FloralDivider, Lotus } from './Decorations'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }

export default function Welcome() {
  const { t } = useLang()

  return (
    <section id="welcome" className="py-24 md:py-36 px-6 bg-white/40 relative">
      <FloralDivider className="absolute top-0 left-0 right-0 h-8" />

      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <Lotus className="w-14 h-14 opacity-60" />
        </motion.div>

        <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl text-gray-800 mb-10">
          {t.inviteTitle}
        </motion.h2>

        <motion.p variants={fadeUp} className="font-serif text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
          {t.inviteBody}
        </motion.p>

        <motion.p variants={fadeUp} className="font-sans text-gray-500 text-base md:text-lg leading-relaxed mb-10">
          {t.inviteSub}
        </motion.p>

        <motion.div variants={fadeUp}>
          <FloralDivider className="w-64 h-8 mx-auto opacity-60" />
        </motion.div>
      </motion.div>

      <FloralDivider className="absolute bottom-0 left-0 right-0 h-8 rotate-180" />
    </section>
  )
}
