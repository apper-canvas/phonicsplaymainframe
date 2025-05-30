import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [currentActivity, setCurrentActivity] = useState('letter-match')
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [attempts, setAttempts] = useState(0)
  const [completedLetters, setCompletedLetters] = useState(new Set())
  const [gameState, setGameState] = useState('playing') // playing, celebrating, completed
  const [showHint, setShowHint] = useState(false)
  const audioRef = useRef(null)

  // Sample letters and words for different levels
  const letterData = {
    1: [
      { letter: 'A', word: 'Apple', sound: '/eɪ/', emoji: '🍎' },
      { letter: 'B', word: 'Ball', sound: '/b/', emoji: '⚽' },
      { letter: 'C', word: 'Cat', sound: '/k/', emoji: '🐱' },
      { letter: 'D', word: 'Dog', sound: '/d/', emoji: '🐕' }
    ],
    2: [
      { letter: 'E', word: 'Elephant', sound: '/ɛ/', emoji: '🐘' },
      { letter: 'F', word: 'Fish', sound: '/f/', emoji: '🐠' },
      { letter: 'G', word: 'Giraffe', sound: '/g/', emoji: '🦒' },
      { letter: 'H', word: 'House', sound: '/h/', emoji: '🏠' }
    ],
    3: [
      { letter: 'I', word: 'Ice cream', sound: '/aɪ/', emoji: '🍦' },
      { letter: 'J', word: 'Juice', sound: '/dʒ/', emoji: '🧃' },
      { letter: 'K', word: 'Kite', sound: '/k/', emoji: '🪁' },
      { letter: 'L', word: 'Lion', sound: '/l/', emoji: '🦁' }
    ]
  }

  const getCurrentLetters = () => letterData[level] || letterData[1]
  const [draggedLetter, setDraggedLetter] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState(new Set())

  // Audio simulation (in real app, this would play actual audio files)
  const playSound = (letter, type = 'letter') => {
    // Simulate audio feedback
    if (type === 'correct') {
      toast.success('🎉 Excellent! You got it right!', {
        autoClose: 2000,
        hideProgressBar: false
      })
    } else if (type === 'incorrect') {
      toast.error('Try again! You can do it!', {
        autoClose: 1500,
        hideProgressBar: false
      })
    } else {
      toast.info(`Letter ${letter} says "${getCurrentLetters().find(l => l.letter === letter)?.sound}"`, {
        autoClose: 2000,
        hideProgressBar: false
      })
    }
  }

  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter)
    setAttempts(prev => prev + 1)
    playSound(letter.letter)
  }

  const handleWordMatch = (word) => {
    if (selectedLetter && selectedLetter.word.toLowerCase() === word.toLowerCase()) {
      // Correct match
      setScore(prev => prev + 10)
      setCompletedLetters(prev => new Set([...prev, selectedLetter.letter]))
      setMatchedPairs(prev => new Set([...prev, selectedLetter.letter]))
      playSound(selectedLetter.letter, 'correct')
      setSelectedLetter(null)
      
      // Check if level is complete
      if (completedLetters.size + 1 >= getCurrentLetters().length) {
        setGameState('celebrating')
        setTimeout(() => {
          setLevel(prev => prev + 1)
          setCompletedLetters(new Set())
          setMatchedPairs(new Set())
          setGameState('playing')
          toast.success(`🌟 Level ${level} Complete! Moving to Level ${level + 1}!`)
        }, 2000)
      }
    } else {
      // Incorrect match
      playSound(selectedLetter?.letter, 'incorrect')
      setSelectedLetter(null)
    }
  }

  const resetGame = () => {
    setScore(0)
    setLevel(1)
    setAttempts(0)
    setCompletedLetters(new Set())
    setMatchedPairs(new Set())
    setSelectedLetter(null)
    setGameState('playing')
    toast.info('🔄 Game reset! Let\'s start fresh!')
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  const progressPercentage = (completedLetters.size / getCurrentLetters().length) * 100

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Game Header with Stats */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="activity-card mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {score}
              </div>
              <div className="text-xs sm:text-sm text-surface-600">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-secondary">
                {level}
              </div>
              <div className="text-xs sm:text-sm text-surface-600">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent">
                {attempts}
              </div>
              <div className="text-xs sm:text-sm text-surface-600">Tries</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleHint}
              className={`p-2 sm:p-3 rounded-bubble transition-all duration-300 ${
                showHint 
                  ? 'bg-accent text-surface-700 shadow-letter' 
                  : 'bg-surface-200 text-surface-600 hover:bg-accent hover:text-surface-700'
              }`}
            >
              <ApperIcon name="Lightbulb" className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetGame}
              className="p-2 sm:p-3 bg-primary text-white rounded-bubble hover:bg-primary-dark transition-all duration-300 shadow-soft hover:shadow-playful"
            >
              <ApperIcon name="RotateCcw" className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 sm:mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm sm:text-base font-medium text-surface-700">
              Level {level} Progress
            </span>
            <span className="text-sm sm:text-base text-surface-600">
              {completedLetters.size}/{getCurrentLetters().length}
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className="progress-fill"
            />
          </div>
        </div>
      </motion.div>

      {/* Hint Panel */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="activity-card mb-6 bg-accent/20 border-accent/30"
          >
            <div className="flex items-start gap-3">
              <ApperIcon name="Info" className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div className="text-sm sm:text-base text-surface-700">
                <p className="font-medium mb-2">How to play:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Click on a letter to hear its sound</li>
                  <li>Find the word that starts with that letter</li>
                  <li>Match letters to words to earn points!</li>
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Letters Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="activity-card"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-bubble flex items-center justify-center">
              <ApperIcon name="Type" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-surface-800 font-heading">
              Choose a Letter
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {getCurrentLetters().map((item, index) => (
              <motion.div
                key={item.letter}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLetterSelect(item)}
                className={`letter-card cursor-pointer text-center relative overflow-hidden ${
                  selectedLetter?.letter === item.letter 
                    ? 'ring-4 ring-primary shadow-playful' 
                    : ''
                } ${
                  completedLetters.has(item.letter)
                    ? 'bg-green-100 border-green-300'
                    : ''
                }`}
              >
                {completedLetters.has(item.letter) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <ApperIcon name="Check" className="w-4 h-4 text-white" />
                  </motion.div>
                )}
                
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 font-heading">
                  {item.letter}
                </div>
                <div className="text-sm sm:text-base text-surface-600">
                  {item.sound}
                </div>
                
                {selectedLetter?.letter === item.letter && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-primary/10 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full"
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Words Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="activity-card"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-bubble flex items-center justify-center">
              <ApperIcon name="Image" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-surface-800 font-heading">
              Find the Word
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {getCurrentLetters().map((item, index) => (
              <motion.div
                key={item.word}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWordMatch(item.word)}
                className={`letter-card cursor-pointer text-center ${
                  !selectedLetter 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-playful'
                } ${
                  matchedPairs.has(item.letter)
                    ? 'bg-green-100 border-green-300 opacity-50'
                    : ''
                }`}
              >
                <div className="text-4xl sm:text-5xl mb-3">
                  {item.emoji}
                </div>
                <div className="text-lg sm:text-xl font-bold text-surface-800 mb-1">
                  {item.word}
                </div>
                <div className="text-xs sm:text-sm text-surface-500">
                  Starts with "{item.letter}"
                </div>
                
                {matchedPairs.has(item.letter) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-green-200/50 flex items-center justify-center rounded-bubble"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <ApperIcon name="Check" className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          {selectedLetter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-primary/10 rounded-bubble border border-primary/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {selectedLetter.letter}
                  </span>
                </div>
                <div className="text-sm sm:text-base text-surface-700">
                  Find a word that starts with "<strong>{selectedLetter.letter}</strong>"
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Celebration Animation */}
      <AnimatePresence>
        {gameState === 'celebrating' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="bg-white rounded-2xl p-8 shadow-playful text-center max-w-sm mx-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: 3
                }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-primary mb-2 font-heading">
                Amazing Job!
              </h3>
              <p className="text-surface-600">
                You completed Level {level}!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature