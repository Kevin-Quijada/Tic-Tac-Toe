export function winnerModal() {
    if (winner === null) return null 

    const winnerText = winner === false ? 'empate': 'gano: ' + winner
    return(
        <section className='winner'>
            <div className='text'>
                <h2>{winnerText}</h2>
                  <header className='win'>
                    {winner && <Square>{winner}</Square>}
                  </header>
                  <footer><button onClick={resetGame}>empezar de nuevo</button></footer>
            </div>
        </section>
        )
    
}