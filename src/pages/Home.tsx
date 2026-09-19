import { useState } from 'react'
import Landing from '../Landing'
import GeneralInfoPage from './GeneralInfoPage'

export default function Home() {
  const [showLanding, setShowLanding] = useState(true)

  if (showLanding) return <Landing onFinish={() => setShowLanding(false)} />
  return <GeneralInfoPage />
}
