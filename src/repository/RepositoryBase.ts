import { bancoDados } from "../database/pool";

// ── Contrato mínimo de uma entidade do banco ─────────
interface IEntidade {
  id: number;
}

// ── Classe genérica com constraint ──────────────────
// "T extends IEntidade" = T pode ser qualquer tipo,
// desde que tenha pelo menos a propriedade "id: number"
class RepositorioBase<T extends IEntidade> {
  private tabela: string;

  constructor(tabela: string) {
    this.tabela = tabela;
  }

  async buscarPorId(id: number): Promise<T | null> {
    const res = await bancoDados.query<T>(
      `SELECT * FROM ${this.tabela} WHERE id = $1`,
      [id]
    );
    return res.rows[0] ?? null;
  }

  async listarTodos(): Promise<T[]> {
    const res = await bancoDados.query<T>(`SELECT * FROM ${this.tabela}`);
    return res.rows;
  }

  async deletar(id: number): Promise<boolean> {
    const res = await bancoDados.query(
      `DELETE FROM ${this.tabela} WHERE id_${this.tabela} =  $1`, [id]
    );
    return (res.rowCount ?? 0) > 0; // true se deletou algo
  }
}

export { RepositorioBase, IEntidade };