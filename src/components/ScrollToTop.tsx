import { useState, useEffect } from 'react'
import Icon from './Icon'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 600)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-22 right-6 z-40 w-11 h-11 rounded-full bg-solid text-on-solid shadow-lg
                 flex items-center justify-center
                 hover:bg-solid-hover transition-all duration-300
                 animate-fade-in-up cursor-pointer"
    >
      <Icon icon="arrow_upward" className="text-lg" />
    </button>
  )
}
