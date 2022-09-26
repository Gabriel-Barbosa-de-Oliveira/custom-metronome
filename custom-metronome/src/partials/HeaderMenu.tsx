import React, { Component } from 'react'
import "./HeaderMenu.scss";
export default class HeaderMenu extends Component {


    render() {
        const imgUrl: string = require("../assets/img/logo.png");

        return (
            <header className='header-menu-container'>

                <img src={imgUrl} alt="Logo" className='header-logo' />

            </header>
        )
    }
}
