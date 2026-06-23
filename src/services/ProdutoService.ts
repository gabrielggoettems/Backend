import { produtos } from "../data/ProdutoMock";

export class ProdutoService {
  buscarTodosProdutos() {
    return produtos;
  }

  criarProduto(produto: any) {
    produtos.push(produto);
    return produto;
  }

  buscarProdutosPorNome(pesquisa: any) {
    let encontrei = null;

    for (let p of produtos) {
      if (pesquisa == p.nome) {
        encontrei = p;
      }
    }

    return [encontrei];
  }
}