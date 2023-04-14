import React from "react";

const PlayAgain = props => (
    <div className = "game-done">
        <div className = "message">
            {props.playingStatus === 'lost' ?  'TOO BAD MY BOY' : 'HABIBI WIN'}
        </div>
        <button className="playAgain" onClick={props.endGame}>habibi </button>
    </div>
)

export default PlayAgain;