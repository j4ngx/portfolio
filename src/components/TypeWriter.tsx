import { useState, useEffect, useCallback } from 'react'

interface Props {
  readonly phrases: readonly string[]
  /** Typing speed in ms per character */
  readonly typeSpeed?: number
  /** Deleting speed in ms per character */
  readonly deleteSpeed?: number
  /** Pause between phrases in ms */
  readonly pauseMs?: number
}

export default function TypeWriter({
  phrases,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseMs = 2000,
}: Props) {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const current = phrases[phraseIdx]

    if (!isDeleting) {
      // Typing forward
      setText(current.slice(0, text.length + 1))
      if (text.length + 1 === current.length) {
        // Finished typing — pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseMs)
        return
      }
    } else {
      // Deleting
      setText(current.slice(0, text.length - 1))
      if (text.length - 1 === 0) {
        setIsDeleting(false)
        setPhraseIdx((prev) => (prev + 1) % phrases.length)
        return
      }
    }
  }, [phrases, phraseIdx, text, isDeleting, pauseMs])

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting, typeSpeed, deleteSpeed])

  return (
    <span className="text-accent">
      {text}
      <span className="inline-block w-[3px] h-[1em] bg-accent ml-0.5 align-middle animate-cursor" />
    </span>
  )
}
