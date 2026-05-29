import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [showVol, setShowVol] = useState(false)
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const play = () => {
      if (audioRef.current) {
        audioRef.current.volume = volume
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
      }
      document.removeEventListener('click', play)
    }
    document.addEventListener('click', play)
    return () => document.removeEventListener('click', play)
  }, [])

  const toggle = (e) => {
    e.stopPropagation()
    if (playing) { audioRef.current?.pause() }
    else { audioRef.current?.play() }
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} src="/bgmusic.mp3" loop preload="auto" />
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
        <AnimatePresence>
          {showVol && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="bg-white rounded-full shadow-lg p-2 border border-gold/20">
              <input type="range" min="0" max="1" step="0.05" value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 accent-gold cursor-pointer" style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical', height: '80px', width: '20px' }} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggle}
          onMouseEnter={() => setShowVol(true)}
          onMouseLeave={() => setShowVol(false)}
          className="w-12 h-12 bg-gold text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gold-light transition-colors text-lg"
          animate={playing ? { rotate: [0, 360] } : {}}
          transition={playing ? { duration: 4, repeat: Infinity, ease: 'linear' } : {}}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? '♫' : '♪'}
        </motion.button>
      </div>
    </>
  )
}
