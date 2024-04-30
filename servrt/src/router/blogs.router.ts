import express, { Request, Response, Router } from "express";
import { getConnection } from "../module/db";
import { title } from "process";

const routerBlog: Router = express.Router();

routerBlog.get("/usuario/:user", async (req: Request, res: Response) => {
  const user = req.params.user;
  const conection = await getConnection();
  try {
    const result = await conection.query(
      "SELECT * FROM blogs where user = ?;",
      [user]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(`error en la consulta`, error);

    res.status(500).json({ error: error });
  }
});
routerBlog.post("/usuario/:user", async (req: Request, res: Response) => {
  const user = req.params.user;
  console.log(req.body);
  
  const  title  = req.body.title;
  const blog = req.body.blog
  const time = new Date()
  const conection = await getConnection();
  try {
    const result = await conection.query(
      "INSERT INTO blogs (user,blog,time,title) VALUES (?,?,?,?);",
      [user,blog,time ,title ]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(`error en la consulta`, error);

    res.status(500).json({ error: error });
  }
});
routerBlog.delete("/blog/:id",async (req: Request, res: Response) => {
  const id = req.params.id;
  const conection = await getConnection();
  try {
     await conection.query(
      "DELETE FROM blogs where id=?;",
      [id ]
    );
    return res.status(200).json({message:"elimionado"});
  } catch (error) {
    console.log(`error en la consulta`, error);

    res.status(500).json({ error: error });
  }
})
routerBlog.get("/blog/:id",async (req: Request, res: Response) => {
  const id = req.params.id;
  const conection = await getConnection();
  try {
    const result = await conection.query(
      "SELECT *FROM blogs where id=?;",
      [id ]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(`error en la consulta`, error);

    res.status(500).json({ error: error });
  }
})
routerBlog.patch("/blog/:id",async (req: Request, res: Response) => {
  const id = req.params.id;
  const {blog,title} = req.body
  const conection = await getConnection();
  try {
    const result = await conection.query(
      "UPDATE blogs SET blog = ? , title = ? where id = ?;",
      [blog,title,id ]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(`error en la consulta`, error);

    res.status(500).json({ error: error });
  }
})
export default routerBlog;
