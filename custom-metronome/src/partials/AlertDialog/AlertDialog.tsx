import { SimpleDialogProps } from '../LoginDialog/LoginDialog';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export default function AlertDialog(props: SimpleDialogProps) {
    const { onClose, open } = props;

    const handleClose = (action?: string) => {
        onClose(action);
    };

    return (
        <Dialog onClose={() => handleClose} open={open}>
            <DialogTitle>Atenção !</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Esta ação não tem volta. Tem certeza que deseja executa-la ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancelar</Button>
                <Button onClick={() => handleClose("ok")} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
