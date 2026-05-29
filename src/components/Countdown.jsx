import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LangContext'
import { Diya } from './Decorations'

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
      <motion.span
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="inline-block"
      >
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
    <section className="py-24 md:py-36 px-6 bg-gradient-to-b from-gold-pale/20 to-cream relative">
      <Diya className="absolute top-10 left-10 w-10 opacity-25 hidden md:block" />
      <Diya className="absolute top-10 right-10 w-10 opacity-25 scale-x-[-1] hidden md:block" />

      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-5xl text-gray-800 mb-3">{t.countdownTitle}</h2>
        <p className="font-sans text-gray-500 mb-14 italic">{t.countdownSub}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {units.map(({ label, value }) => (
            <motion.div key={label}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gold/10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="font-display text-4xl md:text-6xl text-gold font-bold mb-2 overflow-hidden">
                <AnimatedNumber value={value} />
              </div>
              <div className="font-sans text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em]">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
