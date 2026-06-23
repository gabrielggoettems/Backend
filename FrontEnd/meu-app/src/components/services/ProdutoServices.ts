import { Service } from "./services";

export type Produto = {
  codigo: string;
  nome: string;
  categoria: string;
  Marca: string;
  valor: number;
  detalhes: {
    [key: string]: string | number;
  };
};

type ProdutoApi = Partial<Produto> & {
  id?: string | number;
  marca?: string;
  price?: number;
};

type ProdutosApiResposta = ProdutoApi[] | {
  dados?: ProdutoApi[];
  content?: ProdutoApi[];
  produtos?: ProdutoApi[];
};

function normalizarProduto(produto: ProdutoApi): Produto {
  return {
    codigo: String(produto.codigo ?? produto.id ?? ""),
    nome: produto.nome ?? "",
    categoria: produto.categoria ?? "",
    Marca: produto.Marca ?? produto.marca ?? "",
    valor: Number(produto.valor ?? produto.price ?? 0),
    detalhes: produto.detalhes ?? {},
  };
}

export const produtoService = {
  async listar(): Promise<Produto[]> {
    const resposta = await Service.GET<ProdutosApiResposta>("api/produtos");

    const lista = Array.isArray(resposta)
      ? resposta
      : resposta.dados ?? resposta.content ?? resposta.produtos ?? [];

    return lista.map(normalizarProduto);
  },
};

export async function listarProdutos(): Promise<Produto[]> {
  return produtoService.listar();
}
