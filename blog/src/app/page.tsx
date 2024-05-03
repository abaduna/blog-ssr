import { revalidatePath } from "next/cache";
import Link from "next/link";
import styles from "./page.module.css"
import Navbar from "@/component/navbar/Navbar";
interface user {
  user:string
}
const getUser =async()=>{
 
  revalidatePath(`/`)
  
  const res = await fetch("http://localhost:3001/api/login/user")
  const data = await res.json()
 
  
  return data
}
export default async function Home() {
  const data:user[] = await getUser()
  console.log(data);
  return (
    <div>
      <Navbar/>
      {data.map((user, i) => (
        <div key={i} className={styles.blogLinkContainer}> 
          <Link className={styles.blogLink} href={`/blogs/${user}`}>
           {user}
          </Link>
        </div>
      ))}
    </div>
  );
}
