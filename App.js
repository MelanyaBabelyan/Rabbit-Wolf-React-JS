import "./App.css"
import React from "react"
import { ReactDOM } from "react" 
import { useState } from "react"

const options = [
  { id: 1, value: 5, text: "5x5" },
  { id: 2, value: 7, text: "7x7" },
  { id: 3, value: 10, text: "10x10" },
]

const FREE_CELL = 0
const RABBIT = "Rabbit"
const WOLF = "wOLF"
const FENCE = 3
const HOME = "Home"

// const X = 0
// const Y = 1

const ValueSizeArray = [5, 7, 10]

let boardNumber = 0

const IMAGES = {
  [RABBIT]: "img/rabbit.gif",
  [WOLF]: "img/gamewolf.png",
  [FENCE]: "img/ban.png",
  [HOME]: "img/home.png",
}

function Image(props) {
  if (props.character === RABBIT) {
    const image = IMAGES[RABBIT]
    return <img src={image} />
  }
  if (props.character === WOLF) {
    const image = IMAGES[WOLF]
    return <img src={image} />
  }
  if (props.character === FENCE) {
    const image = IMAGES[FENCE]
    return <img src={image} />
  }
  if (props.character === HOME) {
    const image = IMAGES[HOME]
    return <img src={image} />
  }
}
function findCordinateCharacter(array, character) {
  const findeMtrix = function(accumulator, row, x) {
    row.forEach((cell, y) => {
      if (cell === character) {
        accumulator.push([x, y])
      }
    })
    return accumulator
  }
  return array.reduce(findeMtrix, [])
}

function changeGameStatus(gameState, status) {
  gameState.gameOver = true
  gameState.gameResult = status
  console.log(status)
}

const newGame = ReactDOM.createRoot(document.getElementById("newGame"))
const container = ReactDOM.createRoot(document.getElementById("container"))

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

function rabbitGoTo(gameState, rabbitIndex, x, y) {
  const [i, j] = rabbitIndex

  if (gameState[x][y] === FREE_CELL) {
    gameState[x][y] = RABBIT
    gameState[i][j] = FREE_CELL
    console.log(gameState)
  }
  if (gameState[x][y] === HOME) {
    changeGameStatus(gameState, "win")
    return
  }

  if (gameState[x][y] === WOLF) {
    changeGameStatus(gameState, "gameOver")
    return
  }
}

function getDirectionCoord(gameMatrix, rabbitIndex, eventKey) {
  let [x, y] = rabbitIndex
  let newX = x
  let newY = y
  const arraySize = gameMatrix.length - 1
  if (eventKey === "ArrowRight") {
    newY = y + 1
    if (y === arraySize) {
      newY = 0
    }
  } else if (eventKey === "ArrowLeft") {
    newY = y - 1
    if (y === 0) {
      newY = arraySize
    }
  } else if (eventKey === "ArrowUp") {
    newX = x - 1
    if (x === 0) {
      newX = arraySize
    }
  } else if (eventKey === "ArrowDown") {
    newX = x + 1
    if (x === arraySize) {
      newX = 0
    }
  }
  return [newX, newY]
}
function EventKeysFunctions(props) {
  const gameMatrix = props.array.gameMatrix
  console.log(gameMatrix)
  const key = props.eventKey
  const rabbitIndex = findCordinateCharacter(gameMatrix, RABBIT)[0]
  const [newX, newY] = getDirectionCoord(gameMatrix, rabbitIndex, key)
  rabbitGoTo(gameMatrix, rabbitIndex, newX, newY)
  const [x, y] = rabbitIndex

  return gameMatrix
}

function BtnEvent(props) {
  const gameState = props.state.gameMatrix
  return (
    <div id="btnEvent" className="btnEvent">
      <button
        id="up"
        className="up"
        onClick={() => {
          props.newSituation(
            <EventKeysFunctions array={gameState} eventKey="up" />
          )
        }}
      >
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
  let select = document.getElementById("select")
  const value = select.value
  const styleObject = {
    width: value * 80 + 100 + "px",
  }
  const array = CreateMatrix(value)

  const gameState = {
    gameMatrix: array,
    gameOver: false,
    gameResult: "",
    gamNumber: boardNumber,
  }
  DefineAtributes(gameState, value)
  const gameArray = gameState.gameMatrix
  const [now, setNew] = useState(gameState)
  return (
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
      <BtnEvent state={gameState} newSituation={setNew} />
    </div>
  )
}

function SelectAndStartButton() {
  const handleClick = () => {
    // ;<StartNewGame />
  }
  return (
    <div>
      <button id="start" className="start" onClick={handleClick}>
        Start
      </button>
      <select className="select" id="select">
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          )
        })}
      </select>
    </div>
  )
}

// function SelectAndStartButton() {
//   return (
//     <div>
//       <button
//         id="start"
//         className="start"
//         onClick={(eventt) => {
//           newGame.render(<StartNewGame />)
//         }}
//       >
//         Start
//       </button>
//       <select className="select" id="select">
//         {options.map((item) => {
//           return (
//             <option key={item.value} value={item.value}>
//               {item.text}
//             </option>
//           )
//         })}
//       </select>
//     </div>
//   )
// }

function App() {
  return (
    <div className={"App"}>
      <button
        id="newBoardButton"
        onClick={(evt) => {
          {
            container.render(<SelectAndStartButton />)
          }
        }}
      >
        New Board
      </button>
    </div>
  )
}
export default App
