import "dotenv/config";
import jwt from "jsonwebtoken";

const SENHA_JWT =
  (process.env.SENHA_JWT ??
    (process.env.NODE_ENV === "production" ? "easypc-dev-secret" : "easypc-dev-secret")) as string;

export function gerarToken(codigoUsuario: number): string {
  return jwt.sign({ usuario: codigoUsuario }, SENHA_JWT, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
}

/** Retorna o código do usuário se o token for válido, ou null. */
export function validarToken(token: string): number | null {
  try {
    const dados = jwt.verify(token, SENHA_JWT, { algorithms: ["HS256"] });

    if (
      typeof dados !== "string" &&
      typeof dados.usuario === "number" &&
      dados.usuario > 0
    ) {
      return dados.usuario;
    }

    return null;
  } catch {
    return null;
  }
}