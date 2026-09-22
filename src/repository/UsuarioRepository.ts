
import { bancoDados } from "../database/pool";
import { IUsuario } from "../model/iUsuario";
import { BaseRepository } from "./BaseRepository";

export class UsuarioRepository extends BaseRepository<IUsuario> {

 async validarNomeUsuario(nome: string): Promise<boolean | null> {

  return await this.executarSqlUnico(
    "SELECT EXIST (SELECT FROM 1 FROM TB_USUARIO WHERE TX_NOME = $1)",
    [nome]
  );


 }

 async buscarTodos(): Promise<IUsuario[]> {
  return [];
 }
 async buscarPorId(id: number): Promise<IUsuario | null> {
  return null;
 }

 async salvar(dados: Omit<IUsuario, "id">): Promise<IUsuario> {
  const a = await this.executarSqlUnico<IUsuario>(
   "Insert into tb_usuario (id_usuario,tx_nome,tx_email,tx_senha,dt_datanascimento,tx_telefone,tx_tipo,cd_tipousuario) values ($1, $2, $3, $4, $5, $6, $7, $8);",
   [dados.id_usuario, dados.tx_nome, dados.tx_email,dados.tx_senha, dados.dt_datanascimento, dados.tx_telefone, dados.tx_tipo,dados.cd_tipousuario],
  );
  if(!a) throw new Error ("Nao existe");

  return a;
 }

 async atualizar(
  id: number,
  dados: Partial<Omit<IUsuario, "id">>,
 ): Promise<IUsuario | null> {
   "update from tb_usuario set =",
 }


async deletar(id: number): Promise<boolean> {
const a = await this.executarSql<IUsuario>(
"delete from tb_usuario where id_usaurio = $1;",
[id],
);

return a.length > 0;
}
}