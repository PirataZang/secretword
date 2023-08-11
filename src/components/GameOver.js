import "./GameOver.css"

const GameOver = ({Retry, score}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={Retry}>Restart</button>
      </div>
  )
}

export default GameOver