import express from "express";
import { usuario } from "./data/Mock";
import cors from "cors";

const app = express();

const PORT = 3000;


app.use(cors({
  origin: "http://localhost:5173",   // seu frontend Vite
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))


app.use(express.json()) 


app.use(express.json()) 


app.post("/EfetuarCadastro", (req, res) => {
  const { nome, idade, email, senha, confirmarSenha } = req.body;

  return res.status(200).json({
    'nome': nome,
    'idade': idade,
    'email': email,
    'senha': senha,
    'confirmarSenha': confirmarSenha,
  });
}); 



app.get("/listarUsuarios/:codigo", (req, res) => {
  const codigo = req.params.codigo;
  

  for (const user of usuario)  {
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