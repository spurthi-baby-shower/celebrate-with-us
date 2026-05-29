import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LangContext'

const initial = [
  { id: 1, name: 'Family', message: 'May the little one bring endless joy and prosperity to your home 🙏' },
  { id: 2, name: 'Friends', message: 'Wishing you a beautiful journey into parenthood! ✨' },
]

export default function Blessings() {
  const { t } = useLang()
  const [wishes, setWishes] = useState(initial)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !msg.trim()) return
    setWishes([{ id: Date.now(), name, message: msg }, ...wishes])
    setName('')
    setMsg('')
  }

  return (
    <section id="blessings" className="py-24 md:py-36 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-5xl text-center text-gray-800 mb-4">{t.blessingsTitle}</h2>
        <div className="flex justify-center mb-16">
          <div className="h-1 w-20 bg-gold rounded-full" />
        </div>

        <form onSubmit={submit} className="glass rounded-2xl p-6 md:p-8 mb-12 max-w-lg mx-auto">
          <input type="text" placeholder={t.blessingsPlaceholderName} value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-white/80 font-sans placeholder-gray-400 focus:outline-none focus:border-gold mb-4" />
          <textarea placeholder={t.blessingsPlaceholderMsg} value={msg} onChange={(e) => setMsg(e.target.value)} rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-white/80 font-sans placeholder-gray-400 focus:outline-none focus:border-gold mb-4 resize-none" />
          <button type="submit" className="w-full py-3 bg-gold text-white rounded-xl font-sans font-semibold hover:bg-gold-light transition-colors">
            {t.blessingsSend}
          </button>
        </form>

        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence>
            {wishes.map((w) => (
              <motion.div key={w.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gold/10">
                <p className="font-serif text-gray-600 italic mb-3">&ldquo;{w.message}&rdquo;</p>
                <p className="font-sans text-gold text-sm font-medium">— {w.name}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
