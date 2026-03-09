import { useState } from 'react'
import Card from './components/Card'
import { flashcards } from './data/flashcards'
import './App.css'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const cardSetTitle = 'Best Spanish Flashcards'
  const cardSetDescription = 'Practice common English-to-Spanish phrases one card at a time.'

  const currentCard = flashcards[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1))
    setIsFlipped(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1))
    setIsFlipped(false)
  }

  return (
    <div className="container">
      <h1 className="deck-title">{cardSetTitle}</h1>
      <p className="deck-description">{cardSetDescription}</p>
      <p className="deck-total">Total cards: {flashcards.length}</p>
      <h2 className="deck-instruction">Click card to flip it</h2>
      <h2 className="deck-progress">
        Card {currentIndex + 1} of {flashcards.length}
      </h2>

      <Card
        front={currentCard.question}
        back={currentCard.answer}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped((prev) => !prev)}
      />

      <div className="buttons-container">
        <button className="btn" onClick={handlePrev} type="button" aria-label="Previous card">
          ←
        </button>
        <button className="btn" onClick={handleNext} type="button" aria-label="Next card">
          →
        </button>
      </div>
    </div>
  )
}

export default App
