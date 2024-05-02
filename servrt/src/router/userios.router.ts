import express, { Request, Response, Router } from "express";
import { getConnection } from "../module/db";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const routerUser: Router = express.Router();

routerUser.post("/", async (req: Request, res: Response) => {
  const connection = await getConnection();
  const {  password } = req.body;
  console.log(req.body);
  const name = req.body.user

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(`Generated hashedPassword: ${hashedPassword}`);

    // Simplificar la consulta para buscar solo por nombre
    const userQuery = "SELECT * FROM usuarios WHERE name = ?";
    const [user] = await connection.query(userQuery, [name]);
    console.log(user);
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verifica si el hash de la base de datos coincide con el hash generado
    const dbHashedPassword = user.hashPassword; // Asegúrate de usar el nombre correcto de la columna
    const isPasswordMatch = await bcrypt.compare(password, dbHashedPassword);
    
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Emite el token JWT
    jwt.sign({ user: name, id: user.id }, "abaduna", (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Error al generar el token" });
      }
      res.json({ token: token });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

routerUser.post("/created", async (req: Request, res: Response) => {
  const connection = await getConnection();
  const {  password } = req.body;
 console.log(req.body);
 const name = req.body.user
 
  
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordToString = password;
    const hashedPassword = await bcrypt.hash(passwordToString, salt);

    console.log(`hashedPassword ${hashedPassword}`);

    const user = await connection.query(
      "INSERT INTO usuarios (name,hashPassword) values (?,?);",
      [name, hashedPassword]
    );
    jwt.sign({ user: name, id: 1 }, "abaduna", (err, token) => {
      res.json({ token: token });
      console.log(err);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});
routerUser.get("/user", async (req: Request, res: Response) => {
  const connection = await getConnection();
  const users = []
  try {
    const user = await connection.query("SELECT * FROM usuarios;");
    const onlyUsers = user.map((item) => item.name);
    res.status(200).json(onlyUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});
export default routerUser;
