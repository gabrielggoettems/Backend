import express from "express";
import { dadosValidosDeLogin, usuario } from "./data/Mock";
import cors from "cors";
import { LoginInterface } from "./interfaces/login";
import { RetornoInterface } from "./interfaces/Retorno";

const app = express();

const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);


app.use(cors({
  origin: "http://localhost:5173",   
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))


app.use(express.json()) 


app.use(express.json()) 


app.post("/EfetuarCadastro", (req, res) => {
  const { user, idade, email, senha, confirmarSenha }:LoginInterface = req.body;

  return res.status(200).json({
    'user': user,
    'idade': idade,
    'email': email,
    'senha': senha,
    'confirmarSenha': confirmarSenha,
  });
}); 


app.post("/efetuarLogin", (frontend, res) => {
  const { user, senha  }:LoginInterface = frontend.body;
  
  const retorne:RetornoInterface = {
    mensagem: "Login bem-sucedido",
  }
  return res.status(200).json(retorne);

  if(user != null && user == dadosValidosDeLogin.User && senha != null && senha == dadosValidosDeLogin.Senha) {
    return res.status(200).json("Login bem-sucedido" );
  }
  return res.status(401).json( "Credenciais inválidas");
  
});

app.get("/listarUsuarios/:codigo", (req, res) => {

app.use(express.json());

app.post("/EfetuarCadastro", (req, res) => {
  const { Nome, Senha } = req.body;

  if (
    Nome != null &&
    Nome === dadosValidosDeLogin.User &&
    Senha != null &&
    Senha === dadosValidosDeLogin.Senha
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


  let encontrei;
  for(let busca of usuario) {
    if(busca.codigo === Number(codigo)) {
      encontrei = busca;
    }

  return res.status(404).json({ message: "Usuario não encontrado" });
}});

  return res.status(404).json({
    message: "Usuário não encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

