import { useState } from "react";
import axios from "axios"
export default function Login(){

    const [ LoginUsername, setLoginUsername] = useState('');
    const [ LoginPassword, SetLoginPassword] = useState('');

    const login = () =>{
        axios({
            method: "post",
            data: {
                username: LoginUsername,
                password: LoginPassword
            },
            withCredentials: true,
            url:"http://localhost:8080/login"
            }).then((res) => console.log("logado com sucesso")).catch((err) => console.log(err))
    }


    return(
        <div>
            <h1>Login</h1>
            <input type="text" name="username" placeholder="Seu Nome" onChange={e => setLoginUsername(e.target.value)}></input><br /><br />
            <input type="password" name="password" placeholder="Sua Senha" onChange={e => SetLoginPassword(e.target.value)} />
            <button onClick={login}>Registrar</button>
        </div>
    )
}