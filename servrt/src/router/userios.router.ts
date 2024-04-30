import express, { Request, Response, Router } from "express";
import { getConnection } from "../module/db";

import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
const routerUser: Router = express.Router();

routerUser.post('/', async (req: Request, res: Response) => {
    const connection = await getConnection()
    const { name, password } = req.body
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordToString = password
      const hashedPassword = await bcrypt.hash(passwordToString, salt);
  
      console.log(`hashedPassword ${hashedPassword}`)
  
      const user = await connection.query(
        'SELECT * FROM usuarios WHERE name = ? AND hashPassword = ? ;',
        [name, hashedPassword]
      )
      if (!user) {
        res.status(404).json({ message: "usuario no enontrado" })
      }
      jwt.sign({ user: name,id:1 }, 'abaduna', (err, token) => {
        res.json({ token: token })
        console.log(err);
        
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error })
    }
  })
  routerUser.post('/created', async (req: Request, res: Response) => {
    const connection = await getConnection()
    const { name, password } = req.body
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordToString = password
      const hashedPassword = await bcrypt.hash(passwordToString, salt);
  
      console.log(`hashedPassword ${hashedPassword}`)
  
      const user = await connection.query(
        'INSERT INTO usuarios (name,hashPassword) values (?,?);',
        [name, hashedPassword]
      )
      jwt.sign({ user: name,id:1 }, 'abaduna', (err, token) => {
        res.json({ token: token })
        console.log(err);
        
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error })
    }
  })
export default routerUser;