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
const routerBlog = express_1.default.Router();
routerBlog.get("/usuario/:user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.user;
    const conection = yield (0, db_1.getConnection)();
    try {
        const result = yield conection.query("SELECT * FROM blogs where user = ?;", [user]);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        res.status(500).json({ error: error });
    }
}));
routerBlog.post("/usuario/:user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.user;
    console.log(req.body);
    const title = req.body.title;
    const blog = req.body.blog;
    const time = new Date();
    const conection = yield (0, db_1.getConnection)();
    try {
        const result = yield conection.query("INSERT INTO blogs (user,blog,time,title) VALUES (?,?,?,?);", [user, blog, time, title]);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        res.status(500).json({ error: error });
    }
}));
routerBlog.delete("/blog/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const conection = yield (0, db_1.getConnection)();
    try {
        yield conection.query("DELETE FROM blogs where id=?;", [id]);
        return res.status(200).json({ message: "elimionado" });
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        res.status(500).json({ error: error });
    }
}));
routerBlog.get("/blog/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const conection = yield (0, db_1.getConnection)();
    try {
        const result = yield conection.query("SELECT *FROM blogs where id=?;", [id]);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        res.status(500).json({ error: error });
    }
}));
routerBlog.patch("/blog/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { blog, title } = req.body;
    const conection = yield (0, db_1.getConnection)();
    try {
        const result = yield conection.query("UPDATE blogs SET blog = ? , title = ? where id = ?;", [blog, title, id]);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        res.status(500).json({ error: error });
    }
}));
exports.default = routerBlog;
//# sourceMappingURL=blogs.router.js.map