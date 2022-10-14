import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ILogin } from '../../shared/interfaces/states/ILogin'

export default class Login extends Component<{}, ILogin> {

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  handleInputChange = (event: any, inputType: string) => {
    const { value } = event.target;
    const newState: any = {};
    newState[inputType] = value;
    this.setState(newState);
  }

  render() {

    let { email, password } = this.state;

    return (
      <FormControl fullWidth sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: 16 }} variant="standard">
        <TextField id="email" label="E-mail" variant="standard" value={email} onChange={(event) => {
          this.handleInputChange(event, "email");
        }} />
        <TextField id="password" label="Senha" variant="standard" type={"password"} value={password} onChange={(event) => {
          this.handleInputChange(event, "password");
        }} />
        <footer className="authenticator-actions">
          <Button size="small" component={Link} to={"/metronome"}>Enviar</Button>
        </footer>
      </FormControl>
    )
  }
}
