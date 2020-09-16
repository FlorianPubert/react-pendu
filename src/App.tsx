import React, {Component} from 'react';
import './App.css';
import { shuffle } from "lodash";

import Letter from './Letter'
import KeybordLetter from "./KeybordLetter";

import './App.css';
import Hangman from "./Hangman";

// Define an array of words (top series)
const SERIES = ["GAME OF THRONES", "CHERNOBYL", "BREAKING BAD", "PEAKY BLINDERS", "STRANGER THINGS",
  "NARCOS", "FARGO", "TRUE DETECTIVE", "THE WALKING DEAD", "VIKINGS", "BLACK MIRROR"]

// ASCII character code
const A = 65
const ALPHABET = Array.from({length: 26}, (_, i) => String.fromCharCode(A + i))

const MAX_LIFE = 10;
const GOOD_LETTER = 2;
const BAD_LETTER = -1;
const LETTER_ALREADY_PLAYED = -2;

interface State {
  errorCount: number,
  life: number,
  matchedLetter: string[],
  score: number,
  usedLetter: string[],
  word: string,
  hangmanElement: any
}
interface Props {}

class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      errorCount: 0,
      life: MAX_LIFE,
      matchedLetter: [],
      score: 0,
      usedLetter: [],
      word: this.getRandomWord(),
      hangmanElement: React.createRef()
    }
  }

  getRandomWord() {
    const candidates = shuffle(SERIES)
    return candidates[0];
  }

  // Arrow fx for binding
  handleLetterClick = (letter :string) => {
    const {errorCount, life, matchedLetter, usedLetter, score, word} = this.state
    const matched = word.split("").includes(letter) && !matchedLetter.includes(letter);
    if (matched) {
      this.setState({usedLetter: [...usedLetter, letter], matchedLetter: [...matchedLetter, letter], score: score + GOOD_LETTER})
    } else if (matchedLetter.includes(letter)) {
      this.setState({usedLetter: [...usedLetter, letter], errorCount: errorCount + 1, score: score + LETTER_ALREADY_PLAYED, life: life -1})
    } else {
      this.setState({usedLetter: [...usedLetter, letter], errorCount: errorCount + 1, score: score + BAD_LETTER, life: life -1})
    }
  }

  reset = () => {
    this.setState( {
      errorCount: 0,
      life: MAX_LIFE,
      matchedLetter: [],
      score: 0,
      usedLetter: [],
      word: this.getRandomWord()
    })
    const {hangmanElement} = this.state
    hangmanElement.current.reset(MAX_LIFE)
  }

  isWin(matchedLetter: string[], word: string) {
    // remove space
    let wordLetter = word.split('').filter((item) => item !== ' ')
    // remove duplicate lette
    wordLetter = wordLetter.filter((x, i, a) => a.indexOf(x) === i)
    return matchedLetter.length === wordLetter.length
  }

  isLoose(life: number) {
    return life === 0
  }

  render() {
    const {errorCount, hangmanElement, life, matchedLetter, word} = this.state
    return (
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mt-5">
              <h1>Pendu sur les séries</h1>
              {this.wordScreen()}
            </div>
          </div>
          {this.replay(life, matchedLetter, word)}
          <div className="row">
            <div className="col-12 text-center mt-5">
              <h5>Score : {this.state.score}</h5>
            </div>
          </div>
          <div className="row justify-content-md-center mt-5">
            <div className="col-5 text-center">
              {this.keybord(life, this.isLoose(life), this.isWin(matchedLetter, word))}
            </div>
          </div>
          <div className="row justify-content-md-center mt-5">
            <div className="col-5 text-center">
              <Hangman ref={hangmanElement} errorCount={errorCount} life={life} />
            </div>
          </div>
        </div>
    )
  }

  wordScreen() {
    const {matchedLetter, word} = this.state
    return (
        word.split("").map((letter, index) => (
            <Letter
                key={index}
                letter={letter}
                isVisible={matchedLetter.includes(letter) || letter.trim() === ''}
            />
        ))
    )
  }

  keybord(life: number, isLoose: boolean, isWin: boolean) {
    const {usedLetter} = this.state
    const isDisabled = isLoose || isWin;
    return (
        ALPHABET.map((letter, index) => (
            <KeybordLetter
                isUsed={usedLetter.includes(letter)}
                isDisabled={isDisabled}
                key={index}
                letter={letter}
                onClick={this.handleLetterClick}
            />
        )))
  }

  replay(life: number, matchedLetter: string[], word: string) {

    let isWin = this.isWin(matchedLetter, word)
    let isLoose = this.isLoose(life)

    if (!isWin && !isLoose) return;

    return (
        <div className="row">
          <div className="col-12 text-center mt-2">
            <h2>{isLoose ? "Vous avez Perdu !" : isWin ? "Vous avez gagné !" : ""}</h2>
            <button type="button" className="btn btn-info" onClick={this.reset}>Rejouer</button>
          </div>
        </div>
    )
  }
}

export default App;
