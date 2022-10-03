import { IconButton } from '@mui/material';
import { INumberController } from '../../interfaces/INumberController';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import './NumberController.scss'

export default function NumberController(props: INumberController) {

    function handleButtonClick (value: any) {
        if (props.onButtonClick) {
            props.onButtonClick(value);
        }
    }

    return (
        <section className='number-controller-container'>
            <IconButton color="primary" aria-label="decrease velocity" component="label" onClick={() => handleButtonClick("remove")} >
                <RemoveCircleOutlineIcon />
            </IconButton>
            <div className='component-container'>{props.component}</div>
            <IconButton color="primary" aria-label="raise velocity" component="label" onClick={() => handleButtonClick("add")}>
                <AddCircleOutlineIcon />
            </IconButton>
        </section>
    )
}
