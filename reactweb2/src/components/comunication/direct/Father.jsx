import React from "react";
import Son from "./Son";

export default (props) => 
    <div>
        <Son {...props}> <strong>João</strong> </Son>
        <Son surname={props.surname}> Maria </Son>
        <Son surname="Correa de Souza"> Lucas </Son>
    </div>

