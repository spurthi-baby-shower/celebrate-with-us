import { createContext, useContext, useState } from 'react'

const content = {
  en: {
    // Hero
    ceremony: 'Seemantha Ceremony',
    tagline: 'Celebrating the arrival of our little bundle of joy',
    couple: 'Spurthi Rani A & Harish J',
    date: 'June 4, 2026',
    dateShort: 'June 4',
    day: 'Wednesday',
    // Welcome
    inviteTitle: 'With Blessings & Joy',
    inviteBody: 'With hearts overflowing with gratitude and joy, we invite you to grace the sacred Seemantha ceremony of our beloved daughter. As we celebrate this divine transition into motherhood, your presence and blessings will make this occasion truly auspicious.',
    inviteSub: 'Join us in invoking the blessings of the divine for the mother and the little one who is about to enter this beautiful world.',
    // Event
    eventTitle: 'Event Details',
    dateLabel: 'Date',
    timeLabel: 'Time',
    venueLabel: 'Venue',
    timeValue: '11:00 AM Onwards',
    venue: 'Venue Name',
    venueSub: 'Address to be updated',
    viewMap: 'View on Maps',
    addCal: 'Add to Calendar',
    // Countdown
    countdownTitle: 'The Auspicious Day Awaits',
    countdownSub: 'counting every moment',
    days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
    // Gallery
    galleryTitle: 'The Blessed Couple',
    // Timeline
    timelineTitle: 'Celebration Timeline',
    arrival: 'Guest Arrival', arrivalDesc: 'Welcome with traditional aarti & refreshments',
    welcome: 'Welcome Ceremony', welcomeDesc: 'Invocation & opening prayers',
    ritual: 'Seemantha Ritual', ritualDesc: 'Sacred traditional ceremony with blessings',
    blessingsEvt: 'Blessings', blessingsDesc: 'Elders shower blessings on the mother-to-be',
    lunch: 'Festive Lunch', lunchDesc: 'Traditional banana leaf feast',
    photos: 'Family Photos', photosDesc: 'Capturing precious memories together',
    // Blessings
    blessingsTitle: 'Blessings & Wishes',
    blessingsPlaceholderName: 'Your Name',
    blessingsPlaceholderMsg: 'Your blessings for the little one...',
    blessingsSend: 'Send Blessings ✨',
    // RSVP
    rsvpTitle: 'RSVP',
    rsvpSub: 'Kindly confirm your gracious presence',
    rsvpName: 'Your Name *',
    rsvpGuests: 'Number of Guests *',
    rsvpPhone: 'Phone Number *',
    rsvpMsg: 'Message (Optional)',
    rsvpSubmit: 'Confirm Attendance',
    rsvpThanks: 'Thank You!',
    rsvpThanksSub: 'We look forward to celebrating with you.',
    rsvpNameReq: 'Name is required',
    rsvpGuestReq: 'Guest count is required',
    rsvpPhoneReq: 'Valid phone number is required',
    // Nav
    home: 'Home', details: 'Details', gallery: 'Gallery', timeline: 'Timeline', rsvp: 'RSVP',
    // Footer
    footer: 'Made with ❤️ for Spurthi & Harish',
  },
  kn: {
    ceremony: 'ಸೀಮಂತ ಸಮಾರಂಭ',
    tagline: 'ನಮ್ಮ ಮನೆಗೆ ಬರಲಿರುವ ಚಿಕ್ಕ ಕಂದನ ಆಗಮನದ ಸಂಭ್ರಮ',
    couple: 'ಸ್ಪೂರ್ತಿ ರಾಣಿ ಎ & ಹರೀಶ್ ಜೆ',
    date: 'ಜೂನ್ ೪, ೨೦೨೬',
    dateShort: 'ಜೂನ್ ೪',
    day: 'ಬುಧವಾರ',
    inviteTitle: 'ಆಶೀರ್ವಾದ ಮತ್ತು ಸಂತೋಷದೊಂದಿಗೆ',
    inviteBody: 'ಕೃತಜ್ಞತೆ ಮತ್ತು ಸಂತೋಷದಿಂದ ತುಂಬಿದ ಹೃದಯಗಳೊಂದಿಗೆ, ನಮ್ಮ ಪ್ರೀತಿಯ ಮಗಳ ಪವಿತ್ರ ಸೀಮಂತ ಸಮಾರಂಭಕ್ಕೆ ನಿಮ್ಮನ್ನು ಆಹ್ವಾನಿಸುತ್ತೇವೆ. ತಾಯ್ತನದ ಈ ದಿವ್ಯ ಪರಿವರ್ತನೆಯನ್ನು ಆಚರಿಸುವಾಗ, ನಿಮ್ಮ ಉಪಸ್ಥಿತಿ ಮತ್ತು ಆಶೀರ್ವಾದ ಈ ಸಂದರ್ಭವನ್ನು ನಿಜವಾಗಿಯೂ ಮಂಗಳಕರವಾಗಿಸುತ್ತದೆ.',
    inviteSub: 'ತಾಯಿ ಮತ್ತು ಈ ಸುಂದರ ಜಗತ್ತಿಗೆ ಬರಲಿರುವ ಕಂದನಿಗೆ ದೈವಿಕ ಆಶೀರ್ವಾದವನ್ನು ಕೋರಲು ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ.',
    eventTitle: 'ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು',
    dateLabel: 'ದಿನಾಂಕ',
    timeLabel: 'ಸಮಯ',
    venueLabel: 'ಸ್ಥಳ',
    timeValue: 'ಬೆಳಿಗ್ಗೆ ೧೧:೦೦ ರಿಂದ',
    venue: 'ಸ್ಥಳದ ಹೆಸರು',
    venueSub: 'ವಿಳಾಸ ನವೀಕರಿಸಲಾಗುವುದು',
    viewMap: 'ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ',
    addCal: 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ',
    countdownTitle: 'ಮಂಗಳಕರ ದಿನ ಬರುತ್ತಿದೆ',
    countdownSub: 'ಪ್ರತಿ ಕ್ಷಣವನ್ನು ಎಣಿಸುತ್ತಿದ್ದೇವೆ',
    days: 'ದಿನಗಳು', hours: 'ಗಂಟೆಗಳು', minutes: 'ನಿಮಿಷಗಳು', seconds: 'ಸೆಕೆಂಡುಗಳು',
    galleryTitle: 'ಆಶೀರ್ವಾದಿತ ದಂಪತಿಗಳು',
    timelineTitle: 'ಆಚರಣೆಯ ಸಮಯಸೂಚಿ',
    arrival: 'ಅತಿಥಿಗಳ ಆಗಮನ', arrivalDesc: 'ಸಾಂಪ್ರದಾಯಿಕ ಆರತಿ ಮತ್ತು ಉಪಹಾರ',
    welcome: 'ಸ್ವಾಗತ ಸಮಾರಂಭ', welcomeDesc: 'ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಆಹ್ವಾನ',
    ritual: 'ಸೀಮಂತ ವಿಧಿ', ritualDesc: 'ಪವಿತ್ರ ಸಾಂಪ್ರದಾಯಿಕ ಸಮಾರಂಭ',
    blessingsEvt: 'ಆಶೀರ್ವಾದ', blessingsDesc: 'ಹಿರಿಯರ ಆಶೀರ್ವಾದ',
    lunch: 'ಹಬ್ಬದ ಊಟ', lunchDesc: 'ಸಾಂಪ್ರದಾಯಿಕ ಬಾಳೆ ಎಲೆ ಊಟ',
    photos: 'ಕುಟುಂಬ ಫೋಟೋಗಳು', photosDesc: 'ಅಮೂಲ್ಯ ನೆನಪುಗಳನ್ನು ಸೆರೆಹಿಡಿಯುವುದು',
    blessingsTitle: 'ಆಶೀರ್ವಾದ ಮತ್ತು ಶುಭ ಹಾರೈಕೆಗಳು',
    blessingsPlaceholderName: 'ನಿಮ್ಮ ಹೆಸರು',
    blessingsPlaceholderMsg: 'ಕಂದನಿಗೆ ನಿಮ್ಮ ಆಶೀರ್ವಾದ...',
    blessingsSend: 'ಆಶೀರ್ವಾದ ಕಳುಹಿಸಿ ✨',
    rsvpTitle: 'ಆರ್.ಎಸ್.ವಿ.ಪಿ',
    rsvpSub: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಉಪಸ್ಥಿತಿಯನ್ನು ದೃಢೀಕರಿಸಿ',
    rsvpName: 'ನಿಮ್ಮ ಹೆಸರು *',
    rsvpGuests: 'ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ *',
    rsvpPhone: 'ಫೋನ್ ಸಂಖ್ಯೆ *',
    rsvpMsg: 'ಸಂದೇಶ (ಐಚ್ಛಿಕ)',
    rsvpSubmit: 'ಉಪಸ್ಥಿತಿ ದೃಢೀಕರಿಸಿ',
    rsvpThanks: 'ಧನ್ಯವಾದಗಳು!',
    rsvpThanksSub: 'ನಿಮ್ಮೊಂದಿಗೆ ಆಚರಿಸಲು ಎದುರು ನೋಡುತ್ತಿದ್ದೇವೆ.',
    rsvpNameReq: 'ಹೆಸರು ಅಗತ್ಯ',
    rsvpGuestReq: 'ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ ಅಗತ್ಯ',
    rsvpPhoneReq: 'ಮಾನ್ಯ ಫೋನ್ ಸಂಖ್ಯೆ ಅಗತ್ಯ',
    home: 'ಮುಖಪುಟ', details: 'ವಿವರಗಳು', gallery: 'ಗ್ಯಾಲರಿ', timeline: 'ಸಮಯಸೂಚಿ', rsvp: 'ಆರ್.ಎಸ್.ವಿ.ಪಿ',
    footer: '❤️ ಸ್ಪೂರ್ತಿ & ಹರೀಶ್ ಗಾಗಿ ಪ್ರೀತಿಯಿಂದ',
  },
}

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState(null) // null = show selection screen
  const t = content[lang || 'en']
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
