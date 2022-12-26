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
import { useNavigate } from 'react-router-dom';

export interface SimpleDialogProps {
  open: boolean;
  inputData?: any;
  onClose: (action?: string) => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <Dialog onClose={handleClose} open={open} className='dialog-container'>
      <img src={require('../../assets/img/logo-black.png')} alt="Logo" className='img-size' />
      <DialogTitle>Fazer Login</DialogTitle>
      <List sx={{ pt: 0, display: 'grid', justifyItems: 'left', gridTemplateColumns: "1fr", padding: 2, width: 100 }}>
        <ListItemButton onClick={() => handleListItemClick("/new-user")}>
          <ListItemText primary="Registrar" />
        </ListItemButton>
        <ListItemButton onClick={() => handleListItemClick("/login")}>
          <ListItemText primary="Entrar" />
        </ListItemButton>
      </List>
    </Dialog>
  );
}