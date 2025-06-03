import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const CountAndMatch = () => {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 bg-pattern">
      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-between w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 hover:opacity-75 transition-opacity"
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
              </button>
            </motion.div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-500 transition-colors"
              >
                <ApperIcon name="Home" className="w-4 h-4" />
                Home
              </motion.button>
            </div>
          </div>

          {/* Game Title */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
              🔢 Count and Match
            </h2>
            <p className="text-lg text-neutral-600">
              Count the items and match them with the correct numbers
            </p>
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="flex-1 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <MainFeature initialActivity="number-match" />
        </div>
      </main>
    </div>
  )
}

export default CountAndMatch