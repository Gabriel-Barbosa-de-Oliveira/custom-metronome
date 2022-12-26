import React, { Component } from 'react'
import { IAuthenticator } from '../../interfaces/props/IAuthenticator'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Login from '../../../partials/Login/Login';
import NewUser from '../../../partials/NewUser/NewUser';

export default class AuthenticationCard extends Component<IAuthenticator, any> {


    render() {

        const login: JSX.Element = <Login onSignIn={this.props.onSignIn}/>

        const newUser: JSX.Element = <NewUser />

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
