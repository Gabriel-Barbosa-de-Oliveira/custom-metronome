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
import { IUser } from '../../interfaces/context/User.interface';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuthContext } from '../../context/authContext';
import { BackendService } from '../../../services/backend/BackendService';
import { ToastrService } from '../../services/Toastr.service';
export default class HeaderMenu extends Component<{ user?: IUser | null }, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            right: false,
            user: props.user,
            open: false,
            anchorEl: null
        }
    }

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ anchorEl: event.currentTarget, open: Boolean(event.currentTarget) });
    };
    handleClose = () => {
        this.logOut();
        this.setState({ anchorEl: null, open: false });
    };

    componentDidMount(): void {
        const sessionUser = this.checkUserFromSessionStorage();
        if (!this.props.user && sessionUser) {
            this.setState({
                user: sessionUser
            })
        }
    }

    checkUserFromSessionStorage() {
        const user = sessionStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }

    componentWillReceiveProps(nextProps: Readonly<{ user: IUser | null; }>): void {
        this.setState({ user: nextProps.user });
    }

    logOut() {
        // signOutEndpoint();
        try {
            // await new BackendService().create("/session/logout", this.state.user);
            // this.state.signOut();
            this.setState({user: null})
            sessionStorage.removeItem("user")
            new ToastrService().notifySuccess("Usuário deslogado com sucesso");
        } catch {
            new ToastrService().notifyError("Erro ao deslogar o usuário !");
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
                            {
                                !this.state.user ? (<>
                                    <Button variant="contained" color="primary" id="new-user" component={Link} to={"/new-user"}>Cadastre-se</Button>
                                    <Button variant="outlined" color="primary" id="login" component={Link} to={"/login"}>Entrar</Button></>) :
                                    <Button variant="outlined"
                                        aria-controls={this.state.open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={this.state.open ? 'true' : undefined}
                                        onClick={this.handleClick}
                                        startIcon={<AccountCircleIcon />}>
                                        {this.state.user?.name}
                                    </Button>
                            }
                            <Menu
                                id="basic-menu"
                                anchorEl={this.state.anchorEl}
                                open={this.state.open}
                                onClose={this.handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                            </Menu>
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
                    <List >
                        <ListItem>
                            <ListItemButton component={Link} to={"/new-user"}>
                                <ListItemText primary={"Cadastre-se"} />
                            </ListItemButton>

                        </ListItem>
                        <Divider />
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