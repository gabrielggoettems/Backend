import { bancoDados } from "../database/pool";

export interface IRepository<T> {
  buscarTodos(): Promise<T[]>;
  buscarPorId(id: number): Promise<T | null>;
  salvar(dados: Omit<T, "id">): Promise<T>;
  atualizar(id: number, dados: Partial<Omit<T, "id">>): Promise<T | null>;
  deletar(id: number): Promise<boolean>;
}

export abstract class BaseRepository<T> implements IRepository<T> {

  abstract buscarTodos(): Promise<T[]>;
  abstract buscarPorId(id: number): Promise<T | null>;
  abstract salvar(dados: Omit<T, "id">): Promise<T>;
  abstract atualizar(id: number, dados: Partial<Omit<T, "id">>): Promise<T | null>;
  abstract deletar(id: number): Promise<boolean>;

  protected async executarSql<R = T>(sql: string, params: unknown[] = []): Promise<R[]> {
    const { rows } = await bancoDados.query(sql, params);
    return rows as R[];
  }

  protected async executarSqlUnico<R = T>(sql: string, params: unknown[] = []): Promise<R | null> {
    const rows = await this.executarSql<R>(sql, params);
    return rows[0] ?? null;
  }

}