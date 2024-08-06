export const saveGames = ({board, turn}) => {
    // guarda aqui la partida 
    window.localStorage.setItem ('board' , JSON.stringify(board))
    window.localStorage.setItem ('turn', turn)
}

export const resetGamesStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}