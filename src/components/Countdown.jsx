import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LangContext'
import { PremiumDiya, PremiumDivider } from './Decorations'

const TARGET = new Date('2026-06-04T11:00:00').getTime()

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function AnimatedNumber({ value }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span key={value}
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }} className="inline-block">
        {String(value).padStart(2, '0')}
      </motion.span>
    </AnimatePresence>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())
  const { t } = useLang()

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: t.days, value: time.days },
    { label: t.hours, value: time.hours },
    { label: t.minutes, value: time.minutes },
    { label: t.seconds, value: time.seconds },
  ]

  return (
    <section className="py-28 md:py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-pale/10 via-transparent to-gold-pale/10" />

      <motion.div animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-8 left-8 hidden md:block"><PremiumDiya className="w-14" /></motion.div>
      <motion.div animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        className="absolute top-8 right-8 hidden md:block"><PremiumDiya className="w-14" /></motion.div>

      <motion.div className="max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>

        <h2 className="font-display text-3xl md:text-5xl text-gray-800 mb-3">{t.countdownTitle}</h2>
        <p className="font-sans text-gray-500 mb-6 italic">{t.countdownSub}</p>
        <PremiumDivider className="mb-14" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {units.map(({ label, value }) => (
            <motion.div key={label}
              className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-gold/15 hover:border-gold/30 transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(184,134,11,0.12)' }}>
              <div className="font-display text-4xl md:text-6xl text-gold font-bold mb-2 overflow-hidden">
                <AnimatedNumber value={value} />
              </div>
              <div className="font-sans text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em]">{label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
