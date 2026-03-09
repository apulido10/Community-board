export default function Card({ front, back, isFlipped, onFlip }) {
  return (
    <div
      className={`card-container ${isFlipped ? 'is-flipped' : ''}`}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label="Flashcard"
      aria-pressed={isFlipped}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onFlip()
        }
      }}
    >
      <div className="card-inner">
        <div className="card-face card-front">
          <div className="card-text">{front}</div>
        </div>
        <div className="card-face card-back">
          <div className="card-text">{back}</div>
        </div>
      </div>
    </div>
  )
}
