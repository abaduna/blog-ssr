import express, { Request, Response } from "express";
import cors from 'cors'
import morgan from 'morgan'
const app = express();
const PORT = 3001;

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get("/greet", (req: Request, res: Response) => {
  res.send("Hello from TypeScript!");
});

import routerBlog from "./router/blogs.router";
app.use("/api/blogs", routerBlog)

import routerUser from "./router/userios.router";
app.use("/api/login",routerUser)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
