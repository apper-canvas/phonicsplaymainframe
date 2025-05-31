import { useState, useEffect } from 'react'

// Custom hook for MainFeature data management
export const useMainFeatureData = () => {
  // Alphabet data with expanded word options for each letter
  const alphabetData = [
    { letter: 'A', words: [
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
      { word: 'Zoo', emoji: '🏛️' },
      { word: 'Zero', emoji: '0️⃣' }
    ], sound: '/z/' }
  ]

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
    const newLetters = selectRandomLetters(letterCount)
    const newPictures = generatePicturesForLetters(newLetters)
    const shuffledPictures = shufflePicturesByDifferentLetters(newPictures)
    setRandomizedLetters(newLetters)
    setRandomizedPictures(shuffledPictures)
    setRandomSeed(prev => prev + 1)
  }

  const handleLetterCountChange = (newCount) => {
    setLetterCount(newCount)
    
    const newLetters = selectRandomLetters(newCount)
    const newPictures = generatePicturesForLetters(newLetters)
    const shuffledPictures = shufflePicturesByDifferentLetters(newPictures)
    setRandomizedLetters(newLetters)
    setRandomizedPictures(shuffledPictures)
  }

  const handleImagesPerLetterChange = (newCount) => {
    setImagesPerLetter(newCount)
    
    if (randomizedLetters.length > 0) {
      const newPictures = generatePicturesForLetters(randomizedLetters)
      const shuffledPictures = shufflePicturesByDifferentLetters(newPictures)
      setRandomizedPictures(shuffledPictures)
    }
  }

  // Generate initial randomized letters
  useEffect(() => {
    if (randomizedLetters.length === 0) {
      const newLetters = selectRandomLetters(letterCount)
      setRandomizedLetters(newLetters)
      const newPictures = generatePicturesForLetters(newLetters)
      const shuffledPictures = shufflePicturesByDifferentLetters(newPictures)
      setRandomizedPictures(shuffledPictures)
    }
  }, [letterCount, imagesPerLetter])

  return {
    // Data constants
    alphabetData,
    numberData,
    letterData,
    availableColors,
    
    // State
    randomizedLetters,
    setRandomizedLetters,
    letterCount,
    setLetterCount,
    randomSeed,
    setRandomSeed,
    usedLineColors,
    setUsedLineColors,
    randomizedPictures,
    setRandomizedPictures,
    usedLettersHistory,
    setUsedLettersHistory,
    imagesPerLetter,
    setImagesPerLetter,
    numberRange,
    setNumberRange,
    currentNumbers,
    setCurrentNumbers,
    shuffledItemGroups,
    setShuffledItemGroups,
    
    // Utility functions
    getCompatibleAlphabetData,
    shuffleArray,
    selectRandomLetters,
    shufflePictures,
    generatePicturesForLetters,
    shuffleLetterOrder,
    shufflePicturesByDifferentLetters,
    getNextAvailableColor,
    generateNumberSet,
    generateNewSet,
    handleLetterCountChange,
    handleImagesPerLetterChange
  }
}