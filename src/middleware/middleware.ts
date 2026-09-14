import { validarToken } from "../jwt/jwt";
import { Request, Response, NextFunction } from "express";


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