import express from "express";
import { dadosValidos, usuario } from "./data/Mock";
import cors from "cors";

const app = express();

const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.post("/EfetuarCadastro", (req, res) => {
  const { Nome, Senha } = req.body;

  if (
    Nome != null &&
    Nome === dadosValidos.User &&
    Senha != null &&
    Senha === dadosValidos.Senha
  ) {
    return res.status(200).json("Cadastro efetuado com sucesso");
  }

  return res.status(401).json("Dados inválidos");
});

app.post("/listarUsuarios/:codigo", (req, res) => {
  const codigo = req.params.codigo;

  for (const user of usuario) {
    if (user.codigo === Number(codigo)) {
      return res.status(200).json(user);
    }
  }

  return res.status(404).json({
    message: "Usuário não encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
