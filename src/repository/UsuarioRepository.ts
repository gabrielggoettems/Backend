import { bancoDados } from "../database/pool";

export class UsuarioRepository {
  async validarNomeUsuario(nome: string): Promise<boolean> {
    const { rows } = await bancoDados.query(
      "select 1 from tb_usuario where nome = $1;",
      [nome],
    );

    return rows.length > 0;
  }

  async salvar(nome: string): Promise<void> {
    await bancoDados.query("insert into tb_usuario (nome) values ($1);", [
      nome,
    ]);
  }
}