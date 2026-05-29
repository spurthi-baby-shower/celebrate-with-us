import { useLang } from '../LangContext'
import { MangoLeaves, Lotus } from './Decorations'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="py-14 px-6 text-center bg-white/30 border-t border-gold/10 relative">
      <MangoLeaves className="absolute top-0 left-0 right-0 h-10 opacity-30" />
      <Lotus className="w-10 h-10 mx-auto mb-4 opacity-40" />
      <p className="font-script text-2xl text-gold mb-2">Spurthi & Harish</p>
      <p className="font-sans text-sm text-gray-400">{t.footer}</p>
      <p className="font-sans text-xs text-gray-300 mt-3">{t.date}</p>
    </footer>
  )
}
