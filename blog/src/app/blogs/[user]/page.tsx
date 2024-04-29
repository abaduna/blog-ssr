import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import BtnDeletd from "@/app/component/Modificar/btnDeletd";

interface paramsProps {
    params: {
        user: string;
    };
}
export interface blogProps {
  id?:string
  user?:string
  blog:string
  time?:Date
  title:string
  
}
async function getBlogs (user:string) {
    const res = await fetch(`http://localhost:3001/api/blogs/usuario/${user}`)
    const data = await res.json()
    return data
}
const Page = async({params}:paramsProps) => {
  const data:blogProps[] = await getBlogs(params.user)
  console.log(data);
  
  return (
    < >
    <h1>Bienvenido al Blog de {params.user}</h1>
    {data.map((blog)=>(
      <div key={blog.id}>
        <p>{blog.title}</p>
        <p>{blog.blog}</p>
        <BtnDeletd/>
      </div>
    ))}
    </ >
  )
}

export default Page