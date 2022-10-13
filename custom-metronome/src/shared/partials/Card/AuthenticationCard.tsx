import React, { Component } from 'react'
import { IAuthenticator } from '../../interfaces/props/IAuthenticator'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
                        <img src={require("../../../assets/img/logo-black.png")} alt="Logo"/>
                    </header>
                    {
                        this.props.cardState === "login" ? login : newUser
                    }
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
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
