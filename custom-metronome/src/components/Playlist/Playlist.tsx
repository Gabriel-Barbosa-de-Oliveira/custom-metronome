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
import { SimpleDialog } from '../../partials/Dialog/SimpleDialog';
export default class Playlist extends Component<{}, any> {



    constructor(props: any) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

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
                            <ListItemButton onClick={this.handleOpen}>
                                <ListItemIcon>
                                    <AddCircleOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="Adicionar Nova Lista" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>

                <SimpleDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </Box>
        )
    }
}
