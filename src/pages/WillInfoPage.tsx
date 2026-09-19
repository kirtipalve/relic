import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Chat from '../Chat'
import { willQuestions } from '../questions'
import { loadAnswers } from '../store'

export default function WillInfoPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!loadAnswers().nameAndOrigin) navigate('/')
  }, [navigate])

  return (
    <Chat
      intro="Thank you. Now let's get into the details of your will itself."
      questions={willQuestions}
      onComplete={() => {}}
      step={2}
      totalSteps={2}
    />
  )
}
