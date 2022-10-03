import React, { Component } from 'react'
import { IPulseController } from '../../shared/interfaces/IPulseController';
import "./PulseController.scss";
export default class PulseController extends Component<{}, IPulseController> {

    constructor(props: any) {
        super(props);
        this.state = {
            beatsNumber: 4 
        };
    }
    render() {
        let dots: Array<JSX.Element> = [];

        for (let index = 0; index < this.state.beatsNumber; index++) {
            dots.push(<span className="dot"></span>);
        }

        return (
            <div className='pulse-control-container'>
                {dots}
            </div>
        )
    }
}
