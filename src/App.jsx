import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import LetterToWord from './pages/LetterToWord'
import PictureToLetter from './pages/PictureToLetter'
import DrawLines from './pages/DrawLines'
import CountAndMatch from './pages/CountAndMatch'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-surface-100 to-surface-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/letter-to-word" element={<LetterToWord />} />
          <Route path="/picture-to-letter" element={<PictureToLetter />} />
          <Route path="/draw-lines" element={<DrawLines />} />
          <Route path="/count-and-match" element={<CountAndMatch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App