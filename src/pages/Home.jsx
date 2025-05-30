import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
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
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-6xl mb-4"
              >
                📚
              </motion.div>
              <h1 className="text-4xl font-bold text-primary mb-2 font-heading">
                Welcome to PhonicsPlay!
              </h1>
              <p className="text-xl text-surface-600">
                Let's learn letters and sounds together!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-sm shadow-soft border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-bubble flex items-center justify-center shadow-letter">
                <span className="text-2xl sm:text-3xl">📖</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary font-heading">
                  PhonicsPlay
                </h1>
                <p className="text-sm sm:text-base text-surface-600">
                  Learning Letters & Sounds
                </p>
              </div>
            </motion.div>

            <div className="flex items-center gap-4 text-center sm:text-right">
              <div className="hidden sm:block">
                <p className="text-lg font-medium text-surface-700">
                  {getGreeting()}!
                </p>
                <p className="text-sm text-surface-500">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center shadow-soft hover:shadow-playful transition-all duration-300"
              >
                <ApperIcon name="Settings" className="w-5 h-5 sm:w-6 sm:h-6 text-surface-700" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <MainFeature />
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/60 backdrop-blur-sm border-t border-white/20 mt-12"
      >
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-surface-600">
              <ApperIcon name="Heart" className="w-4 h-4 text-primary" />
              <span className="text-sm">Made with love for young learners</span>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-sm text-surface-600 hover:text-primary transition-colors"
              >
                <ApperIcon name="HelpCircle" className="w-4 h-4" />
                Help
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-sm text-surface-600 hover:text-primary transition-colors"
              >
                <ApperIcon name="Mail" className="w-4 h-4" />
                Contact
              </motion.button>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home