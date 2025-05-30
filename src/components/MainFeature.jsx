import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trophy, RotateCcw, Lightbulb, Settings, Play, Image, Zap } from 'lucide-react'

// Alphabet data with pictures
const alphabetData = {
  A: ['🍎', '🦆', '🐜', '✈️', '🏹'],
  B: ['🐻', '🎈', '🍌', '🦋', '🏀'],
  C: ['🐱', '🍪', '🐄', '🌙', '🚗'],
  D: ['🐶', '🦆', '🍩', '🥁', '🚪'],
  E: ['🐘', '🥚', '👁️', '👂', '🦅'],
  F: ['🐸', '🔥', '🐟', '🌸', '🍟'],
  G: ['🍇', '🎁', '🐐', '🧤', '⚙️'],
  H: ['🏠', '🐴', '💜', '🎩', '🔨'],
  I: ['🍦', '🐛', '💡', '🏝️', '🦔'],
  J: ['🃏', '👕', '🥤', '✈️', '🏺'],
  K: ['🔑', '🪁', '🥝', '👑', '🔪'],
  L: ['🦁', '🍋', '💡', '🪜', '🍃'],
  M: ['🐭', '🌙', '🍄', '🗺️', '🧲'],
  N: ['🌙', '🥜', '📰', '🎵', '📓'],
  O: ['🐙', '🦉', '🍊', '🔓', '🥚'],
  P: ['🐧', '🍕', '🥧', '📞', '🐷'],
  Q: ['👸', '❓', '🦆', '🧩', '💎'],
  R: ['🌈', '🐰', '🌹', '🚀', '💍'],
  S: ['⭐', '🐍', '☀️', '👟', '🍓'],
  T: ['🐅', '🌳', '📞', '🎾', '🚗'],
  U: ['☂️', '🦄', '⬆️', '🔓', '🌋'],
  V: ['🌋', '🎻', '🏐', '🧛', '🌿'],
  W: ['🐺', '🌊', '🍉', '⌚', '🪟'],
  X: ['❌', '🎄', '📦', '🔍', '🦴'],
  Y: ['💛', '🧶', '🥱', '⚡', '🏆'],
  Z: ['🦓', '⚡', '🧟', '📐', '🔍']
}

const MainFeature = () => {
  // Game State
  const [currentActivity, setCurrentActivity] = useState('letter-match')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [attempts, setAttempts] = useState(0)
  const [completedLetters, setCompletedLetters] = useState(new Set())
  const [gameStatus, setGameStatus] = useState('playing') // playing, completed, celebrating
  const [showHint, setShowHint] = useState(false)
  
  // Letter Match Game State
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState(new Set())
  
  // Picture Match Game State
  const [selectedPicture, setSelectedPicture] = useState(null)
  const [draggedLetter, setDraggedLetter] = useState(null)
  
  // Line Drawing Game State
  const [letterCount, setLetterCount] = useState(4)
  const [imagesPerLetter, setImagesPerLetter] = useState(3)
  const [drawingLines, setDrawingLines] = useState([])
  const [currentLine, setCurrentLine] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [connectionPoints, setConnectionPoints] = useState({})
  
  const drawingSvgRef = useRef(null)

  // Get current letters based on level and activity
  const getCurrentLetters = useCallback(() => {
    const alphabet = Object.keys(alphabetData)
    const startIndex = (level - 1) * letterCount
    return alphabet.slice(startIndex, startIndex + letterCount)
  }, [level, letterCount])

  // Generate randomized letters for display
  const getRandomizedLetters = useCallback(() => {
    const letters = getCurrentLetters()
    return [...letters].sort(() => Math.random() - 0.5)
  }, [getCurrentLetters])

  // Arrange picture groups with offset to prevent same-row placement
  const arrangePictureGroupsByRow = useCallback(() => {
    const letters = getCurrentLetters()
    const pictureGroups = []
    
    letters.forEach(letter => {
      const pictures = alphabetData[letter].slice(0, imagesPerLetter)
      pictureGroups.push({
        letter,
        pictures,
        completed: completedLetters.has(letter)
      })
    })
    
    // Offset picture groups to prevent same-row alignment
    const offsetGroups = []
    const totalGroups = pictureGroups.length
    const offset = Math.floor(totalGroups / 2)
    
    for (let i = 0; i < totalGroups; i++) {
      const newIndex = (i + offset) % totalGroups
      offsetGroups[newIndex] = pictureGroups[i]
    }
    
    return offsetGroups.filter(Boolean)
  }, [getCurrentLetters, imagesPerLetter, completedLetters])

  // Calculate progress percentage
  const getProgressPercentage = useCallback(() => {
    const totalLetters = getCurrentLetters().length
    return totalLetters > 0 ? (completedLetters.size / totalLetters) * 100 : 0
  }, [getCurrentLetters, completedLetters])

  // Handle letter selection in letter-match mode
  const handleLetterSelect = useCallback((letter) => {
    if (completedLetters.has(letter)) return
    
    setAttempts(prev => prev + 1)
    
    if (selectedLetter === letter) {
      setSelectedLetter(null)
    } else if (selectedLetter && selectedLetter !== letter) {
      // Check if letters are related (for word matching)
      setSelectedLetter(letter)
    } else {
      setSelectedLetter(letter)
    }
  }, [selectedLetter, completedLetters])

  // Handle word matching
  const handleWordMatch = useCallback((word) => {
    if (!selectedLetter) return
    
    const firstLetter = word.charAt(0).toUpperCase()
    if (firstLetter === selectedLetter) {
      setMatchedPairs(prev => new Set([...prev, `${selectedLetter}-${word}`]))
      setCompletedLetters(prev => new Set([...prev, selectedLetter]))
      setScore(prev => prev + 10)
      setSelectedLetter(null)
    } else {
      setAttempts(prev => prev + 1)
    }
  }, [selectedLetter])

  // Handle picture selection in picture-match mode
  const handlePictureSelect = useCallback((picture, letter) => {
    if (completedLetters.has(letter)) return
    
    setAttempts(prev => prev + 1)
    setSelectedPicture({ picture, letter })
  }, [completedLetters])

  // Handle picture matching with letters
  const handlePictureMatch = useCallback((targetLetter) => {
    if (!selectedPicture) return
    
    if (selectedPicture.letter === targetLetter) {
      setMatchedPairs(prev => new Set([...prev, `${targetLetter}-${selectedPicture.picture}`]))
      setCompletedLetters(prev => new Set([...prev, targetLetter]))
      setScore(prev => prev + 10)
      setSelectedPicture(null)
    } else {
      setAttempts(prev => prev + 1)
      setTimeout(() => setSelectedPicture(null), 1000)
    }
  }, [selectedPicture])

  // Line Drawing Functions
  const registerConnectionPoint = useCallback((id, element) => {
    if (element) {
      const rect = element.getBoundingClientRect()
      const svgRect = drawingSvgRef.current?.getBoundingClientRect()
      
      if (svgRect) {
        setConnectionPoints(prev => ({
          ...prev,
          [id]: {
            x: rect.left + rect.width / 2 - svgRect.left,
            y: rect.top + rect.height / 2 - svgRect.top,
            element,
            type: id.startsWith('letter-') ? 'letter' : 'picture',
            value: id.replace('letter-', '').replace('picture-', '').split('-')[0]
          }
        }))
      }
    }
  }, [])

  const handleDrawingStart = useCallback((e, id) => {
    e.preventDefault()
    const point = connectionPoints[id]
    if (point) {
      setIsDrawing(true)
      setCurrentLine({
        start: { x: point.x, y: point.y, id },
        end: { x: point.x, y: point.y }
      })
    }
  }, [connectionPoints])

  const handleDrawingMove = useCallback((e) => {
    if (!isDrawing || !currentLine) return
    
    const svgRect = drawingSvgRef.current?.getBoundingClientRect()
    if (svgRect) {
      const x = (e.clientX || e.touches?.[0]?.clientX) - svgRect.left
      const y = (e.clientY || e.touches?.[0]?.clientY) - svgRect.top
      
      setCurrentLine(prev => ({
        ...prev,
        end: { x, y }
      }))
    }
  }, [isDrawing, currentLine])

  const handleDrawingEnd = useCallback((e, endId) => {
    if (!isDrawing || !currentLine) return
    
    setIsDrawing(false)
    
    if (endId && endId !== currentLine.start.id) {
      const startPoint = connectionPoints[currentLine.start.id]
      const endPoint = connectionPoints[endId]
      
      if (startPoint && endPoint && startPoint.type !== endPoint.type) {
        const letterValue = startPoint.type === 'letter' ? startPoint.value : endPoint.value
        const pictureValue = startPoint.type === 'picture' ? startPoint.value : endPoint.value
        
        if (letterValue === pictureValue) {
          setDrawingLines(prev => [...prev, {
            start: startPoint,
            end: endPoint,
            id: `${currentLine.start.id}-${endId}`,
            correct: true
          }])
          setCompletedLetters(prev => new Set([...prev, letterValue]))
          setScore(prev => prev + 15)
        } else {
          // Show incorrect line briefly
          setDrawingLines(prev => [...prev, {
            start: startPoint,
            end: endPoint,
            id: `${currentLine.start.id}-${endId}`,
            correct: false
          }])
          setTimeout(() => {
            setDrawingLines(prev => prev.filter(line => line.id !== `${currentLine.start.id}-${endId}`))
          }, 1000)
        }
        setAttempts(prev => prev + 1)
      }
    }
    
    setCurrentLine(null)
  }, [isDrawing, currentLine, connectionPoints])

  // Activity switching
  const switchActivity = useCallback((activity) => {
    setCurrentActivity(activity)
    setSelectedLetter(null)
    setSelectedPicture(null)
    setDrawingLines([])
    setCurrentLine(null)
    setIsDrawing(false)
  }, [])

  // Reset game
  const resetGame = useCallback(() => {
    setScore(0)
    setLevel(1)
    setAttempts(0)
    setCompletedLetters(new Set())
    setGameStatus('playing')
    setMatchedPairs(new Set())
    setSelectedLetter(null)
    setSelectedPicture(null)
    setDrawingLines([])
    setCurrentLine(null)
    setIsDrawing(false)
  }, [])

  // Generate new set for line drawing
  const generateNewSet = useCallback(() => {
    setCompletedLetters(new Set())
    setDrawingLines([])
    setConnectionPoints({})
    setAttempts(0)
  }, [])

  // Check for level completion
  useEffect(() => {
    const currentLetters = getCurrentLetters()
    if (currentLetters.length > 0 && completedLetters.size === currentLetters.length) {
      setGameStatus('celebrating')
      setTimeout(() => {
        setLevel(prev => prev + 1)
        setCompletedLetters(new Set())
        setMatchedPairs(new Set())
        setDrawingLines([])
        setGameStatus('playing')
      }, 3000)
    }
  }, [completedLetters, getCurrentLetters])

  // Register connection points for line drawing
  useEffect(() => {
    if (currentActivity === 'line-drawing') {
      const timer = setTimeout(() => {
        const letterElements = document.querySelectorAll('[data-connection-point^="letter-"]')
        const pictureElements = document.querySelectorAll('[data-connection-point^="picture-"]')
        
        letterElements.forEach(el => {
          const id = el.getAttribute('data-connection-point')
          registerConnectionPoint(id, el)
        })
        
        pictureElements.forEach(el => {
          const id = el.getAttribute('data-connection-point')
          registerConnectionPoint(id, el)
        })
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [currentActivity, getCurrentLetters, arrangePictureGroupsByRow, registerConnectionPoint])

  const currentLetters = getCurrentLetters()
  const randomizedLetters = getRandomizedLetters()
  const rearrangedPictureGroups = arrangePictureGroupsByRow()
  const progressPercentage = getProgressPercentage()

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Game Header with Stats */}
      <motion.div 
        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 mb-6 border border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Score and Level */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-accent" />
              <span className="text-2xl font-bold text-primary">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-secondary" />
              <span className="text-xl font-semibold">Level {level}</span>
            </div>
            <div className="text-sm text-foreground-muted">
              Attempts: {attempts}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-foreground-muted">
                {completedLetters.size}/{currentLetters.length}
              </span>
            </div>
            <div className="progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShowHint(!showHint)}
              className={`p-2 rounded-lg transition-colors ${
                showHint ? 'bg-accent text-white' : 'bg-white text-foreground hover:bg-surface-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Lightbulb className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={resetGame}
              className="p-2 bg-white text-foreground rounded-lg hover:bg-surface-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Activity Selector */}
      <motion.div 
        className="bg-white rounded-2xl p-6 mb-6 shadow-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Choose Your Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'letter-match', icon: Play, title: 'Letter Match', desc: 'Match letters with words' },
            { id: 'picture-match', icon: Image, title: 'Picture Match', desc: 'Match pictures with letters' },
            { id: 'line-drawing', icon: Zap, title: 'Line Drawing', desc: 'Draw lines to connect matches' }
          ].map((activity) => (
            <motion.button
              key={activity.id}
              onClick={() => switchActivity(activity.id)}
              className={`activity-card text-left ${
                currentActivity === activity.id ? 'ring-2 ring-primary' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <activity.icon className="w-8 h-8 text-primary mb-2" />
              <h3 className="font-bold text-lg mb-1">{activity.title}</h3>
              <p className="text-sm text-foreground-muted">{activity.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Line Drawing Configuration */}
      {currentActivity === 'line-drawing' && (
        <motion.div 
          className="bg-white rounded-2xl p-6 mb-6 shadow-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Settings className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold">Game Configuration</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Number of Letters</label>
              <select 
                value={letterCount} 
                onChange={(e) => setLetterCount(Number(e.target.value))}
                className="w-full p-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {[2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Letters</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Images per Letter</label>
              <select 
                value={imagesPerLetter} 
                onChange={(e) => setImagesPerLetter(Number(e.target.value))}
                className="w-full p-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {[2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} Images</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <motion.button
                onClick={generateNewSet}
                className="game-button w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate New Set
              </motion.button>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-surface-50 rounded-lg">
            <p className="text-sm text-foreground-muted">
              Current Letters: {randomizedLetters.join(', ')}
            </p>
          </div>
        </motion.div>
      )}

      {/* Hint Panel */}
      <AnimatePresence>
        {showHint && (
          <motion.div 
            className="bg-accent/10 border border-accent/20 rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-accent">Hint</h3>
            </div>
            <p className="text-sm">
              {currentActivity === 'letter-match' && "Click on a letter, then click on a word that starts with that letter!"}
              {currentActivity === 'picture-match' && "Click on a picture, then click on the letter it starts with!"}
              {currentActivity === 'line-drawing' && "Draw lines from letters to pictures that start with those letters!"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Game Area */}
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-card min-h-[400px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {currentActivity === 'letter-match' ? (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center mb-6">Letter Match Game</h3>
            
            {/* Letters Grid */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Letters</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {currentLetters.map((letter) => (
                  <motion.button
                    key={letter}
                    onClick={() => handleLetterSelect(letter)}
                    className={`letter-card ${
                      selectedLetter === letter ? 'ring-4 ring-primary' : ''
                    } ${
                      completedLetters.has(letter) ? 'bg-green-100 text-green-800' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={completedLetters.has(letter)}
                  >
                    <span className="text-4xl font-bold">{letter}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Words Grid */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Words</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {['Apple', 'Ball', 'Cat', 'Dog', 'Elephant', 'Fish', 'Grape', 'House'].map((word) => (
                  <motion.button
                    key={word}
                    onClick={() => handleWordMatch(word)}
                    className="letter-card text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg font-semibold">{word}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        ) : currentActivity === 'picture-match' ? (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-center mb-6">Picture Match Game</h3>
            
            {/* Pictures Grid */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Pictures</h4>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {currentLetters.flatMap(letter => 
                  alphabetData[letter].slice(0, 2).map((picture, idx) => (
                    <motion.button
                      key={`${letter}-${idx}`}
                      onClick={() => handlePictureSelect(picture, letter)}
                      className={`letter-card ${
                        selectedPicture?.picture === picture ? 'ring-4 ring-primary' : ''
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-3xl">{picture}</span>
                    </motion.button>
                  ))
                )}
              </div>
            </div>

            {/* Letters Grid */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Letters</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {randomizedLetters.map((letter) => (
                  <motion.button
                    key={letter}
                    onClick={() => handlePictureMatch(letter)}
                    className={`letter-card ${
                      completedLetters.has(letter) ? 'bg-green-100 text-green-800' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={completedLetters.has(letter)}
                  >
                    <span className="text-4xl font-bold">{letter}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center mb-6">Line Drawing Game</h3>
            
            <div className="drawing-columns-container relative">
              {/* SVG for drawing lines */}
              <svg
                ref={drawingSvgRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                onMouseMove={handleDrawingMove}
                onTouchMove={handleDrawingMove}
              >
                {/* Completed lines */}
                {drawingLines.map((line) => (
                  <line
                    key={line.id}
                    x1={line.start.x}
                    y1={line.start.y}
                    x2={line.end.x}
                    y2={line.end.y}
                    stroke={line.correct ? '#10B981' : '#EF4444'}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                ))}
                
                {/* Current drawing line */}
                {currentLine && (
                  <line
                    x1={currentLine.start.x}
                    y1={currentLine.start.y}
                    x2={currentLine.end.x}
                    y2={currentLine.end.y}
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="5,5"
                  />
                )}
              </svg>

              {/* Letters Column */}
              <div className="drawing-column">
                <div className="column-header">
                  <h4 className="text-lg font-semibold text-center">Letters</h4>
                </div>
                <div className="column-content">
                  {currentLetters.map((letter, index) => (
                    <motion.div
                      key={`letter-${letter}-${index}`}
                      data-connection-point={`letter-${letter}-${index}`}
                      onMouseDown={(e) => handleDrawingStart(e, `letter-${letter}-${index}`)}
                      onMouseUp={(e) => handleDrawingEnd(e, `letter-${letter}-${index}`)}
                      onTouchStart={(e) => handleDrawingStart(e, `letter-${letter}-${index}`)}
                      onTouchEnd={(e) => handleDrawingEnd(e, `letter-${letter}-${index}`)}
                      className={`letter-card cursor-pointer select-none ${
                        completedLetters.has(letter) ? 'bg-green-100 text-green-800' : ''
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-3xl md:text-4xl font-bold pointer-events-none">
                        {letter}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pictures Column */}
              <div className="drawing-column">
                <div className="column-header">
                  <h4 className="text-lg font-semibold text-center">Pictures</h4>
                </div>
                <div className="pictures-by-letter-rows">
                  {rearrangedPictureGroups.map((group, groupIndex) => (
                    <div key={`group-${group.letter}-${groupIndex}`} className="picture-row-for-letter">
                      {group.pictures.map((picture, pictureIndex) => (
                        <motion.div
                          key={`picture-${group.letter}-${groupIndex}-${pictureIndex}`}
                          data-connection-point={`picture-${group.letter}-${groupIndex}-${pictureIndex}`}
                          onMouseUp={(e) => handleDrawingEnd(e, `picture-${group.letter}-${groupIndex}-${pictureIndex}`)}
                          onTouchEnd={(e) => handleDrawingEnd(e, `picture-${group.letter}-${groupIndex}-${pictureIndex}`)}
                          className={`letter-card cursor-pointer select-none ${
                            group.completed ? 'bg-green-100' : ''
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-2xl md:text-3xl pointer-events-none">
                            {picture}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Celebration Modal */}
      <AnimatePresence>
        {gameStatus === 'celebrating' && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 text-center max-w-md mx-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <motion.div
                className="text-6xl mb-4"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-primary mb-2">
                Level {level} Complete!
              </h2>
              <p className="text-lg text-foreground-muted mb-4">
                Great job! Moving to level {level + 1}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent" />
                  <span>Score: {score}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-secondary" />
                  <span>Level {level + 1}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature