import { bancoDados } from "../database/pool";
import { IUser } from "../interfaces/User";

export async function buscaUsuarioPorNomeSenha(nome: string, senha: string): Promise<IUser> {
  const { rows } = await bancoDados.query(
    "select id_usuario from tb_usuario where nome = $1 and senha = $2;",
    [nome, senha],
  );

  return rows[0];
}

export async function buscaUsuarioPorCodigo(codigo: number) {
  const { rows } = await bancoDados.query(
    "select id_usuario from tb_usuario where id_usuario = $1;",
    [codigo],
  );

  return rows;
}
