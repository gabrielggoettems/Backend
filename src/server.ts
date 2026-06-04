import express from "express";
import cors from "cors";
import { dadosValidosDeLogin, usuario } from "./data/Mock";
import { CadastroInterface } from "./interfaces/Cadastro";
import { RetornoInterface } from "./interfaces/Retorno";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.post("/EfetuarCadastro", (req, res) => {
  const dados: CadastroInterface = req.body;

  const retorno: RetornoInterface = {
    sucesso: true,
    mensagem: "Cadastro efetuado com sucesso",
  };

  console.log(dados);

  return res.status(200).json(retorno);
});

app.post("/efetuarLogin", (req, res) => {
  const { user, senha } = req.body;

  if (
    user === dadosValidosDeLogin.User &&
    senha === dadosValidosDeLogin.Senha
  ) {
    return res.status(200).json({
      sucesso: true,
      mensagem: "Login realizado com sucesso",
    });
  }

  return res.status(401).json({
    sucesso: false,
    mensagem: "Credenciais inválidas",
  });
});

app.get("/listarUsuarios/:codigo", (req, res) => {
  const codigo = Number(req.params.codigo);

  const encontrado = usuario.find(
    (u) => u.codigo === codigo
  );

  if (encontrado) {
    return res.status(200).json(encontrado);
  }

  return res.status(404).json({
    sucesso: false,
    mensagem: "Usuário não encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});