import React, { Component } from 'react'
import "./PulseController.scss";
export default class PulseController extends Component {
    render() {
        return (
            <div className='pulse-control-container'>
                <span className="dot"></span>
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        )
    }
}
