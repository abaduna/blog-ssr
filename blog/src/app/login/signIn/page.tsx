"use client"


import { FormEvent, useState } from "react"

export interface UserProps  {
    user:string
    password:string
}
async function loginPost(user:UserProps) {
  const rest = await fetch("http://localhost:3001/api/login/", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  });

  const data = await rest.json();
  return data;
}
function Page() {
  const [user,setUser]= useState<string>("")
  const [password,setPassword]= useState<string>("")

    const handlerLogin =async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data:UserProps = {
          user:user,
          password
        }
        try {
         const token = await loginPost(data)
         console.log(token);
         
         if (token) {
          console.log(token);
          
          localStorage.setItem("token", token.token);
        } else {
          console.log('El token es indefinido.');
        }
         
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