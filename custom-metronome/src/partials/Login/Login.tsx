import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackendService } from '../../services/backend/BackendService';
import { ToastrService } from '../../shared/services/Toastr.service';
import { ILoginScreenProps } from '../../shared/interfaces/props/ILogin';
import { IUser } from '../../shared/interfaces/context/User.interface';

export default function Login(props: ILoginScreenProps) {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const backendService: BackendService = new BackendService();
  const toastrService: ToastrService = new ToastrService();
  const navigate = useNavigate();

  function checkFilledForm() {
    return password && email;
  }

  function submit() {

    if (checkFilledForm()) {
      createUserSession();
    } else {
      toastrService.notifyWarn("Por favor, preencha todos os campos");
    }
  }

  async function createUserSession() {
    try {
      const data  = await backendService.create("/login", { email, password });
      if (props.onSignIn) props.onSignIn(data);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      toastrService.notifySuccess("Login realizado com sucesso !");
      navigate("/metronome");
    } catch {
      toastrService.notifyError("Usuário não encontrado !");
    }
  }

  return (
    <FormControl fullWidth sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: 16 }} variant="standard">
      <TextField id="email" label="E-mail" variant="standard" value={email} onChange={(event) => {
        setEmail(event.target.value)
      }} />
      <TextField id="password" label="Senha" variant="standard" type={"password"} value={password} onChange={(event) => {
        setPassword(event.target.value)
      }} />
      <footer className="authenticator-actions">
        <Button size="small" onClick={() => submit()}>Enviar</Button>
      </footer>
    </FormControl>
  )

}
