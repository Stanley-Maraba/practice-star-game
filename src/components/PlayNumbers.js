import React from "react";

const PlayNumbers = props => (
    <button className="number"
            style = {{backgroundColor : colors[props.status]}}
            onClick={() =>props.onClickNumber(props.status,props.numbers)}
    >{props.numbers}
    </button>

);


const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};
export default PlayNumbers;