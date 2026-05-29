import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { PremiumDivider, FloralCorner } from './Decorations'

const BASE = import.meta.env.BASE_URL || '/'

export default function Gallery() {
  const { t } = useLang()

  return (
    <section id="gallery" className="py-28 md:py-40 px-6 relative overflow-hidden">
      <FloralCorner className="absolute top-0 left-0 w-24 md:w-32 opacity-60" />
      <FloralCorner className="absolute top-0 right-0 w-24 md:w-32 opacity-60" flip />

      <motion.div className="max-w-5xl mx-auto relative z-10"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}>

        <h2 className="font-display text-3xl md:text-5xl text-center text-gray-800 mb-4">{t.galleryTitle}</h2>
        <PremiumDivider className="mb-16" />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {['couple.png', 'image.png'].map((file, i) => (
            <motion.div key={file}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}>

              {/* Glow effect on hover */}
              <div className="absolute -inset-2 bg-gradient-to-br from-gold/20 to-gold-light/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Gold border frame */}
              <div className="absolute -inset-1 border-2 border-gold/20 rounded-2xl group-hover:border-gold/40 transition-colors duration-300" />

              <motion.img
                src={`${BASE}${file}`}
                alt={`Spurthi & Harish ${i + 1}`}
                className="relative w-full rounded-2xl shadow-2xl object-cover aspect-[3/4]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                loading="lazy"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
