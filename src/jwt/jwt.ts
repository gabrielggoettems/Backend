import "dotenv/config";
import jwt from "jsonwebtoken";

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

