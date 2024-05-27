const GameInfo = ({ mineCount, gameStatus }) => {
    const getStatusClass = () => {
        if(gameStatus === "You win!") return "win"
        if(gameStatus === "you Lost.") return 'lose'
        return ' '; 
    }

    return (
        <div className={`game-info ${getStatusClass()}`}>
            <span className="info">Mines remaining: {mineCount}</span>
            <h1 className="info">{gameStatus}</h1>
        </div>
    )
}

export default GameInfo 