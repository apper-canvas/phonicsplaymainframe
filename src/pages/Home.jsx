import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearTimeout(welcomeTimer)
    }
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 bg-pattern">
      {/* Welcome Animation */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="fixed inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm z-50 flex items-center justify-center"
>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                {getGreeting()}!
              </h1>
              <p className="text-xl text-white/80">
                Welcome to KidPlay
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-between w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="text-3xl">🎮</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
                  KidPlay
                </h1>
                <p className="text-sm text-neutral-600">
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-500 transition-colors"
              >
                <ApperIcon name="HelpCircle" className="w-4 h-4" />
                Help
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-500 transition-colors"
              >
                <ApperIcon name="Mail" className="w-4 h-4" />
                Contact
              </motion.button>
            </div>
          </div>

{/* Navigation Menu */}
          <nav className="mt-6">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              <button 
                onClick={() => navigate('/letter-to-word')}
                className="glass-card px-4 py-3 md:px-6 md:py-3 hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl md:text-2xl group-hover:animate-bounce">📝</span>
                  <span className="text-sm md:text-base font-semibold text-neutral-700">Letter to Word</span>
                </div>
              </button>
              
              <button 
                onClick={() => navigate('/picture-to-letter')}
                className="glass-card px-4 py-3 md:px-6 md:py-3 hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl md:text-2xl group-hover:animate-bounce">🖼️</span>
                  <span className="text-sm md:text-base font-semibold text-neutral-700">Picture to Letter</span>
                </div>
              </button>
              
              <button 
                onClick={() => navigate('/draw-lines')}
                className="glass-card px-4 py-3 md:px-6 md:py-3 hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl md:text-2xl group-hover:animate-bounce">✏️</span>
                  <span className="text-sm md:text-base font-semibold text-neutral-700">Draw Lines</span>
                </div>
              </button>
              
              <button 
                onClick={() => navigate('/count-and-match')}
                className="glass-card px-4 py-3 md:px-6 md:py-3 hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl md:text-2xl group-hover:animate-bounce">🔢</span>
                  <span className="text-sm md:text-base font-semibold text-neutral-700">Count and Match</span>
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Welcome Section */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="glass-card-strong p-12 md:p-16 space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-neutral-800 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  KidPlay
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-neutral-600 font-medium leading-relaxed">
                Where learning meets imagination
              </p>
            </div>
            
            <div className="pt-6">
              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-2xl mx-auto">
                Discover the joy of learning through interactive games and activities designed to spark creativity and build foundational skills.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Home