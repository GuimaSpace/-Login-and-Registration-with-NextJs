import { useState, useEffect } from "react"
import axios from "axios"
import { isExternalModule } from "typescript"
export default function Home(){

  const [username, setUsername ] = useState('')

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:8080/getUser"
    }).then(res => {setUsername(res.data.User_Name)}).catch(err => console.log(err))
  }

  return(
    <h1>Perfil logado: {username}</h1>
  )
}