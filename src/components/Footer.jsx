import { useLang } from '../LangContext'
import { PremiumMangoTorana, PremiumDivider } from './Decorations'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="py-16 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-gold-pale/20 to-transparent" />
      <PremiumMangoTorana className="absolute top-0 left-0 right-0 h-12 opacity-40" />
      <div className="relative z-10">
        <PremiumDivider className="mb-8" />
        <p className="font-script text-3xl text-gold mb-3">Spurthi & Harish</p>
        <p className="font-sans text-sm text-gray-400">{t.footer}</p>
        <p className="font-sans text-xs text-gray-300 mt-4">{t.date}</p>
      </div>
    </footer>
  )
}
