import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'
const MainFeature = ({ initialActivity = 'letter-match' }) => {
  const [currentActivity, setCurrentActivity] = useState(initialActivity) // 'letter-match', 'picture-match', 'line-drawing', or 'number-match'
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [selectedNumber, setSelectedNumber] = useState(null)
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
// Complete A-Z alphabet data with multiple options per letter
  const alphabetData = [
    { letter: 'A', words: [
      { word: 'Apple', emoji: '🍎' },
      { word: 'Ant', emoji: '🐜' },
      { word: 'Airplane', emoji: '✈️' },
      { word: 'Anchor', emoji: '⚓' }
    ], sound: '/eɪ/' },
    { letter: 'B', words: [
      { word: 'Ball', emoji: '⚽' },
      { word: 'Bear', emoji: '🐻' },
      { word: 'Book', emoji: '📚' },
      { word: 'Butterfly', emoji: '🦋' }
    ], sound: '/b/' },
    { letter: 'C', words: [
      { word: 'Cat', emoji: '🐱' },
      { word: 'Car', emoji: '🚗' },
      { word: 'Cookie', emoji: '🍪' },
      { word: 'Crown', emoji: '👑' }
    ], sound: '/k/' },
    { letter: 'D', words: [
      { word: 'Dog', emoji: '🐕' },
      { word: 'Duck', emoji: '🦆' },
      { word: 'Drum', emoji: '🥁' },
      { word: 'Diamond', emoji: '💎' }
    ], sound: '/d/' },
    { letter: 'E', words: [
      { word: 'Elephant', emoji: '🐘' },
      { word: 'Eagle', emoji: '🦅' },
      { word: 'Egg', emoji: '🥚' },
      { word: 'Earth', emoji: '🌍' }
    ], sound: '/ɛ/' },
    { letter: 'F', words: [
      { word: 'Fish', emoji: '🐠' },
      { word: 'Flower', emoji: '🌸' },
      { word: 'Fire', emoji: '🔥' },
      { word: 'Frog', emoji: '🐸' }
    ], sound: '/f/' },
    { letter: 'G', words: [
      { word: 'Giraffe', emoji: '🦒' },
      { word: 'Guitar', emoji: '🎸' },
      { word: 'Gift', emoji: '🎁' },
      { word: 'Grapes', emoji: '🍇' }
    ], sound: '/g/' },
    { letter: 'H', words: [
      { word: 'House', emoji: '🏠' },
      { word: 'Horse', emoji: '🐴' },
      { word: 'Heart', emoji: '❤️' },
      { word: 'Hat', emoji: '🎩' }
    ], sound: '/h/' },
    { letter: 'I', words: [
      { word: 'Ice cream', emoji: '🍦' },
      { word: 'Island', emoji: '🏝️' },
      { word: 'Igloo', emoji: '⛄' },
      { word: 'Iron', emoji: '👕' }
    ], sound: '/aɪ/' },
    { letter: 'J', words: [
      { word: 'Juice', emoji: '🧃' },
      { word: 'Jet', emoji: '🛩️' },
      { word: 'Jewel', emoji: '💍' },
      { word: 'Jacket', emoji: '🧥' }
    ], sound: '/dʒ/' },
    { letter: 'K', words: [
      { word: 'Kite', emoji: '🪁' },
      { word: 'Key', emoji: '🔑' },
      { word: 'King', emoji: '👑' },
      { word: 'Kangaroo', emoji: '🦘' }
    ], sound: '/k/' },
    { letter: 'L', words: [
      { word: 'Lion', emoji: '🦁' },
      { word: 'Leaf', emoji: '🍃' },
      { word: 'Lamp', emoji: '💡' },
      { word: 'Lemon', emoji: '🍋' }
    ], sound: '/l/' },
    { letter: 'M', words: [
      { word: 'Mouse', emoji: '🐭' },
      { word: 'Moon', emoji: '🌙' },
      { word: 'Music', emoji: '🎵' },
      { word: 'Mountain', emoji: '⛰️' }
    ], sound: '/m/' },
    { letter: 'N', words: [
      { word: 'Nest', emoji: '🪺' },
      { word: 'Nose', emoji: '👃' },
      { word: 'Night', emoji: '🌃' },
      { word: 'Nut', emoji: '🥜' }
    ], sound: '/n/' },
    { letter: 'O', words: [
      { word: 'Orange', emoji: '🍊' },
      { word: 'Owl', emoji: '🦉' },
      { word: 'Ocean', emoji: '🌊' },
      { word: 'Octopus', emoji: '🐙' }
    ], sound: '/ɔ/' },
    { letter: 'P', words: [
      { word: 'Pizza', emoji: '🍕' },
      { word: 'Penguin', emoji: '🐧' },
      { word: 'Piano', emoji: '🎹' },
      { word: 'Pineapple', emoji: '🍍' }
    ], sound: '/p/' },
    { letter: 'Q', words: [
      { word: 'Queen', emoji: '👸' },
      { word: 'Question', emoji: '❓' },
      { word: 'Quilt', emoji: '🛏️' },
      { word: 'Quail', emoji: '🐦' }
    ], sound: '/kw/' },
    { letter: 'R', words: [
      { word: 'Robot', emoji: '🤖' },
      { word: 'Rainbow', emoji: '🌈' },
      { word: 'Rocket', emoji: '🚀' },
      { word: 'Rose', emoji: '🌹' }
    ], sound: '/r/' },
    { letter: 'S', words: [
      { word: 'Sun', emoji: '☀️' },
      { word: 'Star', emoji: '⭐' },
      { word: 'Snake', emoji: '🐍' },
      { word: 'Ship', emoji: '🚢' }
    ], sound: '/s/' },
    { letter: 'T', words: [
      { word: 'Tree', emoji: '🌳' },
      { word: 'Tiger', emoji: '🐅' },
      { word: 'Train', emoji: '🚂' },
      { word: 'Turtle', emoji: '🐢' }
    ], sound: '/t/' },
    { letter: 'U', words: [
      { word: 'Umbrella', emoji: '☂️' },
      { word: 'Unicorn', emoji: '🦄' },
      { word: 'UFO', emoji: '🛸' },
      { word: 'Uniform', emoji: '👮' }
    ], sound: '/ʌ/' },
    { letter: 'V', words: [
      { word: 'Violin', emoji: '🎻' },
      { word: 'Volcano', emoji: '🌋' },
      { word: 'Van', emoji: '🚐' },
      { word: 'Vase', emoji: '🏺' }
    ], sound: '/v/' },
    { letter: 'W', words: [
      { word: 'Whale', emoji: '🐋' },
      { word: 'Water', emoji: '💧' },
      { word: 'Watch', emoji: '⌚' },
      { word: 'Wolf', emoji: '🐺' }
    ], sound: '/w/' },
    { letter: 'X', words: [
      { word: 'Xylophone', emoji: '🎵' },
      { word: 'X-ray', emoji: '🦴' },
      { word: 'Xbox', emoji: '🎮' },
      { word: 'Xerox', emoji: '📄' }
    ], sound: '/ks/' },
{ letter: 'Y', words: [
      { word: 'Yacht', emoji: '⛵' },
      { word: 'Yo-yo', emoji: '🪀' },
      { word: 'Yarn', emoji: '🧶' },
      { word: 'Yak', emoji: '🐂' }
    ], sound: '/j/' },
    { letter: 'Z', words: [
      { word: 'Zebra', emoji: '🦓' },
      { word: 'Zero', emoji: '0️⃣' }
    ], sound: '/z/' }
  ]

  // Number data for number matching activity

  // Number data for number matching activity
  const numberData = {
    1: [
      { number: 1, items: [{ name: 'Apple', emoji: '🍎' }] },
      { number: 1, items: [{ name: 'Sun', emoji: '☀️' }] },
      { number: 1, items: [{ name: 'Moon', emoji: '🌙' }] },
      { number: 1, items: [{ name: 'Star', emoji: '⭐' }] }
    ],
    2: [
      { number: 2, items: [{ name: 'Eyes', emoji: '👀' }] },
      { number: 2, items: [{ name: 'Cherries', emoji: '🍒🍒' }] },
      { number: 2, items: [{ name: 'Hands', emoji: '🤝' }] },
      { number: 2, items: [{ name: 'Feet', emoji: '👣' }] }
    ],
    3: [
      { number: 3, items: [{ name: 'Bears', emoji: '🐻🐻🐻' }] },
      { number: 3, items: [{ name: 'Balloons', emoji: '🎈🎈🎈' }] },
      { number: 3, items: [{ name: 'Hearts', emoji: '❤️❤️❤️' }] },
      { number: 3, items: [{ name: 'Cars', emoji: '🚗🚗🚗' }] }
    ],
    4: [
      { number: 4, items: [{ name: 'Flowers', emoji: '🌸🌸🌸🌸' }] },
      { number: 4, items: [{ name: 'Books', emoji: '📚📚📚📚' }] },
      { number: 4, items: [{ name: 'Cats', emoji: '🐱🐱🐱🐱' }] },
      { number: 4, items: [{ name: 'Wheels', emoji: '🎡🎡🎡🎡' }] }
    ],
    5: [
      { number: 5, items: [{ name: 'Fingers', emoji: '✋' }] },
      { number: 5, items: [{ name: 'Stars', emoji: '⭐⭐⭐⭐⭐' }] },
      { number: 5, items: [{ name: 'Fish', emoji: '🐠🐠🐠🐠🐠' }] },
      { number: 5, items: [{ name: 'Cookies', emoji: '🍪🍪🍪🍪🍪' }] }
    ],
    6: [
      { number: 6, items: [{ name: 'Eggs', emoji: '🥚🥚🥚🥚🥚🥚' }] },
      { number: 6, items: [{ name: 'Cupcakes', emoji: '🧁🧁🧁🧁🧁🧁' }] },
      { number: 6, items: [{ name: 'Butterflies', emoji: '🦋🦋🦋🦋🦋🦋' }] },
      { number: 6, items: [{ name: 'Donuts', emoji: '🍩🍩🍩🍩🍩🍩' }] }
    ],
    7: [
      { number: 7, items: [{ name: 'Rainbows', emoji: '🌈🌈🌈🌈🌈🌈🌈' }] },
      { number: 7, items: [{ name: 'Candies', emoji: '🍬🍬🍬🍬🍬🍬🍬' }] },
      { number: 7, items: [{ name: 'Mushrooms', emoji: '🍄🍄🍄🍄🍄🍄🍄' }] },
      { number: 7, items: [{ name: 'Gems', emoji: '💎💎💎💎💎💎💎' }] }
    ],
    8: [
      { number: 8, items: [{ name: 'Octopus Arms', emoji: '🐙' }] },
      { number: 8, items: [{ name: 'Pizza Slices', emoji: '🍕🍕🍕🍕🍕🍕🍕🍕' }] },
      { number: 8, items: [{ name: 'Snowflakes', emoji: '❄️❄️❄️❄️❄️❄️❄️❄️' }] },
      { number: 8, items: [{ name: 'Crayons', emoji: '🖍️🖍️🖍️🖍️🖍️🖍️🖍️🖍️' }] }
    ],
    9: [
      { number: 9, items: [{ name: 'Ice Creams', emoji: '🍦🍦🍦🍦🍦🍦🍦🍦🍦' }] },
      { number: 9, items: [{ name: 'Robots', emoji: '🤖🤖🤖🤖🤖🤖🤖🤖🤖' }] },
      { number: 9, items: [{ name: 'Rockets', emoji: '🚀🚀🚀🚀🚀🚀🚀🚀🚀' }] },
      { number: 9, items: [{ name: 'Presents', emoji: '🎁🎁🎁🎁🎁🎁🎁🎁🎁' }] }
    ],
    10: [
      { number: 10, items: [{ name: 'Fingers', emoji: '🙌' }] },
      { number: 10, items: [{ name: 'Bowling Pins', emoji: '🎳🎳🎳🎳🎳🎳🎳🎳🎳🎳' }] },
      { number: 10, items: [{ name: 'Candles', emoji: '🕯️🕯️🕯️🕯️🕯️🕯️🕯️🕯️🕯️🕯️' }] },
      { number: 10, items: [{ name: 'Balloons', emoji: '🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈' }] }
    ]
  }

  // Convert to old format for compatibility with other game modes
  const getCompatibleAlphabetData = () => {
    return alphabetData.map(item => ({
      letter: item.letter,
      word: item.words[0].word,
      sound: item.sound,
      emoji: item.words[0].emoji
    }))
  }

// Level-based letter data for letter-match and picture-match modes
  const letterData = {
    1: getCompatibleAlphabetData().slice(0, 4),   // A-D
    2: getCompatibleAlphabetData().slice(4, 8),   // E-H
    3: getCompatibleAlphabetData().slice(8, 12),  // I-L
    4: getCompatibleAlphabetData().slice(12, 16), // M-P
    5: getCompatibleAlphabetData().slice(16, 20), // Q-T
    6: getCompatibleAlphabetData().slice(20, 26)  // U-Z
  }

  // State for randomized letters in line-drawing mode
const [randomizedLetters, setRandomizedLetters] = useState([])
  const [letterCount, setLetterCount] = useState(5) // Default to 5 letters
  const [randomSeed, setRandomSeed] = useState(0) // Force re-randomization
  const [matchedPairs, setMatchedPairs] = useState(new Set())
  const [usedLineColors, setUsedLineColors] = useState(new Set())
  const availableColors = ['red', 'blue', 'green', 'orange', 'purple', 'pink', 'teal', 'yellow', 'indigo', 'lime']
  const [randomizedPictures, setRandomizedPictures] = useState([])
  // State to track letters used in the past 5 levels
  const [usedLettersHistory, setUsedLettersHistory] = useState([])
  const [imagesPerLetter, setImagesPerLetter] = useState(1) // Default to 1 image per letter

// Number activity states
  const [numberRange, setNumberRange] = useState(5) // Default to 1-5 numbers
  const [currentNumbers, setCurrentNumbers] = useState([])
  const [shuffledItemGroups, setShuffledItemGroups] = useState([])

  const [rearrangedPictureGroups, setRearrangedPictureGroups] = useState([])
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
    // Get all letters used in the past 5 levels
    const recentlyUsedLetters = usedLettersHistory.flat().map(item => item.letter)
    
    // Filter out recently used letters from available alphabet
    const availableLetters = getCompatibleAlphabetData().filter(item =>
      !recentlyUsedLetters.includes(item.letter)
    )
    
    // If we don't have enough unused letters, fall back to full alphabet
    const lettersToUse = availableLetters.length >= count
      ? availableLetters
      : getCompatibleAlphabetData()
    
    // Shuffle and select the requested count
// Shuffle and select the requested count
    const shuffled = shuffleArray(lettersToUse)
    return shuffled.slice(0, Math.min(count, lettersToUse.length))
  }
  
  const shufflePictures = (letters) => {
    return shuffleArray([...letters])
  }
  
  // Generate pictures for letters based on imagesPerLetter setting
  const generatePicturesForLetters = (letters) => {
    const pictures = []
    
    // Process each letter and generate exactly imagesPerLetter pictures
    letters.forEach((letterItem, letterIndex) => {
      const letterData = alphabetData.find(item => item.letter === letterItem.letter)
      
      if (letterData && letterData.words && letterData.words.length > 0) {
        // Shuffle the available words to randomize selection
        const shuffledWords = shuffleArray([...letterData.words])
        
        // Generate exactly imagesPerLetter pictures for this letter
        for (let i = 0; i < imagesPerLetter; i++) {
          // Use modulo to cycle through shuffled words if we need more than available
          const wordIndex = i % shuffledWords.length
          const selectedWord = shuffledWords[wordIndex]
          
          pictures.push({
            letter: letterItem.letter,
            word: selectedWord.word,
            emoji: selectedWord.emoji,
            sound: letterData.sound,
            index: i, // Unique index for each picture within the letter
            globalIndex: letterIndex * imagesPerLetter + i // Global unique index
          })
        }
      } else {
        // Fallback: if no letter data found, create placeholder pictures
        for (let i = 0; i < imagesPerLetter; i++) {
          pictures.push({
            letter: letterItem.letter,
            word: `${letterItem.letter}word${i + 1}`,
            emoji: '❓',
            sound: letterItem.sound || '/unknown/',
            index: i,
            globalIndex: letterIndex * imagesPerLetter + i
          })
        }
      }
    })
    
    return pictures
  }
  // Group pictures by letter for display
  const groupPicturesByLetter = (pictures) => {
    const groups = {}
    pictures.forEach(picture => {
      if (!groups[picture.letter]) {
        groups[picture.letter] = []
      }
      groups[picture.letter].push(picture)
    })
    
    // Return array of groups maintaining the order of letters
    return getCurrentLetters().map(letterItem => ({
      letter: letterItem.letter,
      pictures: groups[letterItem.letter] || []
}))
  }
  
  // Randomization functions for display order
  const shuffleLetterOrder = (letters) => {
    return shuffleArray([...letters])
  }
  
  const shufflePicturesByDifferentLetters = (pictures) => {
    return shuffleArray([...pictures])
  }
  
  // Color management for lines
  const getNextAvailableColor = () => {
    // Find the first color that hasn't been used
    for (let color of availableColors) {
      if (!usedLineColors.has(color)) {
        return color
      }
    }
    // If all colors are used, cycle back to start
    setUsedLineColors(new Set())
    return availableColors[0]
  }

  const getCurrentLetters = () => {
    if (currentActivity === 'line-drawing') {
      return randomizedLetters
    }
    return letterData[level] || letterData[1]
  }

  const getCurrentNumbers = () => {
    if (currentActivity === 'number-match') {
      return currentNumbers
    }
return []
  }

  const generateNumberSet = () => {
    const numbers = []
    const items = []
    
    for (let i = 1; i <= numberRange; i++) {
      const availableItems = numberData[i] || []
      const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)]
      
      numbers.push({
        number: i,
        items: randomItem.items,
        displayItems: randomItem.items
      })
      
      items.push({
        number: i,
        items: randomItem.items,
        displayItems: randomItem.items
      })
    }
    
    // Shuffle items to different positions than numbers
    const shuffledItems = shuffleArray([...items])
    setShuffledItemGroups(shuffledItems)
    
    return numbers
  }

  const generateNewSet = () => {
    // Clear all connected lines and game state when generating new set
    setDrawingLines([])
    setCompletedLetters(new Set())
    setMatchedPairs(new Set())
    setUsedLineColors(new Set())
    
    const newLetters = selectRandomLetters(letterCount)
    const newPictures = generatePicturesForLetters(newLetters)
    const shuffledPictures = shufflePicturesByDifferentLetters(newPictures)
    setRandomizedLetters(newLetters)
    setRandomizedPictures(shuffledPictures)
    setRandomSeed(prev => prev + 1)
  }

  const handleLetterCountChange = (newCount) => {
    setLetterCount(newCount)
    // Clear all connected lines and game state when settings change
    setDrawingLines([])
    setCompletedLetters(new Set())
    setMatchedPairs(new Set())
    setUsedLineColors(new Set())
    
    const newLetters = selectRandomLetters(newCount)
    const newPictures = generatePicturesForLetters(newLetters)
    const shuffledPictures = shufflePicturesByDifferentLetters(newPictures)
    setRandomizedLetters(newLetters)
    setRandomizedPictures(shuffledPictures)
  }

  const handleImagesPerLetterChange = (newCount) => {
    setImagesPerLetter(newCount)
    // Clear all connected lines and game state when settings change
    setDrawingLines([])
    setCompletedLetters(new Set())
    setMatchedPairs(new Set())
    setUsedLineColors(new Set())
    
    if (randomizedLetters.length > 0) {
      const newPictures = generatePicturesForLetters(randomizedLetters)
      const shuffledPictures = shufflePicturesByDifferentLetters(newPictures)
setRandomizedPictures(shuffledPictures)
    }
  }
  
  // Generate initial randomized letters
  useEffect(() => {
    if (currentActivity === 'line-drawing' || randomizedLetters.length === 0) {
      const newLetters = selectRandomLetters(letterCount)
      setRandomizedLetters(newLetters)
      const newPictures = generatePicturesForLetters(newLetters)
      const shuffledPictures = shufflePicturesByDifferentLetters(newPictures)
      setRandomizedPictures(shuffledPictures)
    }
  }, [currentActivity, letterCount, imagesPerLetter])

  // Register connection points for all interactive elements
  // Register connection points for all interactive elements
  useEffect(() => {
    if ((currentActivity === 'line-drawing' || currentActivity === 'number-match') && drawingSvgRef.current) {
      const registerConnectionPoints = () => {
        const newConnectionPoints = {}
        
        if (currentActivity === 'line-drawing') {
          // Register letter connection points with improved element detection
          getCurrentLetters().forEach((item) => {
            const letterElement = document.querySelector(`[data-letter="${item.letter}"]`)
            if (letterElement && letterElement.offsetParent !== null) {
              const center = getElementCenter(letterElement)
              if (center.x > 0 && center.y > 0) {
                newConnectionPoints[`letter${item.letter}`] = { 
                  x: center.x, 
                  y: center.y, 
                  type: 'letter', 
                  item 
                }
              }
            }
          })
          
          // Register picture connection points with better validation
          if (randomizedPictures && randomizedPictures.length > 0) {
            randomizedPictures.forEach((item) => {
              const pictureElement = document.querySelector(`[data-picture="${item.letter}-${item.index}"]`)
              if (pictureElement && pictureElement.offsetParent !== null) {
                const center = getElementCenter(pictureElement)
                if (center.x > 0 && center.y > 0) {
                  newConnectionPoints[`picture${item.letter}-${item.index}`] = {
                    x: center.x, 
                    y: center.y, 
                    type: 'picture', 
                    item 
                  }
                }
              }
            })
          }
        } else if (currentActivity === 'number-match') {
          // Register number connection points with improved detection
          getCurrentNumbers().forEach((item) => {
            const numberElement = document.querySelector(`[data-number="${item.number}"]`)
            if (numberElement && numberElement.offsetParent !== null) {
              const center = getElementCenter(numberElement)
              if (center.x > 0 && center.y > 0) {
                newConnectionPoints[`number${item.number}`] = { 
                  x: center.x, 
                  y: center.y, 
                  type: 'number', 
                  item 
                }
              }
            }
          })
          
          // Register item connection points with better validation
          if (shuffledItemGroups && shuffledItemGroups.length > 0) {
            shuffledItemGroups.forEach((item, index) => {
              const itemElement = document.querySelector(`[data-item="${item.number}-${index}"]`)
              if (itemElement && itemElement.offsetParent !== null) {
                const center = getElementCenter(itemElement)
                if (center.x > 0 && center.y > 0) {
                  newConnectionPoints[`item${item.number}-${index}`] = {
                    x: center.x, 
                    y: center.y, 
                    type: 'item', 
                    item 
                  }
                }
              }
            })
          }
        }
        
        setConnectionPoints(newConnectionPoints)
      }
      
      // Multiple registration attempts to ensure reliability
      const timer1 = setTimeout(registerConnectionPoints, 100)
      const timer2 = setTimeout(registerConnectionPoints, 300)
      const timer3 = setTimeout(registerConnectionPoints, 500)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
}
  }, [currentActivity, randomizedLetters, randomizedPictures, currentNumbers, shuffledItemGroups])

  // Audio simulation (in real app, this would play actual audio files)
  const playSound = (letter, type = 'letter') => {
    // Simulate audio feedback
    if (type === 'correct') {
      // Audio feedback for correct answers
      console.log('Correct answer audio feedback')
    } else if (type === 'incorrect') {
      // Audio feedback for incorrect answers
      console.log('Incorrect answer audio feedback')
    } else if (type === 'picture') {
      // Audio feedback for picture selection
      console.log(`Picture audio: ${letter}`)
    } else {
      if (type === 'number') {
        // Audio feedback for number selection
        console.log(`Number audio: ${letter}`)
      } else {
        // Audio feedback for letter selection
        console.log(`Letter audio: ${letter}`)
      }
    }
  }
  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter)
    setAttempts(prev => prev + 1)
playSound(letter.letter)
  }

  const handleNumberSelect = (number) => {
    setSelectedNumber(number)
    setAttempts(prev => prev + 1)
playSound(number.number, 'number')
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
        }, 2000)
      }
    } else {
// Incorrect match
      playSound(selectedPicture?.letter, 'incorrect')
      setSelectedPicture(null)
setDraggedLetter(null)
    }
  }
  
  const handleNumberMatch = (targetNumber) => {
    if (selectedNumber && selectedNumber.number === targetNumber) {
      // Correct match
      setScore(prev => prev + 10)
      setCompletedLetters(prev => new Set([...prev, targetNumber.toString()]))
      setMatchedPairs(prev => new Set([...prev, targetNumber.toString()]))
      playSound(targetNumber, 'correct')
      setSelectedNumber(null)
      
      // Check if level is complete
      if (completedLetters.size + 1 >= getCurrentNumbers().length) {
        setGameState('celebrating')
        setTimeout(() => {
          setLevel(prev => prev + 1)
          setCompletedLetters(new Set())
          setMatchedPairs(new Set())
          setGameState('playing')
          setCurrentNumbers(generateNumberSet())
        }, 2000)
      }
    } else {
      // Incorrect match
      playSound(selectedNumber?.number, 'incorrect')
setSelectedNumber(null)
    }
  }

const switchActivity = (newActivity) => {
    if (newActivity !== currentActivity) {
      setCurrentActivity(newActivity)
      setSelectedLetter(null)
      setSelectedNumber(null)
      setDraggedLetter(null)
      setDrawingLines([])
      setCurrentLine(null)
      setIsDrawing(false)
      setConnectionPoints({}) // Clear connection points
      setUsedLineColors(new Set()) // Reset used colors for new activity
      // Generate new randomized letters when switching to line-drawing mode
      if (newActivity === 'line-drawing') {
        const newLetters = selectRandomLetters(letterCount)
        const newPictures = generatePicturesForLetters(newLetters)
        const shuffledPictures = shufflePicturesByDifferentLetters(newPictures)
        setRandomizedLetters(newLetters)
        setRandomizedPictures(shuffledPictures)
      }
      
      // Generate initial number set for number matching
      if (newActivity === 'number-match') {
        setCurrentNumbers(generateNumberSet())
      }
    }
  }

  const activityNames = {
    'letter-match': 'Letter to Word',
    'picture-match': 'Picture to Letter',
    'line-drawing': 'Draw Lines',
    'number-match': 'Count & Match'
  }
  const resetGame = () => {
    setScore(0)
    setLevel(1)
    setAttempts(0)
    setCompletedLetters(new Set())
    setMatchedPairs(new Set())
    setSelectedLetter(null)
    setSelectedNumber(null)
    setSelectedPicture(null)
    setDraggedLetter(null)
    setDrawingLines([])
    setCurrentLine(null)
    setIsDrawing(false)
    setCurrentActivity('letter-match')
    setGameState('playing')
    setUsedLineColors(new Set()) // Reset used colors
    // Reset letter history for fresh start
    setUsedLettersHistory([])
    
    const newLetters = selectRandomLetters(letterCount)
    const newPictures = generatePicturesForLetters(newLetters)
    const shuffledPictures = shufflePicturesByDifferentLetters(newPictures)
setRandomizedLetters(newLetters)
    setRandomizedPictures(shuffledPictures)
  }
  
  const toggleHint = () => {
    setShowHint(!showHint)
  }

  const getCurrentItems = () => {
    if (currentActivity === 'number-match') {
      return getCurrentNumbers()
    }
    return getCurrentLetters()
  }

  const progressPercentage = (completedLetters.size / getCurrentItems().length) * 100

  // Initialize numbers when component mounts or activity changes
  useEffect(() => {
if (currentActivity === 'number-match' && currentNumbers.length === 0) {
      setCurrentNumbers(generateNumberSet())
    }
  }, [currentActivity, numberRange])

  // Line drawing functions with improved accuracy
  const getElementCenter = (element) => {
    if (!element || !drawingSvgRef.current) return { x: 0, y: 0 }
    
    const rect = element.getBoundingClientRect()
    const svgRect = drawingSvgRef.current.getBoundingClientRect()
    
    // Ensure we have valid dimensions
    if (!rect.width || !rect.height || !svgRect.width || !svgRect.height) {
      return { x: 0, y: 0 }
    }
    
    return {
      x: rect.left + rect.width / 2 - svgRect.left,
      y: rect.top + rect.height / 2 - svgRect.top
    }
  }

  const calculateDistance = (point1, point2) => {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
}
  const handleDrawingStart = (e, type, item) => {
    e.preventDefault()
    e.stopPropagation()
    
    const itemKey = currentActivity === 'number-match' ? item.number.toString() : item.letter
    if (completedLetters.has(itemKey)) return
    
    const element = e.currentTarget
    const center = getElementCenter(element)
    
    // Validate center coordinates
    if (center.x <= 0 || center.y <= 0) {
      console.warn('Invalid center coordinates for element:', element)
      return
    }
    
    const connectionKey = currentActivity === 'number-match' 
      ? type + item.number 
      : type + item.letter
    
    setConnectionPoints(prev => ({
      ...prev,
      [connectionKey]: { x: center.x, y: center.y, type, item }
    }))
    
    setCurrentLine({
      start: center,
      end: center,
      startType: type,
      startItem: item
    })
    setIsDrawing(true)
    setAttempts(prev => prev + 1)
    
    // Play audio feedback
    playSound(currentActivity === 'number-match' ? item.number : item.letter, type)
  }

  const handleDrawingMove = (e) => {
    if (!isDrawing || !currentLine || !drawingSvgRef.current) return
    
    e.preventDefault()
    
    const svgRect = drawingSvgRef.current.getBoundingClientRect()
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0
    
    const point = {
      x: clientX - svgRect.left,
      y: clientY - svgRect.top
}
    setCurrentLine(prev => ({ ...prev, end: point }))
  }

  const handleDrawingEnd = (e) => {
    if (!isDrawing || !currentLine) return
    
    e.preventDefault()
    e.stopPropagation()
    
    const svgRect = drawingSvgRef.current?.getBoundingClientRect()
    if (!svgRect) return
    
    const clientX = e.clientX || e.changedTouches?.[0]?.clientX || 0
    const clientY = e.clientY || e.changedTouches?.[0]?.clientY || 0
    
    const endPoint = {
      x: clientX - svgRect.left,
      y: clientY - svgRect.top
    }
    
    // Determine target type based on activity and start type
    let targetType
    if (currentActivity === 'number-match') {
      targetType = currentLine.startType === 'number' ? 'item' : 'number'
    } else {
      targetType = currentLine.startType === 'letter' ? 'picture' : 'letter'
    }
    
    let closestTarget = null
    let minDistance = Infinity
    const tolerance = 80 // Increased tolerance for better user experience
    
    // Find the closest valid target within tolerance
    Object.entries(connectionPoints).forEach(([key, point]) => {
      if (point.type === targetType) {
        const distance = calculateDistance(endPoint, point)
        if (distance < tolerance && distance < minDistance) {
          minDistance = distance
          closestTarget = point
        }
      }
    })
    
    // Check for correct connection based on activity type
    const isCorrectConnection = currentActivity === 'number-match'
      ? closestTarget && currentLine.startItem.number === closestTarget.item.number
      : closestTarget && currentLine.startItem.letter === closestTarget.item.letter
    
    if (isCorrectConnection) {
      // Correct connection
      const lineColor = getNextAvailableColor()
      setUsedLineColors(prev => new Set([...prev, lineColor]))
      
      const itemKey = currentActivity === 'number-match' 
        ? currentLine.startItem.number.toString()
        : currentLine.startItem.letter
      
      const newLine = {
        start: currentLine.start,
        end: { x: closestTarget.x, y: closestTarget.y },
        startItem: currentLine.startItem,
        endItem: closestTarget.item,
        id: `${itemKey}-correct`,
        color: lineColor
      }
      
      setDrawingLines(prev => [...prev, newLine])
      setScore(prev => prev + 20)
      setCompletedLetters(prev => new Set([...prev, itemKey]))
      setMatchedPairs(prev => new Set([...prev, itemKey]))
      
      playSound(itemKey, 'correct')
      
      // Check if level is complete
      const currentItems = currentActivity === 'number-match' ? getCurrentNumbers() : getCurrentLetters()
      if (completedLetters.size + 1 >= currentItems.length) {
        setGameState('celebrating')
        setTimeout(() => {
          if (currentActivity === 'line-drawing') {
            // Add current level's letters to history before moving to next level
            setUsedLettersHistory(prev => {
              const newHistory = [...prev, getCurrentLetters()]
              // Keep only the last 5 levels
              return newHistory.slice(-5)
            })
            // Automatically generate new letters for the next level in line-drawing mode
            generateNewSet()
          } else if (currentActivity === 'number-match') {
            // Generate new number set for next level
            setCurrentNumbers(generateNumberSet())
          }
          
          setLevel(prev => prev + 1)
          setCompletedLetters(new Set())
          setMatchedPairs(new Set())
          setDrawingLines([])
setUsedLineColors(new Set()) // Reset colors for new level
          setGameState('playing')
        }, 2000)
      }
    } else {
      // Incorrect connection
playSound(currentLine.startItem.letter || currentLine.startItem.number, 'incorrect')
    }
setCurrentLine(null)
setIsDrawing(false)
  }
return (
    <div className="w-full max-w-7xl mx-auto">
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
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => switchActivity('number-match')}
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-bubble transition-all duration-300 ${
              currentActivity === 'number-match'
                ? 'bg-green-500 text-white shadow-playful'
                : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
            }`}
          >
            <ApperIcon name="Hash" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Count & Match</span>
          </motion.button>
</div>
      </motion.div>

      {/* Number Matching Configuration */}
      {currentActivity === 'number-match' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="activity-card mt-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-bubble flex items-center justify-center">
                <ApperIcon name="Settings" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-surface-800 font-heading">
                Number Range Configuration
              </h3>
            </div>
            
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                  <ApperIcon name="Hash" className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-surface-800 font-heading">Number Range</h4>
                  <p className="text-sm text-surface-600">Choose how many numbers to practice (1 to selected number)</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
                {[5, 6, 7, 8, 9, 10].map((range) => (
                  <motion.button
                    key={range}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setNumberRange(range)
                      setCurrentNumbers(generateNumberSet())
                      setCompletedLetters(new Set())
                      setMatchedPairs(new Set())
                    }}
                    className={`w-12 h-12 rounded-full text-lg font-bold transition-all duration-300 ${
                      numberRange === range
                        ? 'bg-green-500 text-white shadow-playful ring-2 ring-green-300'
                        : 'bg-surface-200 text-surface-600 hover:bg-surface-300 hover:shadow-soft'
                    }`}
                  >
                    {range}
                  </motion.button>
                ))}
              </div>
              
<div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-200 rounded-bubble">
                    <span className="text-sm font-medium text-surface-700">
                      Currently: <strong>1 to {numberRange}</strong>
                    </span>
                  </div>
                  <p className="text-xs text-surface-500 mt-2">
                    Higher numbers = more challenging counting
                  </p>
                </div>
              </div>

              {/* Action Section */}
            <div className="mt-6 pt-6 border-t border-surface-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-2 text-surface-700 mb-1">
                    <ApperIcon name="Hash" className="w-4 h-4" />
                    <span className="font-medium">Current Selection</span>
                  </div>
                  <div className="text-sm text-surface-600">
                    <span className="font-medium">Range:</span> 1 to {numberRange}
                  </div>
                  <div className="text-xs text-surface-500 mt-1">
                    {numberRange} numbers to practice
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentNumbers(generateNumberSet())
                    setCompletedLetters(new Set())
                    setMatchedPairs(new Set())
                    setSelectedNumber(null)
                  }}
className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-bubble shadow-soft hover:shadow-playful transition-all duration-300"
                >
                  <ApperIcon name="Shuffle" className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-bold text-sm">Generate New Set</div>
                    <div className="text-xs opacity-90">Get different items</div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

      {currentActivity === 'line-drawing' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="activity-card mt-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-bubble flex items-center justify-center">
                <ApperIcon name="Settings" className="w-4 h-4 sm:w-5 sm:h-5 text-surface-700" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-surface-800 font-heading">
                Game Configuration
              </h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Letter Count Configuration */}
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <ApperIcon name="Hash" className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-surface-800 font-heading">Letter Count</h4>
                    <p className="text-sm text-surface-600">Choose how many letters to practice</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3 mb-4">
                  {[4, 5, 6, 7, 8].map((count) => (
                    <motion.button
                      key={count}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLetterCountChange(count)}
                      className={`w-12 h-12 rounded-full text-lg font-bold transition-all duration-300 ${
                        letterCount === count
                          ? 'bg-accent text-surface-700 shadow-playful ring-2 ring-accent/50'
                          : 'bg-surface-200 text-surface-600 hover:bg-surface-300 hover:shadow-soft'
                      }`}
                    >
                      {count}
                    </motion.button>
                  ))}
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-accent/20 rounded-bubble">
                    <span className="text-sm font-medium text-surface-700">
                      Currently: <strong>{letterCount} letters</strong>
                    </span>
                  </div>
                  <p className="text-xs text-surface-500 mt-2">
                    More letters = longer game sessions
                  </p>
                </div>
              </div>

              {/* Images Per Letter Configuration */}
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 border border-secondary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                    <ApperIcon name="Image" className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-surface-800 font-heading">Images per Letter</h4>
                    <p className="text-sm text-surface-600">Set how many pictures to show for each letter</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3 mb-4">
                  {[1, 2, 3, 4].map((count) => (
                    <motion.button
                      key={count}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleImagesPerLetterChange(count)}
                      className={`w-12 h-12 rounded-full text-lg font-bold transition-all duration-300 ${
                        imagesPerLetter === count
                          ? 'bg-secondary text-white shadow-playful ring-2 ring-secondary/50'
                          : 'bg-surface-200 text-surface-600 hover:bg-surface-300 hover:shadow-soft'
                      }`}
                    >
                      {count}
                    </motion.button>
                  ))}
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-secondary/20 rounded-bubble">
                    <span className="text-sm font-medium text-surface-700">
                      Currently: <strong>{imagesPerLetter} {imagesPerLetter === 1 ? 'image' : 'images'}</strong> per letter
                    </span>
                  </div>
                  <p className="text-xs text-surface-500 mt-2">
                    More images = more variety and practice
                  </p>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="mt-6 pt-6 border-t border-surface-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-2 text-surface-700 mb-1">
                    <ApperIcon name="BookOpen" className="w-4 h-4" />
                    <span className="font-medium">Current Selection</span>
                  </div>
                  <div className="text-sm text-surface-600">
                    <span className="font-medium">{letterCount} letters:</span> {randomizedLetters.map(l => l.letter).join(', ')}
                  </div>
                  <div className="text-xs text-surface-500 mt-1">
                    {letterCount * imagesPerLetter} total pictures to match
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateNewSet}
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-bubble shadow-soft hover:shadow-playful transition-all duration-300"
                >
                  <ApperIcon name="Shuffle" className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-bold text-sm">Generate New Set</div>
                    <div className="text-xs opacity-90">Get different letters</div>
                  </div>
</motion.button>
              </div>
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
                ) : currentActivity === 'line-drawing' ? (
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Click and hold on a letter or picture</li>
                    <li>Draw a line to connect it with its match</li>
                    <li>Release to complete the connection!</li>
                  </ol>
                ) : (
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Click on a number to select it</li>
                    <li>Count the items and find the matching number</li>
                    <li>Match numbers to items to earn points!</li>
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
) : currentActivity === 'number-match' ? (
        // Number Line Drawing Mode
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
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-bubble flex items-center justify-center">
                <ApperIcon name="Pen" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-surface-800 font-heading">
                Draw Lines to Count and Match
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
                  stroke={`url(#${line.color}-gradient)`}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="0"
                  strokeLinecap="round"
                  filter="url(#glow-effect)"
                  style={{
                    dropShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
                  }}
                />
              ))}
              
              {/* Current Drawing Line */}
              {currentLine && (
                <motion.path
                  d={`M ${currentLine.start.x} ${currentLine.start.y} Q ${(currentLine.start.x + currentLine.end.x) / 2} ${Math.min(currentLine.start.y, currentLine.end.y) - 50} ${currentLine.end.x} ${currentLine.end.y}`}
                  stroke="url(#active-gradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="12,6"
                  strokeLinecap="round"
                  filter="url(#active-glow-effect)"
                  className="animate-pulse"
                  style={{
                    dropShadow: '0 0 12px rgba(255, 230, 109, 0.8)'
                  }}
                />
              )}
              
              <defs>
                {/* Individual Color Gradients for Each Line */}
                <linearGradient id="red-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="50%" stopColor="#FF8E8E" />
                  <stop offset="100%" stopColor="#FF6B6B" />
                </linearGradient>
                
                <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ECDC4" />
                  <stop offset="50%" stopColor="#7DD3CC" />
                  <stop offset="100%" stopColor="#4ECDC4" />
                </linearGradient>
                
                <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#96CEB4" />
                  <stop offset="50%" stopColor="#B8E6D1" />
                  <stop offset="100%" stopColor="#96CEB4" />
                </linearGradient>
                
                <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFB347" />
                  <stop offset="50%" stopColor="#FFCC73" />
                  <stop offset="100%" stopColor="#FFB347" />
                </linearGradient>
                
                <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DDA0DD" />
                  <stop offset="50%" stopColor="#E6B3E6" />
                  <stop offset="100%" stopColor="#DDA0DD" />
                </linearGradient>
                
                <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF69B4" />
                  <stop offset="50%" stopColor="#FF8CC8" />
                  <stop offset="100%" stopColor="#FF69B4" />
                </linearGradient>
                
                <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#20B2AA" />
                  <stop offset="50%" stopColor="#48D1CA" />
                  <stop offset="100%" stopColor="#20B2AA" />
                </linearGradient>
                
                <linearGradient id="yellow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFE66D" />
                  <stop offset="50%" stopColor="#FFF088" />
                  <stop offset="100%" stopColor="#FFE66D" />
                </linearGradient>
                
                <linearGradient id="indigo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6A5ACD" />
                  <stop offset="50%" stopColor="#8A7FDE" />
                  <stop offset="100%" stopColor="#6A5ACD" />
                </linearGradient>
                
                <linearGradient id="lime-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#32CD32" />
                  <stop offset="50%" stopColor="#5ED65E" />
                  <stop offset="100%" stopColor="#32CD32" />
                </linearGradient>
                
                {/* Active Drawing Gradient */}
                <linearGradient id="active-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="25%" stopColor="#FF69B4" />
                  <stop offset="50%" stopColor="#00CED1" />
                  <stop offset="75%" stopColor="#32CD32" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
                
                {/* Glow Effect for Completed Lines */}
                <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                {/* Active Glow Effect for Drawing Lines */}
                <filter id="active-glow-effect" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
            
            <div className="drawing-columns-container">
              {/* Numbers Column - Left Side */}
              <div className="drawing-column numbers-column">
                <div className="column-header">
                  <h3 className="text-xl font-bold text-center text-green-600 mb-6">Numbers</h3>
                </div>
                <div className="column-content">
                  {getCurrentNumbers().map((item, index) => (
                    <motion.div
                      key={`number-${item.number}`}
                      data-number={item.number}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onMouseDown={(e) => handleDrawingStart(e, 'number', item)}
                      onTouchStart={(e) => handleDrawingStart(e, 'number', item)}
                      className={`letter-card cursor-pointer text-center relative select-none ${
                        completedLetters.has(item.number.toString())
                          ? 'bg-green-100 border-green-300 opacity-75'
                          : 'hover:shadow-playful hover:scale-105'
                      }`}
                    >
                      {completedLetters.has(item.number.toString()) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <ApperIcon name="Check" className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                      
                      <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2 font-heading pointer-events-none">
                        {item.number}
</div>
                      {/* Connection Point */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-4 h-4 bg-green-600 rounded-full opacity-40 border-2 border-white shadow-sm"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Items Column - Right Side */}
              <div className="drawing-column items-column">
                <div className="column-header">
                  <h3 className="text-xl font-bold text-center text-blue-600 mb-6">Count Items</h3>
                </div>
                <div className="column-content">
                  {shuffledItemGroups.map((item, index) => (
                    <motion.div
                      key={`item-${item.number}-${index}`}
                      data-item={`${item.number}-${index}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      onMouseDown={(e) => handleDrawingStart(e, 'item', item)}
                      onTouchStart={(e) => handleDrawingStart(e, 'item', item)}
                      className={`letter-card cursor-pointer text-center relative select-none ${
                        completedLetters.has(item.number.toString())
                          ? 'bg-green-100 border-green-300 opacity-75'
                          : 'hover:shadow-playful hover:scale-105'
                      }`}
                    >
                      {completedLetters.has(item.number.toString()) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <ApperIcon name="Check" className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                      
                      <div className="text-2xl sm:text-3xl mb-3 leading-relaxed pointer-events-none">
                        {item.items[0].emoji}
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-surface-800 mb-1 pointer-events-none">
                        {item.items[0].name}
</div>
                      {/* Connection Point */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-4 h-4 bg-blue-600 rounded-full opacity-40 border-2 border-white shadow-sm"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {isDrawing && currentLine && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-500/10 rounded-bubble border border-green-500/20"
            >
              <div className="flex items-center gap-3 justify-center">
                <ApperIcon name="Hand" className="w-5 h-5 text-green-600" />
                <div className="text-sm sm:text-base text-surface-700 font-medium">
                  Draw a line to connect <strong>{currentLine.startItem.number}</strong> with the matching items!
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
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
                  stroke={`url(#${line.color}-gradient)`}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="0"
                  strokeLinecap="round"
                  filter="url(#glow-effect)"
                  style={{
                    dropShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
                  }}
                />
              ))}
              
              {/* Current Drawing Line */}
              {currentLine && (
                <motion.path
d={`M ${currentLine.start.x} ${currentLine.start.y} Q ${(currentLine.start.x + currentLine.end.x) / 2} ${Math.min(currentLine.start.y, currentLine.end.y) - 50} ${currentLine.end.x} ${currentLine.end.y}`}
                  stroke="url(#active-gradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="12,6"
                  strokeLinecap="round"
                  filter="url(#active-glow-effect)"
                  className="animate-pulse"
                  style={{
                    dropShadow: '0 0 12px rgba(255, 230, 109, 0.8)'
}}
                />
              )}
              
              <defs>
{/* Rainbow Gradient for Completed Lines */}
                {/* Individual Color Gradients for Each Line */}
                <linearGradient id="red-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="50%" stopColor="#FF8E8E" />
                  <stop offset="100%" stopColor="#FF6B6B" />
                </linearGradient>
                
                <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ECDC4" />
                  <stop offset="50%" stopColor="#7DD3CC" />
                  <stop offset="100%" stopColor="#4ECDC4" />
                </linearGradient>
                
                <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#96CEB4" />
                  <stop offset="50%" stopColor="#B8E6D1" />
                  <stop offset="100%" stopColor="#96CEB4" />
                </linearGradient>
                
                <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFB347" />
                  <stop offset="50%" stopColor="#FFCC73" />
                  <stop offset="100%" stopColor="#FFB347" />
                </linearGradient>
                
                <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DDA0DD" />
                  <stop offset="50%" stopColor="#E6B3E6" />
                  <stop offset="100%" stopColor="#DDA0DD" />
                </linearGradient>
                
                <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF69B4" />
                  <stop offset="50%" stopColor="#FF8CC8" />
                  <stop offset="100%" stopColor="#FF69B4" />
                </linearGradient>
                
                <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#20B2AA" />
                  <stop offset="50%" stopColor="#48D1CA" />
                  <stop offset="100%" stopColor="#20B2AA" />
                </linearGradient>
                
                <linearGradient id="yellow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFE66D" />
                  <stop offset="50%" stopColor="#FFF088" />
                  <stop offset="100%" stopColor="#FFE66D" />
                </linearGradient>
                
                <linearGradient id="indigo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6A5ACD" />
                  <stop offset="50%" stopColor="#8A7FDE" />
                  <stop offset="100%" stopColor="#6A5ACD" />
                </linearGradient>
                
                <linearGradient id="lime-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#32CD32" />
                  <stop offset="50%" stopColor="#5ED65E" />
                  <stop offset="100%" stopColor="#32CD32" />
                </linearGradient>
                
                {/* Active Drawing Gradient */}
                <linearGradient id="active-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="25%" stopColor="#FF69B4" />
                  <stop offset="50%" stopColor="#00CED1" />
                  <stop offset="75%" stopColor="#32CD32" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
                
                {/* Glow Effect for Completed Lines */}
                <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                {/* Active Glow Effect for Drawing Lines */}
                <filter id="active-glow-effect" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
</feMerge>
                </filter>
              </defs>
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
                      data-letter={item.letter}
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
                      
                      {/* Relevant picture names for this letter */}
                      <div className="text-xs text-surface-600 mb-2 pointer-events-none leading-tight">
                        {randomizedPictures
                          .filter(pic => pic.letter === item.letter)
                          .map(pic => pic.word)
.join(', ')
                        }
                      </div>
                      
                      {/* Connection Point */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-4 h-4 bg-primary rounded-full opacity-40 border-2 border-white shadow-sm"></div>
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
                  <div className={`grid grid-cols-dynamic-${imagesPerLetter} gap-3 md:gap-4`}>
                    {randomizedPictures.map((item, index) => (
                      <motion.div
                        key={`picture-${item.letter}-${item.index}`}
                        data-picture={`${item.letter}-${item.index}`}
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
                        
                        <div className="text-4xl sm:text-5xl mb-3 pointer-events-none">
                          {item.emoji}
                        </div>
                        
                        {/* Connection Point */}
                        {/* Connection Point */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-4 h-4 bg-secondary rounded-full opacity-40 border-2 border-white shadow-sm"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
</div>
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