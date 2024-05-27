import './App.css'
import React, {useState, useEffect} from 'react'
import GameInfo from './assets/components/GameInfo'
import Board from './assets/components/Board'
import Game from './assets/components/Game'
//import utilities

const Game = () => {
    const [height] = useState(8)
    const [width] = useState(10)
    const [mines] = useState(10)
    const [gameData, setGameData] = useState([])
    const [gameStatus, setGameStatus] = useState("Game in Progress")
    const [minCount, setMineCount] = useState(mines)
    const [key, setKey] = useState(false)


    //first, render the game board, plant mines, and store the initial state of the grid in our state variable

    useEffect(() => {
      setGameData(initgameData(height, width, mines))
    }, [height, width, mines, key])

    const initgameData = (height, width, mines) => {
      let data = createEmptyArray(height, width)
      data = plantMines(data, height, width, mines)
      data = getNeighborMines(data, height, width)
      return data
    }

    const revealBoard = () => {
      let updatedData = gameData.map(row => row.map(item => 
        ({...item, isRevealed: true})))
        setGameData(updatedData)
  
    }
 
    const revealEmpty = (y, x, data) => {
      let area = traverseBoard(x, y, data, height, width)         
      area.forEach(value => {
        if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
          data[value.y][value.x].isRevealed = true
          if (value.isEmpty) {
            revealEmpty(value.y, value.x, data)
          }
        }

      })      
      return data 
    }
   
    const handleClick = (y, x) => {
      if (gameData[y][x].isRevealed || gameData[y][x].isFlagged) return
      if (gameData[y][x],isMine) {
        setGameStatus("You Lost.")
        revealBoard()
        return
      }

      let updateData = [...gameData]
      upatedData[y][x].isFlagged =false
      updatedData[y][x].isFlagged = false
      if(updateData[y][x].isEmpty) {
        updatedData = revealEmplty(y, x, updatedData)
      }

        if (filterBoard(updateData, dataitem => !dataitem.isRevealed).length ===mines) {
          setMineCount(0)
          setGameStatus("You win!")
          revealBoard()
          return
        }
        setGameData(updatedData)
        setMineCount(mines - filterBoard(updateData, dataitem => !dataitem.isFlagged).length)
    }

    const handleContextMenu = (e, y, x) => {
      e.preventDefault()

      if(gameData[y][x].isRevealed) return
      let updatedata = [...gameData]
      let mines = setMineCount
      if(updatedData[y][x].isFlagged ) {
        updateData[y][x].isFlagged = false
        mines++
      } else {
        updatedData[y][x].isFlagged = true
        mines--
      } 
      if(mines === 0 ) {
        const mineArray = filterBoard(updatedData, dataitem => dataitem.isMine);
        const flagArray = filterBoard(updateData, dataitem => dataitem.isFlagged); 

        if(JSON.stringify(mineArray) ===JSON.stringify(flagArray)) {
          setMineCount(0)
          setGameStatus("You win!")
          revealBoard()
          return
        }
      }
      setGameData(updatedData)
      setMineCount(mines)
    }

    const resetGame = () => {
      setGameStatus("Game in progress")
      setKey(!key)
      setMineCount(mines)
    }

    return(
      <div className='game'>
        <Ga mineCount={mineCount} gameStatus={gameStatus}/>
        <Board data={gameData} handleCellClick={handleCellClick}/>
        <button className='reset-button' onClick={resetGame}>Reset</button>
      </div>
    )
  }

  export default Game 


