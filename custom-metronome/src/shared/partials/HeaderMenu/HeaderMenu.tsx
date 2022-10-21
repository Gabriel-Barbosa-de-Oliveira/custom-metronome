import React, { Component, useEffect, useState } from 'react'
import Button from '@mui/material/Button';

import "./HeaderMenu.scss";
import { ThemeProvider } from '@mui/material/styles';
import newTheme from '../../services/button-color-creator.service';
import { Link, useNavigate } from 'react-router-dom';
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
import { BackendService } from '../../../services/backend/BackendService';
import { ToastrService } from '../../services/Toastr.service';
export default function HeaderMenu() {
    
    
    const [right, setRight] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<any>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const sessionUser = checkUserFromSessionStorage();
        setUser(sessionUser)
    }, []);


    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
        setOpen(Boolean(event.currentTarget));
    };

    function handleClose() {
        console.log("chamou")
        logOut();
 
    };


    function checkUserFromSessionStorage() {
        const user = sessionStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }

    async function logOut() {
        // signOutEndpoint();
        try {
            await new BackendService().create("/session/logout", user);
            setAnchorEl(null);
            setOpen(false);
            sessionStorage.removeItem("user")
            setUser(null);
            new ToastrService().notifySuccess("Usuário deslogado com sucesso");
            navigate("/");
        } catch {
            new ToastrService().notifyError("Erro ao deslogar o usuário !");
        }
    }




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
                setRight(open);
            };


    return (
        <>
            <header className='header-menu-container'>
                <Button variant="text" color="primary" component={Link} to={"/"}><img src={imgUrl} alt="Logo" className='header-logo' /> </Button>
                <section className='header-actions'>
                    <ThemeProvider theme={newTheme}>
                        {
                            !user ? (<>
                                <Button variant="contained" color="primary" id="new-user" component={Link} to={"/new-user"}>Cadastre-se</Button>
                                <Button variant="outlined" color="primary" id="login" component={Link} to={"/login"}>Entrar</Button></>) :
                                <Button variant="outlined" id="user"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    startIcon={<AccountCircleIcon />}>
                                    {user.name}
                                </Button>
                        }
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Sair</MenuItem>
                        </Menu>
                        <IconButton onClick={toggleDrawer("right", true)} id="mobile-button">
                            <MenuIcon />
                        </IconButton>
                    </ThemeProvider>
                </section>
            </header>
            <Drawer
                anchor={"right"}
                open={right}
                onClose={toggleDrawer("right", false)}

            >
                <List >
                    {
                        !user ? <>
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
                        </> :
                            <>
                                <ListItemButton>
                                    <div className='user-icon-container'>
                                        <AccountCircleIcon />
                                        <ListItemText primary={user.name} />
                                    </div>
                                </ListItemButton>
                                <Divider />
                                <ListItemButton component={Link} to={"/"}>
                                    <ListItemText primary={"Home"} />
                                </ListItemButton>
                                <ListItemButton component={Link} to={"/metronome"}>
                                    <ListItemText primary={"Metronomo"} />
                                </ListItemButton>
                                <Divider />
                                <ListItemButton onClick={handleClose}>
                                    <ListItemText primary={"Sair"} />
                                </ListItemButton>
                            </>
                    }
                </List>
            </Drawer>
        </>
    )
}

