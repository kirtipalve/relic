import { useEffect, useRef, useState } from 'react'
import type { Question } from './questions'
import type { Answers } from './store'
import { loadAnswers, saveAnswers } from './store'
import './Chat.css'

type Message = { role: 'agent' | 'user'; text: string }

const PACE_MS: Record<'fast' | 'slow', number> = { fast: 500, slow: 1100 }

function nextApplicableIndex(questions: Question[], from: number, answers: Answers): number {
  let i = from
  while (i < questions.length && questions[i].condition && !questions[i].condition!(answers)) {
    i++
  }
  return i
}

type SpeechRecognitionLike = {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: any) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  const w = window as any
  return w.SpeechRecognition || w.webkitSpeechRecognition || null
}

export default function Chat({
  intro,
  questions,
  onComplete,
  step,
  totalSteps,
}: {
  intro: string
  questions: Question[]
  onComplete: (answers: Answers) => void
  step: number
  totalSteps: number
}) {
  const [answers, setAnswers] = useState<Answers>(() => loadAnswers())
  const [index, setIndex] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [typing, setTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [done, setDone] = useState(false)
  const [listening, setListening] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const speechSupported = useRef(!!getSpeechRecognition())

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    const startIndex = nextApplicableIndex(questions, 0, loadAnswers())
    revealAgentMessage(intro, PACE_MS.fast, () => {
      if (startIndex < questions.length) {
        revealAgentMessage(questions[startIndex].prompt, PACE_MS[questions[startIndex].pace ?? 'fast'])
        setIndex(startIndex)
      } else {
        setDone(true)
      }
    })

    return () => {
      timers.current.forEach(clearTimeout)
      recognitionRef.current?.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function revealAgentMessage(text: string, delay: number, after?: () => void) {
    setTyping(true)
    const t = setTimeout(() => {
      setMessages((m) => [...m, { role: 'agent', text }])
      setTyping(false)
      after?.()
    }, delay)
    timers.current.push(t)
  }

  function commitAnswer(value: string, opts?: { force?: boolean }) {
    const question = questions[index]
    if (!opts?.force && !value.trim() && !question.optional) return

    const trimmed = value.trim()
    const updatedAnswers = { ...answers, [question.key]: trimmed }
    setAnswers(updatedAnswers)
    saveAnswers({ [question.key]: trimmed })

    const userText = trimmed || '(skipped)'
    const next = nextApplicableIndex(questions, index + 1, updatedAnswers)

    setMessages((m) => [...m, { role: 'user', text: userText }])
    setInputValue('')
    setIndex(next)

    if (next < questions.length) {
      revealAgentMessage(questions[next].prompt, PACE_MS[questions[next].pace ?? 'fast'])
    } else {
      setDone(true)
      onComplete(updatedAnswers)
    }
  }

  function toggleListening() {
    const Recognition = getSpeechRecognition()
    if (!Recognition) return

    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const recognition = new Recognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInputValue((v) => (v ? `${v} ${transcript}` : transcript))
    }
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  const currentQuestion = !done && !typing && index < questions.length ? questions[index] : null

  return (
    <div className="chat">
      <div className="chat-progress">
        {step} / {totalSteps}
      </div>
      <div className="chat-log">
        {messages.map((m, i) =>
          m.role === 'agent' ? (
            <div key={i} className="message-row">
              <span className="avatar">R</span>
              <div className="bubble agent">{m.text}</div>
            </div>
          ) : (
            <div key={i} className="bubble user">
              {m.text}
            </div>
          ),
        )}
        {typing && (
          <div className="message-row">
            <span className="avatar">R</span>
            <div className="bubble agent typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        {done && !typing && (
          <div className="message-row">
            <span className="avatar">R</span>
            <div className="bubble agent">That's everything for this section — thank you.</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {currentQuestion && currentQuestion.type === 'select' && (
        <div className="options">
          {currentQuestion.options!.map((opt) => (
            <button key={opt} className="option-btn" onClick={() => commitAnswer(opt)}>
              {opt}
            </button>
          ))}
          <button className="skip-btn" onClick={() => commitAnswer('', { force: true })}>
            Skip
          </button>
        </div>
      )}

      {currentQuestion && currentQuestion.type === 'text' && (
        <form
          className="chat-input"
          onSubmit={(e) => {
            e.preventDefault()
            commitAnswer(inputValue)
          }}
        >
          {speechSupported.current && (
            <button
              type="button"
              className={`mic-btn ${listening ? 'mic-listening' : ''}`}
              onClick={toggleListening}
              aria-label="Speak your answer"
              title="Speak your answer"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" />
                <path d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.08A7 7 0 0 0 19 11z" />
              </svg>
            </button>
          )}
          <input
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={currentQuestion.optional ? 'Type your answer (or skip)' : 'Type your answer'}
          />
          <button type="button" className="skip-btn" onClick={() => commitAnswer('', { force: true })}>
            Skip
          </button>
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  )
}
