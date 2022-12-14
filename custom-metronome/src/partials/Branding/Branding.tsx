import Button from '@mui/material/Button';
import { Component } from 'react'
import "./Branding.scss"
import { ThemeProvider } from '@mui/material/styles';
import newTheme from '../../shared/services/button-color-creator.service';
import { Link } from 'react-router-dom';
import Timer from '../../shared/services/timer';

export default class Branding extends Component<{}, any> {

    render() {
        const imgUrl: string = require("../../assets/img/example.jpeg");
        return (
            <>
                <section className='presentation-container'>
                    <h1>Evolua sua prática com <br /><span id="brandingWord"></span></h1>
                    <h3 className='sub-text'>O metronomo mais versátil. <br />Acessivel diretamente do seu navegador </h3>
                    <div className='branding-actions'>
                        <ThemeProvider theme={newTheme}>
                            <Button variant="contained" color="primary" component={Link} to={"/metronome/"}>Comece aqui</Button>
                        </ThemeProvider>
                    </div>
                    <section className='branding-image'>
                        <img src={imgUrl} alt="app photo" />
                    </section>
                </section>
            </>
        )
    }
}
