import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { Rangoli } from './Decorations'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

export default function EventDetails() {
  const { t } = useLang()
  const cards = [
    { icon: '📅', title: t.dateLabel, detail: t.date, sub: t.day },
    { icon: '🕐', title: t.timeLabel, detail: t.timeValue, sub: '' },
    { icon: '📍', title: t.venueLabel, detail: t.venue, sub: t.venueSub },
  ]

  return (
    <section id="details" className="py-24 md:py-36 px-6 relative">
      <Rangoli className="absolute -top-20 right-0 w-40 h-40 opacity-[0.04]" />

      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl text-center text-gray-800 mb-4">
          {t.eventTitle}
        </motion.h2>
        <motion.div variants={fadeUp} className="flex justify-center mb-16">
          <div className="h-1 w-20 bg-gold rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <motion.div key={card.title} variants={fadeUp}
              whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(184,134,11,0.12)' }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gold/10 transition-all"
            >
              <div className="text-5xl mb-5">{card.icon}</div>
              <h3 className="font-display text-xl text-gray-800 mb-2">{card.title}</h3>
              <p className="font-sans text-lg font-semibold text-gold mb-1">{card.detail}</p>
              {card.sub && <p className="font-sans text-sm text-gray-500">{card.sub}</p>}
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mt-14">
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-white rounded-full font-sans text-sm hover:bg-gold-light transition-colors shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {t.viewMap}
          </a>
          <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Seemantha+-+Spurthi+%26+Harish&dates=20260604T053000Z/20260604T103000Z" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gold text-gold rounded-full font-sans text-sm hover:bg-gold hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            {t.addCal}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
