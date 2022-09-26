import React, { Component } from 'react'
import Button from '@mui/material/Button';

import "./HeaderMenu.scss";
import { ThemeProvider } from '@mui/material/styles';
import newTheme from '../../shared/services/button-color-creator.service';


export default class HeaderMenu extends Component {


    render() {
        const imgUrl: string = require("../../assets/img/logo.png");

 

        return (
            <header className='header-menu-container'>
                <img src={imgUrl} alt="Logo" className='header-logo' />
                <section className='header-actions'>
                    <ThemeProvider theme={newTheme}>
                        <Button variant="outlined" color="neutral">Acessar</Button>
                        <Button variant="outlined" color="neutral" disabled={true}>Login</Button>
                    </ThemeProvider>
                </section>
            </header>
        )
    }
}