"use client";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import style from "./update.module.css"
import React, { useEffect, useState } from "react";
import { resultProps } from "@/app/blogs/[user]/admin/blog/[id]/page";
interface btnDeletd {
  propetario: string;
  id:string |undefined
}

const UpdateSPA = ({ propetario,id }: btnDeletd) => {
  const [isAdming, setIsAdming] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const result:resultProps = jwtDecode(token);
      console.log(result.user);
      console.log(propetario);
      if (result.user === propetario) {
        
        
        setIsAdming(true);
      }
    }
  }, []);
  const DeletedBlog =()=>{
    fetch(`http://localhost:3001/api/blogs/blog/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
  }
  return <>
  <div className={style.container}>
    {  isAdming ? <button onClick={DeletedBlog} className={style.btnDeletd}>Deleted</button> : ""}
  {isAdming ? <Link className={style.btnLink} href="/dashboard">Editar</Link> : ""}
  </div>
  
  </>;
};

export default UpdateSPA;
