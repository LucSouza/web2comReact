import React, { useState } from "react";

export default (props) => {
    const [numbers, setNumbers] = useState(Array(props.qtdeNumero).fill(0));

    function generateNumbersNotContained(array) {
        const min = 1;
        const max = 60;

        const newNumber = parseInt(Math.random() * (max - min)) + 1;
        return array.includes(newNumber)
            ? generateNumbersNotContained(array)
            : newNumber;
    }
    function generateNumbers() {
        const newArray = Array(props.qtdeNumero)
            .fill(0)
            .reduce(a => [...a, generateNumbersNotContained(a)], [])
            .sort((a, b) => a - b);
        setNumbers([newArray]);
    }
    return (
        <div>
            <h3>Mega-Sena</h3>
            <h4>{numbers.join(" ")}</h4>
            <button onClick={generateNumbers}> Gerar Números</button>
        </div>
    );
};
