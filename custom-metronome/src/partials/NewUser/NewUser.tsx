import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import React, { Component } from 'react'

export default class NewUser extends Component {
    render() {
        return (
            <FormControl fullWidth sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: 16 }} variant="standard">
                <TextField id="outlined-basic" label="Nome" variant="standard" />
                <TextField id="outlined-basic" label="E-mail" variant="standard" />
                <TextField id="outlined-basic" label="Senha" variant="standard" type={"password"} />
            </FormControl>
        )
    }
}
