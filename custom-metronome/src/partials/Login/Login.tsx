import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <FormControl fullWidth sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: 16 }} variant="standard">
        <TextField id="email" label="E-mail" variant="standard" />
        <TextField id="password" label="Senha" variant="standard" type={"password"} />
      </FormControl>
    )
  }
}
