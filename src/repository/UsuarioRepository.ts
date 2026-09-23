import { IUsuario } from "../model/iUsuario";
import { BaseRepository } from "./BaseRepository";

export class UsuarioRepository extends BaseRepository<IUsuario> {

    async validarNomeUsuario(nome: string): Promise<boolean | null> {

        return await this.executarSqlUnico<boolean>(
            "select exists (select 1 from tb_usuario where tx_nome = $1)",
            [nome]
        );
    }

    async buscarTodos(): Promise<IUsuario[]> {

        return await this.executarSql<IUsuario>(
            "select id_usuario, tx_nome, tx_email, tx_senha, dt_datanascimento, tx_telefone, cd_tipousuario from tb_usuario order by id_usuario"
        );
    }

    async buscarPorId(id: number): Promise<IUsuario | null> {

        return await this.executarSqlUnico<IUsuario>(
            "select id_usuario, tx_nome, tx_email, tx_senha, dt_datanascimento, tx_telefone, cd_tipousuario from tb_usuario where id_usuario = $1",
            [id]
        );
    }

    async salvar(dados: Omit<IUsuario, "id_usuario">): Promise<IUsuario> {

        const usuario = await this.executarSqlUnico<IUsuario>(
            `insert into tb_usuario (
                tx_nome,
                tx_email,
                tx_senha,
                dt_datanascimento,
                tx_telefone,
                cd_tipousuario
            )
            values ($1, $2, $3, $4, $5, $6)
            returning id_usuario, tx_nome, tx_email, tx_senha,
                      dt_datanascimento, tx_telefone, cd_tipousuario`,
            [
                dados.tx_nome,
                dados.tx_email,
                dados.tx_senha,
                dados.dt_datanascimento,
                dados.tx_telefone,
                dados.cd_tipousuario
            ]
        );

        if (!usuario) {
            throw new Error("Não foi possível cadastrar o usuário");
        }

        return usuario;
    }

    async atualizar(
        id: number,
        dados: Partial<Omit<IUsuario, "id_usuario">>,
    ): Promise<IUsuario | null> {

        const usuario = await this.executarSqlUnico<IUsuario>(
            `update tb_usuario
             set
                tx_nome = coalesce($1, tx_nome),
                tx_email = coalesce($2, tx_email),
                tx_senha = coalesce($3, tx_senha),
                dt_datanascimento = coalesce($4, dt_datanascimento),
                tx_telefone = coalesce($5, tx_telefone),
                cd_tipousuario = coalesce($6, cd_tipousuario)
             where id_usuario = $7
             returning id_usuario, tx_nome, tx_email, tx_senha,
                       dt_datanascimento, tx_telefone, cd_tipousuario`,
            [
                dados.tx_nome,
                dados.tx_email,
                dados.tx_senha,
                dados.dt_datanascimento,
                dados.tx_telefone,
                dados.cd_tipousuario,
                id
            ]
        );

        return usuario;
    }

    async deletar(id: number): Promise<boolean> {

        const resultado = await this.executarSql(
            "delete from tb_usuario where id_usuario = $1",
            [id]
        );

        return resultado.length > 0;
    }
}
