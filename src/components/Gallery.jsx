import { motion } from 'framer-motion'
import { useLang } from '../LangContext'
import { FloralDivider } from './Decorations'

export default function Gallery() {
  const { t } = useLang()

  return (
    <section id="gallery" className="py-24 md:py-36 px-6 relative">
      <FloralDivider className="absolute top-0 left-0 right-0 h-8" />

      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl md:text-5xl text-center text-gray-800 mb-4">{t.galleryTitle}</h2>
        <div className="flex justify-center mb-16">
          <div className="h-1 w-20 bg-gold rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {['/couple.png', '/image.png'].map((src, i) => (
            <motion.div
              key={src}
              className="relative group rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <div className="absolute -inset-1 border border-gold/20 rounded-2xl group-hover:border-gold/40 transition-colors z-10 pointer-events-none" />
              <motion.img
                src={src}
                alt={`Spurthi & Harish ${i + 1}`}
                className="w-full rounded-2xl shadow-2xl object-cover aspect-[3/4]"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
