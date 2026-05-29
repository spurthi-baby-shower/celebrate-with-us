import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../LangContext'

export default function RSVP() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', guests: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = t.rsvpNameReq
    if (!form.guests) e.guests = t.rsvpGuestReq
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = t.rsvpPhoneReq
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 md:py-36 px-6 bg-gradient-to-b from-cream to-gold-pale/20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto glass rounded-2xl p-10 text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="text-6xl block mb-4">🎉</motion.span>
          <h3 className="font-display text-2xl text-gray-800 mb-2">{t.rsvpThanks}</h3>
          <p className="font-sans text-gray-500">{t.rsvpThanksSub}</p>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-24 md:py-36 px-6 bg-gradient-to-b from-cream to-gold-pale/20">
      <motion.div className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <h2 className="font-display text-3xl md:text-5xl text-center text-gray-800 mb-3">{t.rsvpTitle}</h2>
        <p className="font-sans text-center text-gray-500 mb-12">{t.rsvpSub}</p>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-10 space-y-5">
          <Field label={t.rsvpName} name="name" value={form.name} onChange={handleChange} error={errors.name} />
          <div>
            <label className="font-sans text-sm text-gray-600 mb-1 block">{t.rsvpGuests}</label>
            <select name="guests" value={form.guests} onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${errors.guests ? 'border-red-400' : 'border-gold/20'} bg-white/80 font-sans focus:outline-none focus:border-gold`}>
              <option value="">--</option>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
          </div>
          <Field label={t.rsvpPhone} name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} />
          <div>
            <label className="font-sans text-sm text-gray-600 mb-1 block">{t.rsvpMsg}</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gold/20 bg-white/80 font-sans focus:outline-none focus:border-gold resize-none" />
          </div>
          <button type="submit"
            className="w-full py-4 bg-gold text-white rounded-xl font-sans font-semibold text-lg hover:bg-gold-light transition-colors shadow-lg">
            {t.rsvpSubmit}
          </button>
        </form>
      </motion.div>
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, error }) {
  return (
    <div>
      <label className="font-sans text-sm text-gray-600 mb-1 block">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-400' : 'border-gold/20'} bg-white/80 font-sans focus:outline-none focus:border-gold`} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
