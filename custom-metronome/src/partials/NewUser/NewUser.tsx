import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BackendService } from '../../services/backend/BackendService';
import { v4 as uuidv4 } from 'uuid';

export default function NewUser() {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const backendService: BackendService = new BackendService();
    const navigate = useNavigate();

    function handleNameChange(event: any) {
        const { value } = event.target;
        setName(value);
    }
    function handleEmailChange(event: any) {
        const { value } = event.target;
        setEmail(value);
    }

    function handlePasswordChange(event: any) {
        const { value } = event.target;
        setPassword(value);
    }


    function checkFilledForm() {
        return name && email && password;
    }

    function submit() {

        if (checkFilledForm()) {
            postNewUser();
        } else {
            notifyWarn("Por favor, preencha todos os campos");
        }
    }

    async function postNewUser() {
        try {
            const data  = await backendService.create("/users", { name, email, password });
            createNewUserData(data)
        } catch (error) {
            notifyError("Erro ao criar novo usuário !");
        }
    }

    async function createNewUserData(data: any) {
        try {
            await backendService.create("/data", {
                id: uuidv4(),
                userId: data.user.id,
                "lastVelocityUsed": 60,
                "velocities": [
                    60
                ]
            })

            notifySuccess("Usuário criado com sucesso !");
            navigate("/login");
        } catch {
            notifyError("Erro ao criar dados do usuário !");
        }
    }

    function notifyWarn(message: string): void {
        toast.warning(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }

    function notifyError(message: string): void {
        toast.error(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }

    function notifySuccess(message: string): void {
        toast.success(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }



    return (
        <FormControl fullWidth sx={{ display: "grid", gridTemplateColumns: "1fr", gridGap: 16 }} variant="standard">
            <TextField id="name" label="Nome" variant="standard" value={name} onChange={(event) => {
                handleNameChange(event);
            }} />
            <TextField id="email" label="E-mail" variant="standard" value={email} onChange={(event) => {
                handleEmailChange(event);
            }} />
            <TextField id="password" label="Senha" variant="standard" type={"password"} value={password} onChange={(event) => {
                handlePasswordChange(event);
            }} />
            <footer className="authenticator-actions">
                <Button size="small" onClick={() => submit()}>Enviar</Button>
            </footer>
        </FormControl>

    )
}


