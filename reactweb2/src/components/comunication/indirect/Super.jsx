import React, {useState}from "react";
import Sub from "./Sub";

export default (props) => {

    const [label,setLabel] = useState("Valor")
    const [num,setNum] = useState(0)

    function quandoClicar(valorGerado, label) {

        setNum(valorGerado)     
        setLabel(label)    
    }
    return (
        <div>
            <h4> {label} : {num}</h4>
            <Sub onClick={quandoClicar}>  </Sub>
        </div>
    );
};
