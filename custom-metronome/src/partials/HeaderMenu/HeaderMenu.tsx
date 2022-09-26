import React, { Component } from 'react'
import Button from '@mui/material/Button';

import "./HeaderMenu.scss";
import { ThemeProvider } from '@mui/material/styles';
import newTheme from '../../shared/services/button-color-creator.service';
import { Link } from 'react-router-dom';


export default class HeaderMenu extends Component {


    render() {
        const imgUrl: string = require("../../assets/img/logo-grey.png");

 

        return (
            <header className='header-menu-container'>
                <img src={imgUrl} alt="Logo" className='header-logo' />
                <section className='header-actions'>
                    <ThemeProvider theme={newTheme}>
                        <Button variant="outlined" color="neutral" component={Link} to={"/metronome/"}>Começar</Button>
                        <Button variant="outlined" color="neutral" disabled={true}>Login</Button>
                    </ThemeProvider>
                </section>
            </header>
        )
    }
}