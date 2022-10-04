import React, { Component } from 'react'
import { IPulseControllerControlObject } from '../../shared/interfaces/props/IPulseControllerControlObject';
import { IPulseControllerProps } from '../../shared/interfaces/props/IPulseControllerProps';
import { IPulseControllerState } from '../../shared/interfaces/states/IPulseController';
import "./PulseController.scss";
export default class PulseController extends Component<IPulseControllerProps, IPulseControllerState> {

    private dots: Array<JSX.Element> = [];
    constructor(props: IPulseControllerProps) {
        super(props);
        this.state = {
            beatsNumber: 4,
        };
        this.mountDots();
    }

    componentWillUpdate() {
        this.dots = [];
        this.mountDots()
    }

    mountDots() {

        // if (this.dots.length > 0) {
        //     this.dots = [];
        // }

        this.props.pulses.forEach((element, index) => {
            const classActive: string = element.isActive ? "active" : "";
            this.dots.push(<span onClick={() => this.handleItemClick(element, index)} className={`dot ${classActive}`} key={element.position} id={element.position.toString()}></span>);
        });
    }



    handleItemClick = (element: IPulseControllerControlObject, index: number) => {
        element.isActive = !element.isActive;
        const htmlItem = document.getElementById(element.position.toString())
        if (htmlItem) {
            if (element.isActive) {
                htmlItem.className = "dot active";
            } else {
                htmlItem.className = "dot";
            }
        }
    }


    render() {


        return (
            <div className='pulse-control-container'>
                {this.dots}
            </div>
        )
    }
}
