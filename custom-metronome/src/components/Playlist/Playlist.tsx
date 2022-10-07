import React, { Component } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { PlayArrow } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default class Playlist extends Component {
    render() {
        return (
            <Box sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper', color: "#000" }}>
                <h3>Listas de Reprodução</h3>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PlayArrow />
                                </ListItemIcon>
                                <ListItemText primary="Abecedário Ritmico" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemButton>
                                <ListItemIcon>
                                    <PlayArrow />
                                </ListItemIcon>
                                <ListItemText primary="Lista Personalizada" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem >
                            <ListItemButton>
                                <ListItemIcon>
                                    <AddCircleOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="Adicionar Nova Lista" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
        )
    }
}
