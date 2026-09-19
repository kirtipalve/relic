import { useNavigate } from 'react-router-dom'
import Chat from '../Chat'
import { generalQuestions } from '../questions'

export default function GeneralInfoPage() {
  const navigate = useNavigate()

  return (
    <Chat
      intro="Hi, I'm Relic. I'll help you put together your will, one step at a time. Let's start with a few basics about you."
      questions={generalQuestions}
      onComplete={() => navigate('/will')}
      step={1}
      totalSteps={2}
    />
  )
}
