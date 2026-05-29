import { LangProvider, useLang } from './LangContext'
import LangSelect from './components/LangSelect'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Welcome from './components/Welcome'
import EventDetails from './components/EventDetails'
import Countdown from './components/Countdown'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'

function AppContent() {
  const { lang } = useLang()

  if (!lang) return <LangSelect />

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Welcome />
      <EventDetails />
      <Countdown />
      <Gallery />
      <Footer />
      <MusicPlayer />
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  )
}
