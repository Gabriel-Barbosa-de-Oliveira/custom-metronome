import Button from '@mui/material/Button';
import { Component } from 'react'
import "./Branding.scss"
import { ThemeProvider } from '@mui/material/styles';
import newTheme from '../../shared/services/button-color-creator.service';
import { Link } from 'react-router-dom';

export default class Branding extends Component {
    render() {

        const imgUrl: string = require("../../assets/img/example.jpeg");

        return (
            <>
                <section className='branding-container'>
                    <section className='branding-call'>
                        <h1>Estude ritmos com mais facilidade</h1>
                        <h3>Evolua, treine e controle com mais eficiência seus resultados</h3>
                        <section className='branding-actions'>
                            <ThemeProvider theme={newTheme}>
                                <Button variant="contained" color="primary" component={Link} to={"/metronome/"}>Acesse aqui</Button>
                            </ThemeProvider>
                        </section>
                    </section>
                    <section className='branding-image'>
                        <img src={imgUrl} alt="app photo" />
                    </section>
                </section>
            </>
        )
    }
}
