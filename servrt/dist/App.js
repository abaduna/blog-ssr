"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/greet", (req, res) => {
    res.send("Hello from TypeScript!");
});
const blogs_router_1 = __importDefault(require("./router/blogs.router"));
app.use("/api/blogs", blogs_router_1.default);
const userios_router_1 = __importDefault(require("./router/userios.router"));
app.use("/api/login", userios_router_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=App.js.map