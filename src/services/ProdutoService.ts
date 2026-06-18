import { produtos } from "../data/ProdutoMock";
import { ProdutoInterface } from "../interfaces/Produtos";

export class ProdutoService{

  buscarTodosProdutos(){
    return produtos;
  }

  buscarProdutosPorNome(pesquisa: any){
    let encontrei: ProdutoInterface | null = null;

    for(let p of produtos) {
      if (pesquisa == p.nome) {

        encontrei = p;

      }

    }

    return [encontrei];


  }
}