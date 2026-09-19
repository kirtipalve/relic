import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WillInfoPage from './pages/WillInfoPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/will" element={<WillInfoPage />} />
    </Routes>
  )
}

export default App
