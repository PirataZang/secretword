import "./StartScreen.css";

const StartScreen = ({startGame}) => {


  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>Clique para Iniciar o Jogo</p>
        <button onClick={startGame}>Start</button>
    </div>
  )
}

export default StartScreen