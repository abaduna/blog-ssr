"use client"
import styles from "./admin.module.css"
import { blogProps } from "../page";
import React, { FormEvent, useState } from 'react';
import actionPath from "@/action/cache";
interface paramsProps {
  params: {
    id: string;
  };
}
async function postBlog(blog: blogProps) {
  const rest = await fetch("http://localhost:3001/api/blogs/usuario/abaduna", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(blog),
  });

  const { data } = await rest.json();
  return data;
}
function Page({ params }: paramsProps) {
    const [blogState, setBlog] = useState<string>("");
    const [titleState, setTitleState] = useState<string>("");
  
   
   const handlerPost =(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
        const blog = {
    blog:blogState,
    title:titleState
  };
  actionPath()
       postBlog(blog); 
       
    } catch (error) {
        console.log(error);
        
    }
   }
  return (
    <>
      <form onSubmit={(e) => handlerPost(e)} className={styles.formContainer}>
      <input
        type="text"
        placeholder="Título del post"
        onChange={(e) => setTitleState(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Descripción del post"
        onChange={(e) => setBlog(e.target.value)}
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>
        Enviar
      </button>
    </form>
    </>
  );
}

export default Page;
