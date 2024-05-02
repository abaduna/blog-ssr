"use client"

import styles from "./styles.module.css"
import { revalidatePath } from "next/cache"
import { FormEvent, useState } from "react"
import actionPath from "../../../action/cache"
import { useRouter } from "next/navigation"
export interface UserProps  {
  user:string
    password:string
}
async function loginPost(user:UserProps) {
  actionPath
  const rest = await fetch("http://localhost:3001/api/login/created", {
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
  const router = useRouter()
    const handlerLogin =async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const dataProps:UserProps = {
          user,
          password
        }
        try {
         const token = await loginPost(dataProps)

         
         if (token) {

          
          localStorage.setItem("token", token.token);
          router.push(`/blogs/${user}`)
        } else {
          console.log('El token es indefinido.');
        }
         
        } catch (error) {
          console.log(error);
          
        }
        
    }
  return (
    <div className={styles.formContainer}>
      <h1>Registrate</h1>
        <form onSubmit={handlerLogin}>
            <input placeholder="usuario" onChange={e=>setUser(e.target.value)}/>
            <input placeholder="contraseña" type="password" onChange={e=>setPassword(e.target.value)}/>
            <button>Ingresar</button>
        </form>
    </div>
  )
}

export default Page