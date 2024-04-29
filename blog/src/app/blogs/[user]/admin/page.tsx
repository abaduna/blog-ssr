"use client"
import { blogProps } from "../page";
import React, { FormEvent, useState } from 'react';
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
       postBlog(blog); 
    } catch (error) {
        console.log(error);
        
    }
   }
  return (
    <>
      <form onSubmit={(e)=>handlerPost(e)}>
      <input type="text" placeholder="title del post" onChange={e=> setTitleState(e.target.value)}/>
      <input type="text" placeholder="descripcion del post" onChange={e=> setBlog(e.target.value)}/>
      <button type="submit">Enviar</button>
      </form>
    </>
  );
}

export default Page;
