import { useEffect, useState } from 'react'
import './Landing.css'

export default function Landing({ onFinish }: { onFinish: () => void }) {
  const [showBegin, setShowBegin] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowBegin(true), 1900)
    return () => clearTimeout(t)
  }, [])

  function begin() {
    setLeaving(true)
    setTimeout(onFinish, 400)
  }

  return (
    <div className={`landing ${leaving ? 'landing-leaving' : ''}`}>
      <div className="seal">
        <span className="seal-word">RELIC</span>
      </div>
      <div className="seal-ring" />
      <p className="landing-tagline">Your legacy, written with care.</p>
      {showBegin && (
        <button className="landing-begin" onClick={begin}>
          Begin
        </button>
      )}
    </div>
  )
}
