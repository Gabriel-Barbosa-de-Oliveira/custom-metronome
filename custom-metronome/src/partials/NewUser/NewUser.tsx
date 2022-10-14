import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { Component } from 'react'
import { INewUser } from '../../shared/interfaces/states/INewUser';

export default class NewUser extends Component<{}, INewUser> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
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

        let { name, email, password } = this.state;


        return (
            <FormControl fullWidth sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: 16 }} variant="standard">
                <TextField id="name" label="Nome" variant="standard" value={name} onChange={(event) => {
                    this.handleInputChange(event, "name");
                }} />
                <TextField id="email" label="E-mail" variant="standard" value={email} onChange={(event) => {
                    this.handleInputChange(event, "email");
                }} />
                <TextField id="password" label="Senha" variant="standard" type={"password"} value={password} onChange={(event) => {
                    this.handleInputChange(event, "password");
                }}/>
            </FormControl>
        )
    }
}
