import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Howl } from 'howler'
import { WINNER_COMBOS, turns } from './constants'
import { Square } from './components/Square'
import { checkWinner } from './board'
import { resetGamesStorage,saveGames } from './logic/storage'

function App() {
  // guardando la posiciones de las tablas con localStorage
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  // aqui guardamos de quien era el turno guardando la informacion en localStorage
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? turns.x
  })
  // null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null)
  
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)
    
    //reseteo importado del archivo /logic/storage/index.js

    resetGamesStorage()

    // reseteo si fuera de manera local en el archivo app.jsx
    // window.localStorage.removeItem('board')
    // window.localStorage.removeItem('turn')
  }

  const checkEndGame = (newBoard) => {
    //revisamos si hay empate
    //si no hay mas espacios vacios
    //en el tablero

    // newBoard = ['x', 'o', 'x', 'o', 'null', 'null', 'null', 'null', 'null', ]
    return newBoard.every((square) => square != null)
  }

  const updateBoard = (index) => {
    //no actualizamos esta posicion
    // si ya tiene algo
    if (board[index] || winner) return
    //actualizar el tablero
    const newBoard = [ ... board]
    newBoard[index] = turn
    setBoard(newBoard)

     console.log(setBoard)
    // cambiar el turno
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)
    //guardado importado del archivo /logic/storage/index.js

    saveGames({board: newBoard, turn:newTurn})

    // version local de guardado app.jsx//
    // window.localStorage.setItem('board', JSON.stringify(newBoard))
    // window.localStorage.setItem('turn', newTurn)


    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }


  }

  return (
    <>
      <main className='board'>
         <h1>Tic Tac Toe</h1>
         <button onClick={resetGame}>Resetear juego</button>
         <section className='game'>
          {
            board.map((square, index) => { //es square no se estaba utilizando anteriormente asi que se puso antiguamente un (_)
              //board.map((_, index) =>) //asi estaba anteriormente
              //el square es la posicion del cuadro
              return (
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {square}
                </Square>
              )
            })
          }
         </section>

         <section className='turn'>
            <Square isSelected={turn === turns.x}>
              {turns.x}
            </Square>

            <Square isSelected={turn === turns.o}>
              {turns.o}
            </Square>
         </section>

        <winnerModal></winnerModal>
      </main>
    </>
  )
}

export default App
