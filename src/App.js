// CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from "react";

//Dados
import {wordsList} from "./data/Words";

//Componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const Stage = [
  {id: 1, name: "Start"},
  {id: 2, name: "Game"},
  {id: 3, name: "End"},
]

function App() {
  // Status do Games e Lista de Palavras
  const [gameState, SetGameState] = useState(Stage[0].name);
  const [words] = useState(wordsList);

  //Seleção de Categoria e de Palavra
  const [pickedWord, setPickedWord] = useState();
  const [pickedCategory, setPickedCategory] = useState();
  const [letter, setLetter] = useState([]);

  //Dados Durante a jogatina, como pontos, tentativas de erros etc
  const [guessedLetter, setGuessedLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [guesses, setGuesses] = useState(5);
  const [score, setScore] = useState([]);

  const pickeWordAndCategory = useCallback(() => {
    //pick a Random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
    //pick a Random Word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category};

  }, [words]);

  //Inicia o Jogo
  const startGame = useCallback(() => {

    // clear all Letters
    clearLetterState();

    //Pick Word and Pick Category
    const {word, category} = pickeWordAndCategory();

    //Separador de Letras
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category); 
    console.log(wordLetters);

    // fill states
    setPickedWord(word);
    setPickedCategory(category)
    setLetter(wordLetters)


    SetGameState(Stage[1].name);
  }, [pickeWordAndCategory]);
  
    //Process the letter input
    const VerifyLetter = (letters) =>{
    
    const normalizedLetter = letters.toLowerCase();

    //checked if letter already been utilized
    if(guessedLetter.includes(normalizedLetter) || wrongLetter.includes(normalizedLetter)){
      return;
    }

    //push guessed letters or Remove guess
    if(letter.includes(normalizedLetter)){
      setGuessedLetter((actualGuessedLetter) => [
        ...actualGuessedLetter, normalizedLetter
      ])
    }
    
    else{
      setWrongLetter((actualWrongLetter) => [
        ...actualWrongLetter, normalizedLetter
      ])
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  const clearLetterState = () => {
    setGuessedLetter([]);
    setWrongLetter([]);
  }

  //condição para Derrota
  useEffect(() =>  {
    if(guesses <= 0){

      clearLetterState();

      SetGameState(Stage[2].name)
    }
  }, [guesses])

  //Condição para Vitória
 useEffect(() => {

  const uniqueLetter = [... new Set(letter)];
  
  if(guessedLetter.length === uniqueLetter.length){

    //add Score
    setScore((actualScore) => actualScore += 10)

    setGuessedLetter([]);
    setWrongLetter([]);

    startGame();
  }

 }, [guessedLetter, letter, startGame]);

  const Retry = () =>{
    setScore(0);
    setGuesses(5);

    SetGameState(Stage[0].name)
  }

  return (
    <div className="App">
      {gameState === "Start" && <StartScreen startGame={startGame }/>}
      {gameState === "Game" && <Game  
        VerifyLetter={VerifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letter={letter}
        guessedLetter={guessedLetter}
        wrongLetter={wrongLetter}
        guesses={guesses}
        score={score}
        />}
      {gameState === "End" && <GameOver Retry={Retry} score={score}/>}
    </div>
  )
}

export default App;
