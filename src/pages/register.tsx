import { useState } from "react";
import axios from "axios"

export default function Register(){

    const [ RegisterUsername, setRegisterUsername] = useState('');
    const [ RegisterPassword, SetRegisterPassword] = useState('');


    const register = () =>{
        axios({
        method: "post",
        data: {
            username: RegisterUsername,
            password: RegisterPassword
        },
        withCredentials: true,
        url:"http://localhost:8080/register"
        }).then((res) => console.log("Cadastrado com sucesso")).catch((err) => console.log(err))
    }

    return(
        <div>
            <h1>Registro</h1>
            <input type="text" name="username" placeholder="Seu Nome" onChange={e => setRegisterUsername(e.target.value)}></input><br /><br />
            <input type="password" name="password" placeholder="Sua Senha" onChange={e => SetRegisterPassword(e.target.value)} />
            <button onClick={register}>Registrar</button>
        </div>
    )
}