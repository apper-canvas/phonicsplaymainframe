import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
const [currentActivity, setCurrentActivity] = useState('letter-match') // 'letter-match' or 'picture-match'
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [attempts, setAttempts] = useState(0)
  const [completedLetters, setCompletedLetters] = useState(new Set())
  const [gameState, setGameState] = useState('playing') // playing, celebrating, completed
  const [showHint, setShowHint] = useState(false)
  const audioRef = useRef(null)
const [draggedLetter, setDraggedLetter] = useState(null)
  const [selectedPicture, setSelectedPicture] = useState(null)
const [drawingLines, setDrawingLines] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentLine, setCurrentLine] = useState(null)
  const drawingSvgRef = useRef(null)
  const [connectionPoints, setConnectionPoints] = useState({})

// Complete A-Z alphabet data for randomized selection
  const alphabetData = [
    { letter: 'A', word: 'Apple', sound: '/eɪ/', emoji: '🍎' },
    { letter: 'B', word: 'Ball', sound: '/b/', emoji: '⚽' },
    { letter: 'C', word: 'Cat', sound: '/k/', emoji: '🐱' },
    { letter: 'D', word: 'Dog', sound: '/d/', emoji: '🐕' },
    { letter: 'E', word: 'Elephant', sound: '/ɛ/', emoji: '🐘' },
    { letter: 'F', word: 'Fish', sound: '/f/', emoji: '🐠' },
    { letter: 'G', word: 'Giraffe', sound: '/g/', emoji: '🦒' },
    { letter: 'H', word: 'House', sound: '/h/', emoji: '🏠' },
    { letter: 'I', word: 'Ice cream', sound: '/aɪ/', emoji: '🍦' },
    { letter: 'J', word: 'Juice', sound: '/dʒ/', emoji: '🧃' },
    { letter: 'K', word: 'Kite', sound: '/k/', emoji: '🪁' },
    { letter: 'L', word: 'Lion', sound: '/l/', emoji: '🦁' },
    { letter: 'M', word: 'Mouse', sound: '/m/', emoji: '🐭' },
    { letter: 'N', word: 'Nest', sound: '/n/', emoji: '🪺' },
    { letter: 'O', word: 'Orange', sound: '/ɔ/', emoji: '🍊' },
    { letter: 'P', word: 'Pizza', sound: '/p/', emoji: '🍕' },
    { letter: 'Q', word: 'Queen', sound: '/kw/', emoji: '👑' },
    { letter: 'R', word: 'Robot', sound: '/r/', emoji: '🤖' },
    { letter: 'S', word: 'Sun', sound: '/s/', emoji: '☀️' },
    { letter: 'T', word: 'Tree', sound: '/t/', emoji: '🌳' },
    { letter: 'U', word: 'Umbrella', sound: '/ʌ/', emoji: '☂️' },
    { letter: 'V', word: 'Violin', sound: '/v/', emoji: '🎻' },
    { letter: 'W', word: 'Whale', sound: '/w/', emoji: '🐋' },
    { letter: 'X', word: 'Xylophone', sound: '/ks/', emoji: '🎵' },
    { letter: 'Y', word: 'Yacht', sound: '/j/', emoji: '⛵' },
    { letter: 'Z', word: 'Zebra', sound: '/z/', emoji: '🦓' }
  ]

  // Level-based letter data for letter-match and picture-match modes
  const letterData = {
    1: alphabetData.slice(0, 4),   // A-D
    2: alphabetData.slice(4, 8),   // E-H
    3: alphabetData.slice(8, 12),  // I-L
    4: alphabetData.slice(12, 16), // M-P
    5: alphabetData.slice(16, 20), // Q-T
    6: alphabetData.slice(20, 26)  // U-Z
  }

  // State for randomized letters in line-drawing mode
  const [randomizedLetters, setRandomizedLetters] = useState([])
const [letterCount, setLetterCount] = useState(5) // Default to 5 letters
  const [randomSeed, setRandomSeed] = useState(0) // Force re-randomization
  const [matchedPairs, setMatchedPairs] = useState(new Set())
const [randomizedPictures, setRandomizedPictures] = useState([])

  // Utility functions for randomization
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const selectRandomLetters = (count) => {
    const shuffled = shuffleArray(alphabetData)
    return shuffled.slice(0, Math.min(count, alphabetData.length))
  }
const shufflePictures = (letters) => {
    return shuffleArray([...letters])
  }

  const getCurrentLetters = () => {
    if (currentActivity === 'line-drawing') {
      return randomizedLetters
    }
    return letterData[level] || letterData[1]
  }

const generateNewSet = () => {
    const newLetters = selectRandomLetters(letterCount)
    const newPictures = shufflePictures(newLetters)
    setRandomizedLetters(newLetters)
    setRandomizedPictures(newPictures)
    setRandomSeed(prev => prev + 1)
    toast.info(`🔀 Generated new set with ${newLetters.length} letters!`)
setConnectionPoints({}) // Clear connection points when generating new set
  }
const handleLetterCountChange = (newCount) => {
    setLetterCount(newCount)
    const newLetters = selectRandomLetters(newCount)
    const newPictures = shufflePictures(newLetters)
    setRandomizedLetters(newLetters)
    setRandomizedPictures(newPictures)
    toast.info(`📝 Set to ${newCount} letters!`)
setConnectionPoints({}) // Clear connection points when changing letter count
  }
  // Generate initial randomized letters
useEffect(() => {
    if (currentActivity === 'line-drawing' || randomizedLetters.length === 0) {
      const newLetters = selectRandomLetters(letterCount)
      const newPictures = shufflePictures(newLetters)
      setRandomizedLetters(newLetters)
      setRandomizedPictures(newPictures)
    }
setConnectionPoints({}) // Clear connection points on re-initialization
  }, [currentActivity, letterCount])

  // Audio simulation (in real app, this would play actual audio files)
const playSound = (letter, type = 'letter') => {
    // Simulate audio feedback
    if (type === 'correct') {
      const message = currentActivity === 'picture-match' 
        ? '🎉 Perfect match! You matched the picture to the letter!'
        : '🎉 Excellent! You got it right!'
      toast.success(message, {
        autoClose: 2000,
        hideProgressBar: false
      })
    } else if (type === 'incorrect') {
      const message = currentActivity === 'picture-match'
        ? 'Try again! Look at the picture and find its starting letter!'
        : 'Try again! You can do it!'
      toast.error(message, {
        autoClose: 1500,
        hideProgressBar: false
      })
    } else if (type === 'picture') {
      toast.info(`This picture starts with the letter "${letter}"`, {
        autoClose: 2000,
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
const handlePictureSelect = (item) => {
    setSelectedPicture(item)
    setAttempts(prev => prev + 1)
    playSound(item.letter, 'picture')
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

  const handlePictureMatch = (targetLetter) => {
    if (selectedPicture && selectedPicture.letter === targetLetter) {
      // Correct match
      setScore(prev => prev + 15) // Slightly higher score for picture matching
      setCompletedLetters(prev => new Set([...prev, selectedPicture.letter]))
      setMatchedPairs(prev => new Set([...prev, selectedPicture.letter]))
      playSound(selectedPicture.letter, 'correct')
      setSelectedPicture(null)
      setDraggedLetter(null)
      
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
      playSound(selectedPicture?.letter, 'incorrect')
      setSelectedPicture(null)
      setDraggedLetter(null)
    }
  }

const switchActivity = (newActivity) => {
    if (newActivity !== currentActivity) {
      setCurrentActivity(newActivity)
      setSelectedLetter(null)
      setSelectedPicture(null)
      setDraggedLetter(null)
      setDrawingLines([])
      setCurrentLine(null)
      setIsDrawing(false)
      setConnectionPoints({}) // Clear connection points
      
      // Generate new randomized letters when switching to line-drawing mode
      if (newActivity === 'line-drawing') {
        const newLetters = selectRandomLetters(letterCount)
        const newPictures = shufflePictures(newLetters)
        setRandomizedLetters(newLetters)
        setRandomizedPictures(newPictures)
      }
      
      const activityNames = {
        'letter-match': 'Letter to Word',
        'picture-match': 'Picture to Letter',
        'line-drawing': 'Draw Lines'
      }
      toast.info(`Switched to ${activityNames[newActivity]} matching!`)
    }
  }

const resetActivity = () => {
    setSelectedLetter(null)
    setSelectedPicture(null)
    setDraggedLetter(null)
    setDrawingLines([])
    setCurrentLine(null)
    setIsDrawing(false)
    setConnectionPoints({}) // Clear connection points
    
    // Reset randomized pictures for line-drawing mode
    if (currentActivity === 'line-drawing') {
      const newPictures = shufflePictures(randomizedLetters)
      setRandomizedPictures(newPictures)
    }
  }

const resetGame = () => {
    setScore(0)
    setLevel(1)
setAttempts(0)
    setCompletedLetters(new Set())
    setMatchedPairs(new Set())
    setSelectedLetter(null)
    setSelectedPicture(null)
    setDraggedLetter(null)
    setDrawingLines([])
    setCurrentLine(null)
    setIsDrawing(false)
    setCurrentActivity('letter-match')
    setGameState('playing')
setConnectionPoints({}) // Clear connection points
    // Generate new randomized letters for line-drawing mode
const newLetters = selectRandomLetters(letterCount)
    const newPictures = shufflePictures(newLetters)
    setRandomizedLetters(newLetters)
    setRandomizedPictures(newPictures)
    
    toast.info('🔄 Game reset! Let\'s start fresh!')
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  const progressPercentage = (completedLetters.size / getCurrentLetters().length) * 100
// Line drawing functions
  const getElementCenter = (element) => {
    const rect = element.getBoundingClientRect()
    const svgRect = drawingSvgRef.current?.getBoundingClientRect()
    if (!svgRect) return { x: 0, y: 0 }
    
    return {
      x: rect.left + rect.width / 2 - svgRect.left,
      y: rect.top + rect.height / 2 - svgRect.top
    }
  }

  const calculateDistance = (point1, point2) => {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
  }

  const handleDrawingStart = (e, type, item) => {
    if (completedLetters.has(item.letter)) return
    
    const element = e.currentTarget
    const center = getElementCenter(element)
    
    setConnectionPoints(prev => ({
      ...prev,
      [type + item.letter]: { x: center.x, y: center.y, type, item }
    }))
    
    setCurrentLine({
      start: center,
      end: center,
      startType: type,
      startItem: item
    })
    setIsDrawing(true)
    setAttempts(prev => prev + 1)
  }

  const handleDrawingMove = (e) => {
    if (!isDrawing || !currentLine || !drawingSvgRef.current) return
    
    const svgRect = drawingSvgRef.current.getBoundingClientRect()
    const point = {
      x: (e.clientX || e.touches?.[0]?.clientX || 0) - svgRect.left,
      y: (e.clientY || e.touches?.[0]?.clientY || 0) - svgRect.top
    }
    
    setCurrentLine(prev => ({ ...prev, end: point }))
  }

  const handleDrawingEnd = (e) => {
    if (!isDrawing || !currentLine) return
    
    const svgRect = drawingSvgRef.current?.getBoundingClientRect()
    if (!svgRect) return
    
    const endPoint = {
      x: (e.clientX || e.changedTouches?.[0]?.clientX || 0) - svgRect.left,
      y: (e.clientY || e.changedTouches?.[0]?.clientY || 0) - svgRect.top
    }
    
    // Check if line ends near a valid target
    const targetType = currentLine.startType === 'letter' ? 'picture' : 'letter'
    let closestTarget = null
    let minDistance = Infinity
    
    Object.entries(connectionPoints).forEach(([key, point]) => {
      if (point.type === targetType) {
        const distance = calculateDistance(endPoint, point)
        if (distance < 60 && distance < minDistance) { // 60px tolerance
          minDistance = distance
          closestTarget = point
        }
      }
    })
    
    if (closestTarget && currentLine.startItem.letter === closestTarget.item.letter) {
      // Correct connection
      const newLine = {
        start: currentLine.start,
        end: { x: closestTarget.x, y: closestTarget.y },
        startItem: currentLine.startItem,
        endItem: closestTarget.item,
        id: `${currentLine.startItem.letter}-correct`
      }
      
      setDrawingLines(prev => [...prev, newLine])
      setScore(prev => prev + 20)
      setCompletedLetters(prev => new Set([...prev, currentLine.startItem.letter]))
      setMatchedPairs(prev => new Set([...prev, currentLine.startItem.letter]))
      playSound(currentLine.startItem.letter, 'correct')
      
      // Check if level is complete
      if (completedLetters.size + 1 >= getCurrentLetters().length) {
        setGameState('celebrating')
        setTimeout(() => {
          setLevel(prev => prev + 1)
          setCompletedLetters(new Set())
          setMatchedPairs(new Set())
          setDrawingLines([])
          setGameState('playing')
          toast.success(`🌟 Level ${level} Complete! Moving to Level ${level + 1}!`)
        }, 2000)
      }
    } else {
      // Incorrect connection
      playSound(currentLine.startItem?.letter, 'incorrect')
    }
    
    setCurrentLine(null)
    setIsDrawing(false)
  }

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

{/* Activity Selector */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="activity-card mb-6"
      >
<div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => switchActivity('letter-match')}
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-bubble transition-all duration-300 ${
              currentActivity === 'letter-match'
                ? 'bg-primary text-white shadow-playful'
                : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
            }`}
          >
            <ApperIcon name="Type" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Letter to Word</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => switchActivity('picture-match')}
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-bubble transition-all duration-300 ${
              currentActivity === 'picture-match'
                ? 'bg-secondary text-white shadow-playful'
                : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
            }`}
          >
            <ApperIcon name="Image" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Picture to Letter</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => switchActivity('line-drawing')}
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-bubble transition-all duration-300 ${
              currentActivity === 'line-drawing'
                ? 'bg-accent text-surface-700 shadow-playful'
                : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
            }`}
          >
            <ApperIcon name="Pen" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Draw Lines</span>
          </motion.button>
        </div>
      </motion.div>
{/* Line Drawing Configuration */}
        {currentActivity === 'line-drawing' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-surface-200"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <ApperIcon name="Settings" className="w-5 h-5 text-surface-600" />
                <span className="text-sm font-medium text-surface-700">Letter Count:</span>
                <div className="flex items-center gap-2">
                  {[4, 5, 6, 7, 8].map((count) => (
                    <motion.button
                      key={count}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLetterCountChange(count)}
                      className={`w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 ${
                        letterCount === count
                          ? 'bg-accent text-surface-700 shadow-letter'
                          : 'bg-surface-200 text-surface-600 hover:bg-surface-300'
                      }`}
                    >
                      {count}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateNewSet}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-bubble shadow-soft hover:shadow-playful transition-all duration-300"
              >
                <ApperIcon name="Shuffle" className="w-4 h-4" />
                <span className="font-medium text-sm">New Letters</span>
              </motion.button>
            </div>
            
            <div className="mt-3 text-center">
              <span className="text-xs text-surface-500">
                Current letters: {randomizedLetters.map(l => l.letter).join(', ')}
              </span>
            </div>
          </motion.div>
        )}

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
{currentActivity === 'letter-match' ? (
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Click on a letter to hear its sound</li>
                    <li>Find the word that starts with that letter</li>
                    <li>Match letters to words to earn points!</li>
                  </ol>
                ) : currentActivity === 'picture-match' ? (
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Click on a picture to hear what it starts with</li>
                    <li>Drag the picture to the correct letter</li>
                    <li>Match pictures to letters to earn points!</li>
                  </ol>
                ) : (
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Click and hold on a letter or picture</li>
                    <li>Draw a line to connect it with its match</li>
                    <li>Release to complete the connection!</li>
                  </ol>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Game Area */}
{currentActivity === 'letter-match' ? (
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
                  className={`letter-card cursor-pointer text-center relative ${
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
      ) : currentActivity === 'picture-match' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Pictures Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="activity-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-bubble flex items-center justify-center">
                <ApperIcon name="Image" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-surface-800 font-heading">
                Choose a Picture
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {getCurrentLetters().map((item, index) => (
                <motion.div
                  key={item.emoji}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePictureSelect(item)}
                  draggable={!completedLetters.has(item.letter)}
                  onDragStart={(e) => {
                    if (!completedLetters.has(item.letter)) {
                      setDraggedLetter(item)
                      setSelectedPicture(item)
                      e.dataTransfer.effectAllowed = 'move'
                    }
                  }}
                  onDragEnd={() => {
                    setDraggedLetter(null)
                  }}
                  className={`letter-card cursor-pointer text-center relative overflow-hidden ${
                    selectedPicture?.letter === item.letter 
                      ? 'ring-4 ring-secondary shadow-playful' 
                      : ''
                  } ${
                    completedLetters.has(item.letter)
                      ? 'bg-green-100 border-green-300 opacity-50 cursor-not-allowed'
                      : 'cursor-grab active:cursor-grabbing'
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
                  
                  <div className="text-4xl sm:text-5xl mb-3">
                    {item.emoji}
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-surface-800 mb-1">
                    {item.word}
                  </div>
                  <div className="text-xs sm:text-sm text-surface-500">
                    Drag to letter "{item.letter}"
                  </div>
                  
                  {selectedPicture?.letter === item.letter && !completedLetters.has(item.letter) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-secondary/10 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full"
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Letters Drop Zone Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="activity-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-bubble flex items-center justify-center">
                <ApperIcon name="Target" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-surface-800 font-heading">
                Drop on the Letter
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {getCurrentLetters().map((item, index) => (
                <motion.div
                  key={item.letter}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.dataTransfer.dropEffect = 'move'
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    if (draggedLetter && !matchedPairs.has(item.letter)) {
                      handlePictureMatch(item.letter)
                    }
                  }}
                  className={`letter-card text-center relative transition-all duration-300 ${
                    matchedPairs.has(item.letter)
                      ? 'bg-green-100 border-green-300'
                      : draggedLetter
                      ? 'border-dashed border-2 border-secondary bg-secondary/5 hover:bg-secondary/10'
                      : 'border-2 border-transparent bg-surface-50'
                  } ${
                    !selectedPicture && !draggedLetter
                      ? 'opacity-50'
                      : ''
                  }`}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 font-heading">
                    {item.letter}
                  </div>
                  <div className="text-sm sm:text-base text-surface-600">
                    {item.sound}
                  </div>
                  
                  {draggedLetter && draggedLetter.letter === item.letter && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-secondary/20 flex items-center justify-center rounded-bubble border-2 border-secondary"
                    >
                      <div className="text-sm font-medium text-secondary">
                        Drop here!
                      </div>
                    </motion.div>
                  )}
                  
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
            
            {selectedPicture && !completedLetters.has(selectedPicture.letter) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-secondary/10 rounded-bubble border border-secondary/20"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {selectedPicture.emoji}
                  </div>
                  <div className="text-sm sm:text-base text-surface-700">
                    Drag "<strong>{selectedPicture.word}</strong>" to the letter "<strong>{selectedPicture.letter}</strong>"
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      ) : (
        // Line Drawing Mode
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
          onMouseMove={handleDrawingMove}
          onMouseUp={handleDrawingEnd}
          onTouchMove={handleDrawingMove}
          onTouchEnd={handleDrawingEnd}
        >
          <div className="activity-card relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-bubble flex items-center justify-center">
                <ApperIcon name="Pen" className="w-4 h-4 sm:w-5 sm:h-5 text-surface-700" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-surface-800 font-heading">
                Draw Lines to Connect
              </h2>
            </div>
            
            {/* Drawing Canvas */}
            <svg
              ref={drawingSvgRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ minHeight: '600px' }}
            >
              {/* Completed Lines */}
              {drawingLines.map((line, index) => (
                <motion.path
                  key={line.id}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                  d={`M ${line.start.x} ${line.start.y} Q ${(line.start.x + line.end.x) / 2} ${Math.min(line.start.y, line.end.y) - 50} ${line.end.x} ${line.end.y}`}
                  stroke="#10B981"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="0"
                  strokeLinecap="round"
                />
              ))}
              
              {/* Current Drawing Line */}
              {currentLine && (
                <motion.path
                  d={`M ${currentLine.start.x} ${currentLine.start.y} Q ${(currentLine.start.x + currentLine.end.x) / 2} ${Math.min(currentLine.start.y, currentLine.end.y) - 50} ${currentLine.end.x} ${currentLine.end.y}`}
                  stroke="#FFE66D"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              )}
            </svg>
            
<div className="drawing-columns-container">
              {/* Letters Column - Left Side */}
              <div className="drawing-column letters-column">
                <div className="column-header">
                  <h3 className="text-xl font-bold text-center text-primary mb-6">Letters</h3>
                </div>
<div className="column-content">
                  {getCurrentLetters().map((item, index) => (
                    <motion.div
                      key={`letter-${item.letter}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseDown={(e) => handleDrawingStart(e, 'letter', item)}
                      onTouchStart={(e) => handleDrawingStart(e, 'letter', item)}
                      className={`letter-card cursor-pointer text-center relative select-none ${
                        completedLetters.has(item.letter)
                          ? 'bg-green-100 border-green-300 opacity-75'
                          : 'hover:shadow-playful hover:scale-105'
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
                      
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 font-heading pointer-events-none">
                        {item.letter}
                      </div>
                      <div className="text-xs sm:text-sm text-surface-600 pointer-events-none">
                        {item.sound}
                      </div>
                      
                      {/* Connection Point */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-3 h-3 bg-primary rounded-full opacity-20"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Pictures Column - Right Side */}
              <div className="drawing-column pictures-column">
                <div className="column-header">
                  <h3 className="text-xl font-bold text-center text-secondary mb-6">Pictures</h3>
                </div>
<div className="column-content">
{randomizedPictures.map((item, index) => (
                    <motion.div
                      key={`picture-${item.letter}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      onMouseDown={(e) => handleDrawingStart(e, 'picture', item)}
                      onTouchStart={(e) => handleDrawingStart(e, 'picture', item)}
                      className={`letter-card cursor-pointer text-center relative select-none ${
                        completedLetters.has(item.letter)
                          ? 'bg-green-100 border-green-300 opacity-75'
                          : 'hover:shadow-playful hover:scale-105'
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
                      
                      <div className="text-3xl sm:text-4xl mb-2 pointer-events-none">
                        {item.emoji}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-surface-800 mb-1 pointer-events-none">
                        {item.word}
                      </div>
                      <div className="text-xs text-surface-500 pointer-events-none">
                        Starts with "{item.letter}"
                      </div>
                      
                      {/* Connection Point */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-3 h-3 bg-secondary rounded-full opacity-20"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {isDrawing && currentLine && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-accent/10 rounded-bubble border border-accent/20"
              >
                <div className="flex items-center gap-3 justify-center">
                  <ApperIcon name="Hand" className="w-5 h-5 text-accent" />
                  <div className="text-sm sm:text-base text-surface-700 font-medium">
                    Draw a line to connect <strong>{currentLine.startItem.letter}</strong> with its matching picture!
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

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