import { useState } from 'react'
import Card from './components/Card'
import { flashcards } from './data/flashcards'
import './App.css'

const normalizeAnswer = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const isGuessCorrect = (guess, answer) => {
  const normalizedGuess = normalizeAnswer(guess)
  const normalizedAnswer = normalizeAnswer(answer)

  if (!normalizedGuess) {
    return false
  }

  return (
    normalizedGuess === normalizedAnswer ||
    normalizedGuess.includes(normalizedAnswer) ||
    normalizedAnswer.includes(normalizedGuess)
  )
}

const shuffleList = (items) => {
  const nextItems = [...items]

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]]
  }

  return nextItems
}

function App() {
  const [cardOrder, setCardOrder] = useState(flashcards.map((card) => card.id))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [guess, setGuess] = useState('')
  const [guessStatus, setGuessStatus] = useState('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [masteredIds, setMasteredIds] = useState([])
  const cardSetTitle = 'Best Spanish Flashcards'
  const cardSetDescription = 'Practice common English-to-Spanish phrases one card at a time.'

  const activeCards = cardOrder
    .map((cardId) => flashcards.find((card) => card.id === cardId))
    .filter((card) => card && !masteredIds.includes(card.id))

  const currentCard = activeCards[currentIndex] ?? null
  const masteredCards = flashcards.filter((card) => masteredIds.includes(card.id))
  const hasCardsRemaining = activeCards.length > 0
  const isAtFirstCard = currentIndex === 0
  const isAtLastCard = currentIndex === activeCards.length - 1

  const resetCardState = () => {
    setIsFlipped(false)
    setGuess('')
    setGuessStatus('idle')
    setFeedbackMessage('')
  }

  const goToCard = (nextIndex) => {
    setCurrentIndex(nextIndex)
    resetCardState()
  }

  const handlePrev = () => {
    if (!hasCardsRemaining || isAtFirstCard) {
      return
    }

    goToCard(currentIndex - 1)
  }

  const handleNext = () => {
    if (!hasCardsRemaining || isAtLastCard) {
      return
    }

    goToCard(currentIndex + 1)
  }

  const handleSubmitGuess = (event) => {
    event.preventDefault()

    if (!currentCard) {
      return
    }

    const correct = isGuessCorrect(guess, currentCard.answer)

    if (correct) {
      const nextStreak = currentStreak + 1
      setGuessStatus('correct')
      setFeedbackMessage('Correct. Your answer matches the card.')
      setCurrentStreak(nextStreak)
      setLongestStreak((prev) => Math.max(prev, nextStreak))
      return
    }

    setGuessStatus('incorrect')
    setFeedbackMessage('Not quite. Try again or flip the card to review the answer.')
    setCurrentStreak(0)
  }

  const handleShuffle = () => {
    if (activeCards.length < 2) {
      return
    }

    const shuffledIds = shuffleList(activeCards.map((card) => card.id))
    const remainingMasteredIds = cardOrder.filter((cardId) => masteredIds.includes(cardId))
    setCardOrder([...shuffledIds, ...remainingMasteredIds])
    goToCard(0)
  }

  const handleMasterCard = () => {
    if (!currentCard || masteredIds.includes(currentCard.id)) {
      return
    }

    const nextMasteredIds = [...masteredIds, currentCard.id]
    const remainingCardsCount = activeCards.length - 1
    const nextIndex = remainingCardsCount === 0 ? 0 : Math.min(currentIndex, remainingCardsCount - 1)

    setMasteredIds(nextMasteredIds)
    setCurrentIndex(nextIndex)
    resetCardState()
  }

  return (
    <div className="container">
      <div className="hero-panel">
        <h1 className="deck-title">{cardSetTitle}</h1>
        <p className="deck-description">{cardSetDescription}</p>
        <p className="deck-total">Total cards: {flashcards.length}</p>

        <div className="stats-row">
          <div className="stat-chip">
            <span className="stat-label">Current streak</span>
            <span className="stat-value">{currentStreak}</span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">Longest streak</span>
            <span className="stat-value">{longestStreak}</span>
          </div>
          <div className="stat-chip">
            <span className="stat-label">Mastered</span>
            <span className="stat-value">{masteredCards.length}</span>
          </div>
        </div>

        {hasCardsRemaining ? (
          <>
            <h2 className="deck-instruction">Enter a guess, then flip the card to check yourself</h2>
            <h2 className="deck-progress">
              Card {currentIndex + 1} of {activeCards.length}
            </h2>

            <Card
              front={currentCard.question}
              back={currentCard.answer}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((prev) => !prev)}
            />

            <form className="guess-form" onSubmit={handleSubmitGuess}>
              <label className="guess-label" htmlFor="guess-input">
                Your guess
              </label>
              <div className="guess-controls">
                <input
                  id="guess-input"
                  className={`guess-input ${guessStatus !== 'idle' ? `is-${guessStatus}` : ''}`}
                  type="text"
                  value={guess}
                  onChange={(event) => {
                    setGuess(event.target.value)
                    if (guessStatus !== 'idle') {
                      setGuessStatus('idle')
                      setFeedbackMessage('')
                    }
                  }}
                  placeholder="Type the Spanish translation"
                  autoComplete="off"
                />
                <button className="btn primary-btn" type="submit">
                  Submit guess
                </button>
              </div>
            </form>

            {feedbackMessage ? (
              <p className={`feedback-message ${guessStatus}`}>{feedbackMessage}</p>
            ) : null}

            <div className="buttons-container">
              <button
                className="btn"
                onClick={handlePrev}
                type="button"
                aria-label="Previous card"
                disabled={isAtFirstCard}
              >
                ← Previous
              </button>
              <button className="btn" onClick={handleShuffle} type="button" disabled={activeCards.length < 2}>
                Shuffle
              </button>
              <button className="btn" onClick={handleMasterCard} type="button">
                Mark mastered
              </button>
              <button
                className="btn"
                onClick={handleNext}
                type="button"
                aria-label="Next card"
                disabled={isAtLastCard}
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h2>All cards mastered</h2>
            <p>You have removed every card from the active deck.</p>
          </div>
        )}

        <section className="mastered-section" aria-live="polite">
          <h3>Mastered cards</h3>
          {masteredCards.length === 0 ? (
            <p className="mastered-empty">No cards mastered yet.</p>
          ) : (
            <ul className="mastered-list">
              {masteredCards.map((card) => (
                <li key={card.id} className="mastered-item">
                  <span>{card.question}</span>
                  <span>{card.answer}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
