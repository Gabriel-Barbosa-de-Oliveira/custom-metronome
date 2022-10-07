import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import ListItemButton from '@mui/material/ListItemButton';

import "./SimpleDialog.scss";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string) => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} className='dialog-container'>
      <img src={require('../../assets/img/logo-black.png')} alt="Logo" className='img-size'/>
      <DialogTitle>Fazer Login</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem >
          <ListItemButton>
            <ListItemText primary="Registrar" />
          </ListItemButton>
        </ListItem>
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemButton>
            <ListItemText primary="Entrar" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}