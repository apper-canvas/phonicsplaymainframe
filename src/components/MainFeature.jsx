import React from 'react'
import { motion } from 'framer-motion'
import { useGameState } from '../hooks/useGameState'
import { useLineDrawing } from '../hooks/useLineDrawing'
import { useGameData } from '../hooks/useGameData'
import GameHeader from './GameHeader'
import ActivitySelector from './ActivitySelector'
import GameConfiguration from './GameConfiguration'
import HintPanel from './HintPanel'
import LetterMatchGame from './LetterMatchGame'
import PictureMatchGame from './PictureMatchGame'
import LineDrawingGame from './LineDrawingGame'
import CelebrationModal from './CelebrationModal'

const MainFeature = () => {
  // Custom hooks for state management
  const gameState = useGameState()
  const gameData = useGameData(gameState)
  const lineDrawing = useLineDrawing(gameState, gameData)

  // Destructure all needed state and functions
  const {
    currentActivity,
    score,
    level,
    attempts,
    completedLetters,
    gameStatus,
    showHint,
    selectedLetter,
    selectedPicture,
    draggedLetter,
    matchedPairs,
    letterCount,
    imagesPerLetter,
    // Actions
    switchActivity,
    resetGame,
    toggleHint,
    handleLetterSelect,
    handlePictureSelect,
    handleWordMatch,
    handlePictureMatch,
    handleLetterCountChange,
    handleImagesPerLetterChange,
    generateNewSet
  } = gameState

  const {
    getCurrentLetters,
    randomizedLetters,
    rearrangedPictureGroups,
    progressPercentage
  } = gameData

  const {
    drawingLines,
    currentLine,
    isDrawing,
    drawingSvgRef,
    handleDrawingStart,
    handleDrawingMove,
    handleDrawingEnd
  } = lineDrawing

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Game Header with Stats */}
      <GameHeader
        score={score}
        level={level}
        attempts={attempts}
        completedLetters={completedLetters}
        getCurrentLetters={getCurrentLetters}
        progressPercentage={progressPercentage}
        showHint={showHint}
        toggleHint={toggleHint}
        resetGame={resetGame}
      />

      {/* Activity Selector */}
      <ActivitySelector
        currentActivity={currentActivity}
        switchActivity={switchActivity}
      />

      {/* Line Drawing Configuration */}
      {currentActivity === 'line-drawing' && (
        <GameConfiguration
          letterCount={letterCount}
          imagesPerLetter={imagesPerLetter}
          randomizedLetters={randomizedLetters}
          handleLetterCountChange={handleLetterCountChange}
          handleImagesPerLetterChange={handleImagesPerLetterChange}
          generateNewSet={generateNewSet}
        />
      )}

      {/* Hint Panel */}
      <HintPanel
        showHint={showHint}
        currentActivity={currentActivity}
      />

      {/* Main Game Area */}
      {currentActivity === 'letter-match' ? (
        <LetterMatchGame
          getCurrentLetters={getCurrentLetters}
          selectedLetter={selectedLetter}
          completedLetters={completedLetters}
          matchedPairs={matchedPairs}
          handleLetterSelect={handleLetterSelect}
          handleWordMatch={handleWordMatch}
        />
      ) : currentActivity === 'picture-match' ? (
        <PictureMatchGame
          getCurrentLetters={getCurrentLetters}
          selectedPicture={selectedPicture}
          draggedLetter={draggedLetter}
          completedLetters={completedLetters}
          matchedPairs={matchedPairs}
          handlePictureSelect={handlePictureSelect}
          handlePictureMatch={handlePictureMatch}
        />
      ) : (
        <LineDrawingGame
          getCurrentLetters={getCurrentLetters}
          rearrangedPictureGroups={rearrangedPictureGroups}
          completedLetters={completedLetters}
          drawingLines={drawingLines}
          currentLine={currentLine}
          isDrawing={isDrawing}
          drawingSvgRef={drawingSvgRef}
          imagesPerLetter={imagesPerLetter}
          handleDrawingStart={handleDrawingStart}
          handleDrawingMove={handleDrawingMove}
          handleDrawingEnd={handleDrawingEnd}
        />
      )}

      {/* Celebration Animation */}
      <CelebrationModal
        gameStatus={gameStatus}
        level={level}
      />
    </div>
  )
}

export default MainFeature