import React from "react";
import "./App.css";
import First from "./components/basics/First";
import WithParameter from "./components/basics/WithParameter";
import WithChildren from "./components/basics/WithChildren";
import Card from "./components/layout/Card";
import Repeat from "./components/basics/Repeat";
import Conditional from "./components/basics/Conditional";
import ConditionalWithIf from "./components/basics/ConditionalWithIf";
import Father from "./components/comunication/direct/Father";
import Super from "./components/comunication/indirect/Super";
import Input from "./components/form/Input";
import Counter from "./components/counter/Counter";
import Mega from "./components/megaSena/Mega"

export default (props) => (
    <div className="App">
        <h1>Fundamentos React</h1>
        <div className="Cards">
            <Card titulo="#11 - MegaSena" color="#92B06A">
                <Mega qtdeNumero={8}></Mega>
            </Card>
            <Card titulo="#10 - Contador" color="#DB3340">
                <Counter step={10}></Counter>
            </Card>
            <Card titulo="#09 - Input Form" color="#DB3340">
                <Input></Input>
            </Card>
            <Card titulo="#08 - Indirect Comunication" color="#000">
                <Super surname="Freitas"></Super>
            </Card>
            <Card titulo="#07 - Direct Comunication" color="#5A6A62">
                <Father surname="Freitas"></Father>
            </Card>
            <Card titulo="#06 - Condicional v2" color="#FA6900">
                <ConditionalWithIf numero={10}></ConditionalWithIf>
            </Card>
            <Card titulo="#05 - Condicional v1" color="#E94C6F ">
                <Conditional numero={11}></Conditional>
            </Card>
            <Card titulo="#04 - Repeticão" color="#A7DBDB">
                <Repeat />
            </Card>
            <Card titulo="#03 - Componente com Filhos" color="#DB3340">
                <WithChildren>
                    <ul>
                        <li>Ana</li>s<li>Bia</li>
                        <li>Carlos</li>
                        <li>Daniel</li>
                    </ul>
                </WithChildren>
            </Card>
            <Card titulo="#02 - Componente com Parametro" color="#75EB00">
                <WithParameter
                    titulo="esse é o titulo"
                    subtitulo="esse é o subtitulo"
                />
            </Card>
            <Card titulo="#01 - Primeiro Componente" color="#4298B5">
                <First />
            </Card>
        </div>
    </div>
);
