import { Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import produtoRoutes from "./routes/ProductsRoute";
import "dotenv/config";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORTA ?? 3000;
const SENHA_JWT = process.env.SENHA_JWT ?? "easypc-dev-secret";

export function gerarToken(codigoUsuario: number) {
  const retorno = jwt.sign(
    {
      usuario: codigoUsuario,
    },
    SENHA_JWT,
    { expiresIn: "1h" },
  );

  return retorno;
}

export function validarToken(token: string) {
  try {
    const dados = jwt.verify(token, SENHA_JWT);

    return (
      typeof dados !== "string" &&
      typeof dados.usuario === "number" &&
      dados.usuario > 0
    );
  } catch (error) {
    return false;
  }
}

export function middleware(
  req: Request,
  res: Response,
  proximaFuncao: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : authorization;

  if (validarToken(token)) {
    proximaFuncao();
  } else {
    console.log("Autorização inválida");
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
}

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use("/produto", produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
