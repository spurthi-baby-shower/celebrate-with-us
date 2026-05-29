import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../LangContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  const links = [
    { href: '#home', label: t.home },
    { href: '#details', label: t.details },
    { href: '#gallery', label: t.gallery },
  ]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-script text-2xl text-gold">S & H</a>

        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="font-sans text-sm text-gray-600 hover:text-gold transition-colors tracking-wide">{l.label}</a>
          ))}
          <button onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
            className="px-3 py-1.5 text-xs font-semibold border border-gold/30 rounded-full text-gold hover:bg-gold hover:text-white transition-all">
            {lang === 'en' ? 'ಕನ್ನಡ' : 'English'}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
            className="px-2 py-1 text-xs border border-gold/30 rounded-full text-gold font-kannada">
            {lang === 'en' ? 'ಕ' : 'En'}
          </button>
          <button onClick={() => setOpen(!open)} className="text-gold text-xl">{open ? '✕' : '☰'}</button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gold/10">
            <div className="px-6 py-4 space-y-3">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block font-sans text-gray-600 hover:text-gold py-2">{l.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
