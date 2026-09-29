import { bancoDados } from "../database/pool";
import { IUsuario } from "../model/iUsuario";

export class UsuarioRepository {
  async validarNomeUsuario(nome: string): Promise<boolean> {
    const { rows } = await bancoDados.query(
      "select 1 from tb_usuario where nome = $1;",
      [nome],
    );

    return rows.length > 0;
  }
  async salvar(dados: IUsuario): Promise<void> {
    const retorno = await bancoDados.query(
      `insert into tb_usuario
       (tx_nome, tx_email, tx_senha, tx_telefone, dt_datanascimento, cd_tipousuario)
      values ($1, $2, $3, $4, $5, $6)
      returning cd_usuario;`,
      [
        dados.tx_nome,
        dados.tx_email,
        dados.tx_senha,
        dados.tx_telefone,
        dados.dt_datanascimento,
        dados.cd_tipousuario,
      ],
    );

    return retorno.rows[0].cd_usuario;
  }

  async atualizar(id: number, nome: string): Promise<boolean> {
    const resultado = await bancoDados.query(
      "update tb_usuario set nome = $1 where id_usuario = $2;",
      [nome, id],
    );

    return (resultado.rowCount ?? 0) > 0;
  }

  async deletar(id: number): Promise<boolean> {
    const resultado = await bancoDados.query(
      "delete from tb_usuario where id_usuario = $1;",
      [id],
    );

    return (resultado.rowCount ?? 0) > 0;
  }
}
