"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../module/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const routerUser = express_1.default.Router();
routerUser.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getConnection)();
    const { password } = req.body;
    console.log(req.body);
    const name = req.body.user;
    try {
        const saltRounds = 10;
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        console.log(`Generated hashedPassword: ${hashedPassword}`);
        // Simplificar la consulta para buscar solo por nombre
        const userQuery = "SELECT * FROM usuarios WHERE name = ?";
        const [user] = yield connection.query(userQuery, [name]);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        // Verifica si el hash de la base de datos coincide con el hash generado
        const dbHashedPassword = user.hashPassword; // Asegúrate de usar el nombre correcto de la columna
        const isPasswordMatch = yield bcrypt_1.default.compare(password, dbHashedPassword);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        // Emite el token JWT
        jsonwebtoken_1.default.sign({ user: name, id: user.id }, "abaduna", (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Error al generar el token" });
            }
            res.json({ token: token });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}));
routerUser.post("/created", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getConnection)();
    const { password } = req.body;
    console.log(req.body);
    const name = req.body.user;
    try {
        const saltRounds = 10;
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const passwordToString = password;
        const hashedPassword = yield bcrypt_1.default.hash(passwordToString, salt);
        console.log(`hashedPassword ${hashedPassword}`);
        const user = yield connection.query("INSERT INTO usuarios (name,hashPassword) values (?,?);", [name, hashedPassword]);
        jsonwebtoken_1.default.sign({ user: name, id: 1 }, "abaduna", (err, token) => {
            res.json({ token: token });
            console.log(err);
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}));
routerUser.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getConnection)();
    const users = [];
    try {
        const user = yield connection.query("SELECT * FROM usuarios;");
        const onlyUsers = user.map((item) => item.name);
        res.status(200).json(onlyUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}));
exports.default = routerUser;
//# sourceMappingURL=userios.router.js.map