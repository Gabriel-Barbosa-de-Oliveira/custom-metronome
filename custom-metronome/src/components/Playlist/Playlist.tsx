import React, { Component, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Delete, Edit, PlayArrow } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SimpleDialog } from '../../partials/Dialog/SimpleDialog';
import { Button, IconButton, ListItemButton, ThemeProvider } from '@mui/material';
import newTheme from '../../shared/services/button-color-creator.service';
import { useNavigate } from 'react-router-dom';
import { BackendService } from '../../services/backend/BackendService';
import { ToastrService } from '../../shared/services/Toastr.service';
import { findIndex } from 'lodash';
export default function Playlist() {

    const openControl: boolean = false;
    const userControl: any = null;
    const playlistsControl: Array<any> = [];

    const [open, setOpen] = useState<boolean>(openControl);
    const [user, setUser] = useState<any>(userControl);
    const [playlists, setPlaylists] = useState<any>(playlistsControl);
    const [listItems, setListItems] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = JSON.parse(getLoggedUser());
        if (loggedUser) {
            setUser(loggedUser);
            getPlaylists(loggedUser.id);
        }
    }, [])

    useEffect(() => {
        renderPlaylists();
    }, [playlists])

    async function getPlaylists(userId: string) {
        try {
            const data = await new BackendService().create("/playlists", { userId });
            setPlaylists(data);
        } catch {
            new ToastrService().notifyError("Não foi possível recuperar as playlists desse usuário !")
        }
    }


    function handleOpen(open: boolean) {
        setOpen(open);
    }


    function handleClick() {
        if (!user) {
            handleOpen(true)
        } else {
            navigate("/playlists");
        }
    }

    function getLoggedUser(): string {
        return sessionStorage.getItem("user") || "";
    }

    function deleteListItem(listId: string){
        const newPlaylists: Array<any> = playlists;
        const index = newPlaylists.findIndex((listItem: any) => listItem.id === listId);
        newPlaylists.splice(index, 1);
        setPlaylists(newPlaylists);
        renderPlaylists();
    }

    function renderPlaylists() {

        let newListItems: Array<JSX.Element> = [];

        playlists.forEach((element: any) => {
            newListItems.push(
                <div key={element.id} id={element.id}>
                    <ListItem>
                        <ThemeProvider theme={newTheme}>
                            <ListItemButton color='neutral'>
                                <ListItemIcon>
                                    <PlayArrow />
                                </ListItemIcon>
                                <ListItemText primary={element.name} />
                            </ListItemButton>

                            <ListItemIcon>
                                <IconButton aria-label="delete playlist" component="label" onClick={() => deleteListItem(element.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItemIcon>
                            <ListItemIcon>
                                <IconButton aria-label="edit playlist" component="label">
                                    <Edit />
                                </IconButton>
                            </ListItemIcon>
                        </ThemeProvider>
                    </ListItem>
                    <Divider />
                </div>
            )
        });

        setListItems(newListItems);

    }

    return (
        <>
            <h3>Listas de Reprodução</h3>
            <Box sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper', color: "#000", marginTop: 5 }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        {listItems}
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
