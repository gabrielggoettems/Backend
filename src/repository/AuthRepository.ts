import { bancoDados } from "../database/pool";
import { IUser } from "../interfaces/User";

export interface NovoUsuario {
  nome: string;
  email: string;
  senhaHash: string;
  telefone: string;
  dataNascimento: string;
  tipoUsuario?: number;
}

export async function buscaUsuarioPorNome(
  nome: string,
): Promise<IUser | undefined> {
  const { rows } = await bancoDados.query<IUser>(
    "select id_usuario, tx_nome, tx_email, tx_senha, tx_telefone, dt_datanascimento, cd_tipousuario from tb_usuario where tx_nome = $1;",
    [nome],
  );

  return rows[0];
}

export async function buscaUsuarioPorEmail(
  email: string,
): Promise<{ id_usuario: number } | undefined> {
  const { rows } = await bancoDados.query(
    "select id_usuario from tb_usuario where tx_email = $1;",
    [email],
  );

  return rows[0];
}

export async function buscaUsuarioPorCodigo(
  codigo: number,
): Promise<{ id_usuario: number } | undefined> {
  const { rows } = await bancoDados.query(
    "select id_usuario from tb_usuario where id_usuario = $1;",
    [codigo],
  );

  return rows[0];
}

export async function cadastraUsuario(dados: NovoUsuario): Promise<number> {
  const { rows } = await bancoDados.query(
    `insert into tb_usuario
       (tx_nome, tx_email, tx_senha, tx_telefone, dt_datanascimento, cd_tipousuario)
     values ($1, $2, $3, $4, $5, $6)
     returning id_usuario;`,
    [
      dados.nome,
      dados.email,
      dados.senhaHash,
      dados.telefone,
      dados.dataNascimento,
      dados.tipoUsuario ?? 1,
    ],
  );

  return rows[0].id_usuario;
}