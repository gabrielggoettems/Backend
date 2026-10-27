import { bancoDados } from "../database/pool";
import { ProdutoInterface } from "../interfaces/Products";

export class ProdutoService {
  async buscarTodosProdutos() {
    const { rows } = await bancoDados.query(
      `select cd_produto as codigo, tx_nome as nome, tx_categoria as categoria,
              tx_marca as marca, nr_preco as valor, nr_estoque as estoque,
              tx_imagem as imagem, tx_detalhes as detalhes
       from tb_produto order by tx_nome;`,
    );
    return rows;
  }

  async buscarProdutosPorNome(pesquisa: string) {
    const { rows } = await bancoDados.query(
      `select cd_produto as codigo, tx_nome as nome, tx_categoria as categoria,
              tx_marca as marca, nr_preco as valor, nr_estoque as estoque,
              tx_imagem as imagem, tx_detalhes as detalhes
       from tb_produto where tx_nome ilike $1 order by tx_nome;`,
      [`%${pesquisa}%`],
    );
    return rows;
  }

  async criarProduto(produto: ProdutoInterface) {
    const { rows } = await bancoDados.query(
      `insert into tb_produto
        (cd_produto, tx_nome, tx_categoria, tx_marca, nr_preco, nr_estoque, tx_imagem, tx_detalhes)
       values ($1, $2, $3, $4, $5, $6, $7, $8)
       returning cd_produto as codigo, tx_nome as nome, tx_categoria as categoria,
                 tx_marca as marca, nr_preco as valor, nr_estoque as estoque,
                 tx_imagem as imagem, tx_detalhes as detalhes;`,
      [produto.id, produto.nome, produto.categoria, produto.marca, produto.price,
        produto.estoque ?? 0, produto.imagem ?? null, JSON.stringify(produto.detalhes ?? {})],
    );
    return rows[0];
  }

  async removerProduto(codigo: string, nome: string) {
    const resultado = await bancoDados.query(
      "delete from tb_produto where cd_produto = $1 and lower(tx_nome) = lower($2);",
      [codigo, nome],
    );
    return (resultado.rowCount ?? 0) > 0;
  }
}
