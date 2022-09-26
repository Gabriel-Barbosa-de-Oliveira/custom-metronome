import React, { Component } from 'react'
import Button from '@mui/material/Button';

import "./HeaderMenu.scss";
import { createTheme, ThemeProvider } from '@mui/material/styles';
export default class HeaderMenu extends Component {


    render() {
        const imgUrl: string = require("../assets/img/logo.png");

        const theme = createTheme({
            palette: {
                neutral: {
                    main: '#03bf34',
                    contrastText: '#fff',
                },
            },
        });

        return (
            <header className='header-menu-container'>
                <img src={imgUrl} alt="Logo" className='header-logo' />
                <section className='header-actions'>
                    <ThemeProvider theme={theme}>
                        <Button variant="outlined" color="neutral">Acessar</Button>
                        <Button variant="outlined" color="neutral" disabled={false}>Login</Button>
                    </ThemeProvider>
                </section>
            </header>
        )
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
    }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}