import { useState, useRef } from "react"
import "./Game.css"

const Game = ({VerifyLetter, pickedWord, pickedCategory, letter, guessedLetter, wrongLetter, guesses, score}) => {

  const [letra, setLetra] = useState("");
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    VerifyLetter(letra);
  
    setLetra("");

    letterInputRef.current.focus();
  
  }

  return (
    <div className='Game'>
      <p className='Points'>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a Palavra:</h1>
      <h3 className='Tip'>
        Dica sobre a Palavra: <span>{pickedCategory}</span>
        <p>Você ainda tem <span className="Tentativas">{guesses}</span> Tentativas</p>
      </h3>
      <div className='WordContainer'>
        {letter.map((letter, i) => (
            guessedLetter.includes(letter) ? (<span key={i} className="Letter">{letter}</span>) : (<span key={i} className="BlankSquare"></span>)
        ))}
      </div>
      <div className='LetterContainer'>
        <p>Tente adivinhar uma Letra da Palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type='text' name='Letter' maxLength="1" required onChange={(e) => setLetra(e.target.value)} value={letra} ref={letterInputRef}/>
          <button>Jogar!</button>
        </form>
      </div>
      <div className='WrongLettersContainer'>
        <p>Letras Erradas:</p>
        {wrongLetter.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game