
import UpdateSPA from "@/component/Modificar/updateSPA";

import styles from "./list.module.css"

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
    <div className={styles.container}>
    <h1 className={styles.header}>Bienvenido al Blog de {params.user}</h1>
    <div className={styles.bloglist}>
      {data.map((blog) => (
        <div key={blog.id} className={styles.blogitem}>
          <p className={styles.blogtitle}>{blog.title}</p>
          <p className={styles.blogcontent}>{blog.blog}</p>
          
          <UpdateSPA propetario={params.user} id={blog.id}/>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Page