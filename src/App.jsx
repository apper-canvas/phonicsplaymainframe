import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
function App() {
  return (
    <Router>
<div className="min-h-screen bg-gradient-to-br from-surface-50 via-surface-100 to-surface-200">
        <Routes>
<Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App