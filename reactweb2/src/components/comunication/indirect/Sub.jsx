import React from "react";

export default (props) => {
    return (
        <div>
            <button onClick={() =>{
                props.onClick(Math.random(), "Valor gerado")
            }}> Alterar</button>
        </div>
    );
};
