"use client"


import { FormEvent, useState } from "react"

export interface UserProps  {
    user:string
    password:string
}
function loginPost(user:UserProps) {
    const res = await fetch(`http://localhost:3001/api/login/`)
    const data = await res.json()
    return data
}
function Page() {
  const [user,setUser]= useState<string>("")
  const [password,setPassword]= useState<string>("")

    const handlerLogin =async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = {
          name:user,
          password
        }
        try {
         const token = await 
         if (token) {
          console.log(token.data.token);
          
          localStorage.setItem("token", token.data.token);
        } else {
          console.log('El token es indefinido.');
        }
          // localStorage.setItem("token",token)
          
        } catch (error) {
          console.log(error);
          
        }
        
    }
  return (
    <div>
        <form onSubmit={handlerLogin}>
            <input placeholder="usuario" onChange={e=>setUser(e.target.value)}/>
            <input placeholder="contraseña" type="password" onChange={e=>setPassword(e.target.value)}/>
            <button>Ingresar</button>
        </form>
    </div>
  )
}

export default Page