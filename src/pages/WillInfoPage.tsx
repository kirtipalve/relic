import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Chat from '../Chat'
import { buildWillQuestions } from '../questions'
import { loadAnswers } from '../store'

export default function WillInfoPage() {
  const navigate = useNavigate()
  const [questions] = useState(() => buildWillQuestions(loadAnswers()))

  useEffect(() => {
    if (!loadAnswers().nameAndOrigin) navigate('/')
  }, [navigate])

  return (
    <Chat
      intro="Thank you for sharing all of that. Now let's turn it into the specifics your will needs."
      questions={questions}
      onComplete={() => {}}
      step={2}
      totalSteps={2}
    />
  )
}
