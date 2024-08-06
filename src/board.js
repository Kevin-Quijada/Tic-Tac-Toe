import { WINNER_COMBOS } from "./constants"

 export const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si gano la X u O
    for  (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //por si no hay ganador
    return null
}
