"use client";
import styles from "./update.module.css"
import { blogProps } from "@/app/blogs/[user]/page";
import { jwtDecode } from "jwt-decode";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
interface paramsProps {
  params: {
    id: string
    user:string
  };
}
export interface resultProps {
  user:string
  id:number
  iat:number
}
const Page = ({ params }: paramsProps) => {
  const [blog, setBlog] = useState<blogProps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [blogDescripction, setBlogDescripction] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const getBlog = async () => {
      
      const blogres = await fetch(
        `http://localhost:3001/api/blogs/blog/${params.id}`
      );

      const data = await blogres.json();
      console.log(data);
      
      setBlog(data);
    };
    getBlog();
  }, []);
  useEffect(() => {
    if (blog.length > 0) {
      setTitle(blog[0].title);
      console.log(title);

      setBlogDescripction(blog[0].blog);
    }
  }, [blog]);

  const update = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      blog: blogDescripction,
      title: title,
    };
    const rest = await fetch(
      `http://localhost:3001/api/blogs/blog/${params.id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    );
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const result:resultProps = jwtDecode(token);
        console.log(result);
        
      if (result.user !== params.user) {
        router.push("/");
      }
    }
  }, []);
  const DeletedBlog =()=>{
    
    fetch(`http://localhost:3001/api/blogs/blog/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    router.push("/");

  }
  return (
    <div className={styles.container}>
    <form onSubmit={update}>
      <h2 className={styles.formtitle}>Actualizar Blog</h2>
      <div className={styles.formgroup}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.forminput} // Aplicar la clase del archivo CSS
        />
      </div>
      <div className={styles.formgroup}>
        <label htmlFor="blog">Descripción</label>
        <input
          id="blog"
          value={blogDescripction}
          onChange={(e) => setBlogDescripction(e.target.value)}
          className={styles.forminput}
        />
      </div>
      <button className={styles.submitbutton}>Actualizar</button>
      
    </form>
    <br/>
    <button className={styles.delete} onClick={DeletedBlog}>Eliminar</button>
  </div>
  );
};

export default Page;
