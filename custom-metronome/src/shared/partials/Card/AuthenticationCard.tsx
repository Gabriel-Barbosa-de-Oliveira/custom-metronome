import React, { Component } from 'react'
import { IAuthenticator } from '../../interfaces/props/IAuthenticator'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export default class AuthenticationCard extends Component<IAuthenticator, any> {


    render() {

        const login: JSX.Element = (
            <FormControl fullWidth sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: 16 }} variant="standard">
                <TextField id="outlined-basic" label="E-mail" variant="standard" />
                <TextField id="outlined-basic" label="Senha" variant="standard" type={"password"} />
            </FormControl>
        );

        const newUser: JSX.Element = (
            <FormControl fullWidth sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: 16 }} variant="standard">
                <TextField id="outlined-basic" label="Nome" variant="standard" />
                <TextField id="outlined-basic" label="E-mail" variant="standard" />
                <TextField id="outlined-basic" label="Senha" variant="standard" type={"password"} />
            </FormControl>
        );

        const card: JSX.Element = (
            <React.Fragment>
                <CardContent>
                    <header className='header-container'>
                        <Button variant="text" color="primary" component={Link} to={"/"}><img src={require("../../../assets/img/logo-black.png")} alt="Logo" /></Button>
                    </header>
                    {
                        this.props.cardState === "login" ? login : newUser
                    }
                </CardContent>
                <footer className="authenticator-actions">
                    <Button size="small">Enviar</Button>
                </footer>
            </React.Fragment>
        );

        return (
            <section>
                <Box sx={{ minWidth: 300, minHeight: "auto" }}>
                    <Card variant="outlined">{card}</Card>
                </Box>
            </section>
        )
    }
}
