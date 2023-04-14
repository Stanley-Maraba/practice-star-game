import React, {useEffect, useState} from "react";
import utils from "../utils";
import StarsDisplay from "./StarsDisplay";
import PlayAgain from "./PlayAgain";
import PlayNumbers from "./PlayNumbers";

const Game = (props) => {

    const [stars, setStars] = useState(utils.random(1,9));
    const [availableNumbers, setAvailableNumbers] = useState(utils.range(1,9));
    const [candidateNumbers, setCandidateNumbers]  = useState([]);
    const [secondLeft, setSecondsLeft] = useState(13);
    const candidateWrong = utils.sum(candidateNumbers) > stars;


    useEffect(() => {

        if(secondLeft > 0  && availableNumbers.length > 0){
            const timerId = setTimeout(() => {
                setSecondsLeft(secondLeft - 1);
            },1000);
            return ()=> clearTimeout(timerId);
        }
    });

    const gameStatus = availableNumbers.length == 0 ? 'won'
        :   secondLeft === 0 ? 'lost' : 'playing';
    /*
    const endGame = () => {
      setStars(utils.random(1,9));
      setAvailableNumbers(utils.range(1,9));
      setCandidateNumbers([]);
       setSecondsLeft(13);
    }*/

    const onClickNumber = (status,number) => {
        if(status == 'used' || gameStatus != 'playing' ){

            return;
        }


        const newCandidateNumber =
            status === 'available' ?
                candidateNumbers.concat(number) :candidateNumbers.filter(num => num !== number);

        if (utils.sum(newCandidateNumber) !== stars ){
            setCandidateNumbers(newCandidateNumber);

        }


        else {
            const newAvailableNumber = availableNumbers.filter(
                n => !newCandidateNumber.includes(n)
            );


            //re draw  number of stars only playable stars
            setStars(utils.randomSumIn(newAvailableNumber,9));

            setAvailableNumbers(newAvailableNumber);
            setCandidateNumbers([]);

        }
    }






    const numberStatus = (numbers) => {

        if (!availableNumbers.includes(numbers)){


            return 'used';
        }
        if (candidateNumbers.includes(numbers)){
            return candidateWrong ? 'wrong' : 'candidate';
        }
        return 'available'

    }
    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">




                    {gameStatus !== 'playing' ? (<PlayAgain endGame={props.startNewGame} playingStatus={gameStatus}/>) :
                        (<StarsDisplay stars ={stars} /> )}





                </div>
                <div className="right">
                    {utils.range(1,9).map(numbers =>
                        <PlayNumbers
                            key={numbers}
                            numbers ={numbers}
                            status={numberStatus(numbers)}
                            onClickNumber={onClickNumber}/>
                    )}

                </div>
            </div>
            <div className="timer">Time Remaining: {secondLeft}</div>
        </div>
    );
};

export default Game;