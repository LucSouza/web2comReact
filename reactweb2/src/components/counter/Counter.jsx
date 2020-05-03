import React, { Component } from "react";
import "./Counter.css";
import Display from "./Display";
import StepForm from "./StepForm";
import Button from "./Button"


export default class Counter extends Component {
    // criando stado e pasando step local

    // state = {
    //     step: 1,
    //     valor: 0

    //  recebendo o step do app
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         passo: props.step,
    //         value: 0,
    //     };
    // }

    // recebendo o step do app, porem sem o construtor
    state = {
        step: this.props.step || 1,
        value: 0,
    };

    inc = () => {
        this.setState({ value: this.state.value + this.state.step });
    };

    dec = () => {
        this.setState({ value: this.state.value - this.state.step });
    };

    stepChange = (newStep) => {
        this.setState({
            step: newStep,
        });
    };

    render() {
        return (
            <div className="Counter">
                <h2> Contador </h2>
                <StepForm
                    step={this.state.step}
                    onStepChange={this.stepChange}
                />
                <Display value={this.state.value} />
                <Button onInc={this.inc} onDec={this.dec}></Button>
            </div>
        );
    }
}
