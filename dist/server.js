"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Mock_1 = require("./data/Mock");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // seu frontend Vite
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use(express_1.default.json());
app.post("/EfetuarCadastro", (req, res) => {
    const { userFrontend, idade, email, senha, confirmarSenha } = req.body;
    return res.status(200).json({
        'user': userFrontend,
        'idade': idade,
        'email': email,
        'senha': senha,
        'confirmarSenha': confirmarSenha,
    });
});
app.post("/efetuarLogin", (req, res) => {
    const { userFrontend, senha } = req.body;
    if (userFrontend != null && userFrontend == Mock_1.dadosValidos.User && senha != null && senha == Mock_1.dadosValidos.Senha) {
        return res.status(200).json({ message: "Login bem-sucedido" });
    }
    return res.status(401).json({ message: "Credenciais inválidas" });
    // Lógica de login aqui
});
app.get("/listarUsuarios/:codigo", (req, res) => {
    app.use(express_1.default.json());
    app.post("/EfetuarCadastro", (req, res) => {
        const { Nome, Senha } = req.body;
        if (Nome != null &&
            Nome === Mock_1.dadosValidos.User &&
            Senha != null &&
            Senha === Mock_1.dadosValidos.Senha) {
            return res.status(200).json("Cadastro efetuado com sucesso");
        }
        return res.status(401).json("Dados inválidos");
    });
    app.post("/listarUsuarios/:codigo", (req, res) => {
        const codigo = req.params.codigo;
        for (const user of Mock_1.usuario) {
            if (user.codigo === Number(codigo)) {
                return res.status(200).json(user);
            }
        }
        let encontrei;
        for (let busca of Mock_1.usuario) {
            if (busca.codigo === Number(codigo)) {
                encontrei = busca;
            }
            return res.status(404).json({ message: "Usuario não encontrado" });
        }
    });
    return res.status(404).json({
        message: "Usuário não encontrado",
    });
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
