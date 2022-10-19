import React, { Component, useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SimpleDialog } from '../../partials/Dialog/SimpleDialog';
import { Button, IconButton, ThemeProvider } from '@mui/material';
import newTheme from '../../shared/services/button-color-creator.service';
import { useNavigate } from 'react-router-dom';
export default function Playlist() {


    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    
    function handleOpen(open: boolean){
        setOpen(open);
    }


    function handleClick(){
        if (!checkForLoggedUser()) {
            handleOpen(true)
        }else{
            navigate("/playlists");
        }
    }

    function checkForLoggedUser(){
        return sessionStorage.getItem("user");
    }

    return (
        <>
            <h3>Listas de Reprodução</h3>
            <Box sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper', color: "#000", marginTop: 5 }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <PlayArrow />
                            </ListItemIcon>
                            <ListItemText primary="Abecedário Ritmico" />
                            <ListItemText primary="Adicionado em: 18/10/22" />
                            <ListItemIcon>
                                <IconButton aria-label="delete playlist" component="label">
                                    <Delete />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemIcon>
                                <IconButton aria-label="edit playlist" component="label">
                                    <Edit />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <PlayArrow />
                            </ListItemIcon>
                            <ListItemText primary="Lista Personalizada" />
                            <ListItemText primary="Adicionado em: 18/10/22" />
                            <ListItemIcon>
                                <IconButton aria-label="delete playlist" component="label">
                                    <Delete />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemIcon>
                                <IconButton aria-label="edit playlist" component="label">
                                    <Edit />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem>
                            <ThemeProvider theme={newTheme}>
                                <Button variant='text' color='neutral' onClick={handleClick}>
                                    <ListItemIcon>
                                        <AddCircleOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Adicionar Nova Lista" />
                                </Button>
                            </ThemeProvider>
                        </ListItem>
                    </List>
                </nav>

                <SimpleDialog
                    open={open}
                    onClose={() => handleOpen(false)} />
            </Box></>
    )

}
