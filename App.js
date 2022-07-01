import "./App.css"
import { useState } from "react"
let count = 0
const FREE_CELL = 0
const RABBIT = "Rabbit"
const WOLF = "wOLF"
const FENCE = 3
const HOME = "Home"

const X = 0
const Y = 1

const IMAGES = {
  [RABBIT]: "img/rabbit.gif",
  [WOLF]: "img/gamewolf.png",
  [FENCE]: "img/ban.png",
  [HOME]: "img/home.png",
}
function App() {
  count++
  const [gameBoardNumber, setGamboardNumber] = useState([])
  function clickButton() {
    setGamboardNumber([...gameBoardNumber, count])
    console.log("aaa")
  }
  return (
    <div className="App">
      {gameBoardNumber.map((number) => {
        return <StartNewGame key={number} />
      })}
      <button id="newBoardButton" onClick={clickButton}>
        New Board
      </button>
    </div>
  )
}

export default App

function CreateMatrix(value) {
  let arr = []
  for (let i = 0; i < value; i++) {
    arr[i] = []
    for (let j = 0; j < value; j++) {
      arr[i][j] = FREE_CELL
    }
  }
  return arr
}

function DefineAtributes(gameState, value) {
  const wolfCount = Math.ceil((60 * value) / 100)
  const fenceCount = Math.round((40 * value) / 100)
  if (gameState.gameOver === true) {
    return
  }
  DefineRabbit(gameState)
  DefineWolves(gameState, wolfCount)
  DefineFences(gameState, fenceCount)
  DefineHome(gameState)
  console.log(gameState.gameMatrix)
}

const DefineRabbit = (gameState) => DefineRandomPosition(gameState, RABBIT)
const DefineFence = (gameState) => DefineRandomPosition(gameState, FENCE)
const DefineWolf = (gameState) => DefineRandomPosition(gameState, WOLF)
const DefineHome = (gameState) => DefineRandomPosition(gameState, HOME)

function DefineFences(gameState, count) {
  for (let i = 1; i < count; i++) {
    DefineFence(gameState)
  }
}

function DefineWolves(gameState, wolfCount) {
  for (let i = 0; i < wolfCount; i++) {
    DefineWolf(gameState)
  }
}
function DefineRandomPosition(gameState, character) {
  const arr = gameState.gameMatrix
  const x = Math.floor(Math.random() * arr.length)
  const y = Math.floor(Math.random() * arr.length)
  if (arr[x][y] === FREE_CELL) {
    arr[x][y] = character
  } else {
    DefineRandomPosition(gameState, character)
  }
}

function Image(props) {
  if (props.character === RABBIT) {
    const image = IMAGES[RABBIT]
    return <img src={image} alt="#" />
  }
  if (props.character === WOLF) {
    const image = IMAGES[WOLF]
    return <img src={image} alt="#" />
  }
  if (props.character === FENCE) {
    const image = IMAGES[FENCE]
    return <img src={image} alt="#" />
  }
  if (props.character === HOME) {
    const image = IMAGES[HOME]
    return <img src={image} alt="#" />
  }
}

function BtnEvent(props) {
  return (
    <div id="btnEvent" className="btnEvent">
      <button id="up" className="up">
        Up
      </button>
      <button id="left" className="left">
        Left
      </button>
      <button id="right" className="right">
        Right
      </button>
      <button id="down" className="down">
        Down
      </button>
    </div>
  )
}

function StartNewGame() {
  const optionsArray = [5, 7, 10]
  const [value, setValue] = useState(optionsArray[0])
  const [gameState, setGameState] = useState({
    gameMatrix: [],
    gameOver: false,
    gameStatus: "",
  })
  console.log(gameState)
  const handleChange = (event) => setValue(event.target.value)
  const styleObject = {
    width: gameState.gameMatrix.length * 80 + 100 + "px",
  }

  console.log(gameState)
  function handleClick() {
    setGameState({
      gameMatrix: CreateMatrix(value),
      gameOver: false,
      gameResult: "",
    })
  }


  const gameArray = gameState.gameMatrix
  console.log(gameState)

  return (
    <div>
      <button id="start" className="start" onClick={handleClick}>
        Start
      </button>

      <select className="select" id="select" onChange={handleChange}>
        {optionsArray.map((option) => {
          return (
            <option key={option} value={option}>
              {option}X{option}
            </option>
          )
        })}
      </select>
      <div id="newGameArea" className="newGameArea" style={styleObject}>
        {gameArray.map((row, x) => {
          return row.map((column, y) => {
            return (
              <div className="box" key={x.toString() + y.toString()}>
                <Image character={column} />
              </div>
            )
          })
        })}
        <BtnEvent />
 
      </div>
    </div>
  )
}
