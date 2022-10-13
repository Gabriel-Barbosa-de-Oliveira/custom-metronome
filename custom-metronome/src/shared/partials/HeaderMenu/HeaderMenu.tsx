import React, { Component } from 'react'
import Button from '@mui/material/Button';

import "./HeaderMenu.scss";
import { ThemeProvider } from '@mui/material/styles';
import newTheme from '../../services/button-color-creator.service';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

export default class HeaderMenu extends Component<{}, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            right: false
        }
    }
    render() {
        const imgUrl: string = require("../../../assets/img/logo-black.png");

        const toggleDrawer =
            (anchor: string, open: boolean) =>
                (event: React.KeyboardEvent | React.MouseEvent) => {
                    if (
                        event.type === 'keydown' &&
                        ((event as React.KeyboardEvent).key === 'Tab' ||
                            (event as React.KeyboardEvent).key === 'Shift')
                    ) {
                        return;
                    }
                    this.setState({ right: open });
                };
        return (
            <>
                <header className='header-menu-container'>
                    <Button variant="text" color="primary" component={Link} to={"/"}><img src={imgUrl} alt="Logo" className='header-logo' /> </Button>
                    <section className='header-actions'>
                        <ThemeProvider theme={newTheme}>
                            {/* <Button variant="outlined" color="white" component={Link} to={"/metronome/"} id="start">Começar</Button> */}
                            <Button variant="outlined" color="primary" id="login" component={Link} to={"/login"}>Login</Button>
                            <IconButton onClick={toggleDrawer("right", true)} id="mobile-button">
                                <MenuIcon />
                            </IconButton>
                        </ThemeProvider>
                    </section>
                </header>
                <Drawer
                    anchor={"right"}
                    open={this.state.right}
                    onClose={toggleDrawer("right", false)}
                >
                    <List>
                        <ListItem>
                            <ListItemButton component={Link} to={"/login"}>
                                <ListItemText primary={"Login"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </>
        )
    }
}