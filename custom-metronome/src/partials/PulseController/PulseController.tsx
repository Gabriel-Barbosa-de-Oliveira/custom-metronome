import React, { Component } from 'react'
import { IPulseControllerProps } from '../../shared/interfaces/props/IPulseControllerProps';
import { IPulseControllerState } from '../../shared/interfaces/states/IPulseController';
import "./PulseController.scss";
export default class PulseController extends Component<IPulseControllerProps, IPulseControllerState> {

    constructor(props: IPulseControllerProps) {
        super(props); 
        this.state = {
            beatsNumber: 4 
        };
    }
    render() {
        let dots: Array<JSX.Element> = []; 

        this.props.pulses.forEach(element => {
            const classActive: string = element.isActive ? "active" : "";
            dots.push(<span className={`dot ${classActive}`}></span>);
        });

        return (
            <div className='pulse-control-container'>
                {dots}
            </div>
        )
    }
}
