import { revalidatePath } from "next/cache";
import Link from "next/link";

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
      
      {data && data.length > 0 && data.map((user,i)=>(
        <div key={i}>
          <Link  href={`/blogs/${user}`}>{` el blog de ${user}`}</Link>
        </div>

        
      ))}
    </div>
  );
}
