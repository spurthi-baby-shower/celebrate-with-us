import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { Rangoli } from './Decorations'

export default function Timeline() {
  const { t } = useLang()

  const events = [
    { time: '11:00 AM', title: t.arrival, desc: t.arrivalDesc, icon: '🎊' },
    { time: '11:30 AM', title: t.welcome, desc: t.welcomeDesc, icon: '🙏' },
    { time: '12:00 PM', title: t.ritual, desc: t.ritualDesc, icon: '🪔' },
    { time: '1:00 PM', title: t.blessingsEvt, desc: t.blessingsDesc, icon: '✨' },
    { time: '1:30 PM', title: t.lunch, desc: t.lunchDesc, icon: '🍽️' },
    { time: '2:30 PM', title: t.photos, desc: t.photosDesc, icon: '📸' },
  ]

  return (
    <section id="timeline" className="py-24 md:py-36 px-6 bg-white/40 relative">
      <Rangoli className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.03]" />

      <motion.div
        className="max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-5xl text-center text-gray-800 mb-4">{t.timelineTitle}</h2>
        <div className="flex justify-center mb-16">
          <div className="h-1 w-20 bg-gold rounded-full" />
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/25 md:-translate-x-px" />

          {events.map((event, i) => (
            <motion.div
              key={i}
              className={`relative flex items-start mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 border-4 border-cream z-10 mt-5" />

              <div className={`ml-14 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="bg-white rounded-xl p-5 shadow-md border border-gold/10 hover:shadow-xl transition-shadow">
                  <div className={`flex items-center gap-3 mb-2 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <span className="text-2xl">{event.icon}</span>
                    <div>
                      <h3 className="font-display text-lg text-gray-800">{event.title}</h3>
                      <p className="font-sans text-xs text-gold font-medium">{event.time}</p>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-gray-500">{event.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
