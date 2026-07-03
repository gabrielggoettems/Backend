export interface ProdutoComparacao {
  codigo: string;
  nome: string;
  preco: number;
  categoria: string;
  imagem?: string;
  potencia: number;
}

export interface ResultadoComparacao {
  produtoA: ProdutoComparacao;
  produtoB: ProdutoComparacao;
  vencedor?: ProdutoComparacao;
  perdedor?: ProdutoComparacao;
  diferencaPercentual: number;
  resumo: string;
}

type ProdutoApi = Partial<ProdutoComparacao> & {
  id?: string | number;
  price?: number;
};

type ResultadoComparacaoApi = Omit<
  ResultadoComparacao,
  "produtoA" | "produtoB" | "vencedor" | "perdedor"
> & {
  produtoA: ProdutoApi;
  produtoB: ProdutoApi;
  vencedor?: ProdutoApi | string;
  perdedor?: ProdutoApi;
};

function normalizarProduto(produto: ProdutoApi): ProdutoComparacao {
  return {
    codigo: String(produto.codigo ?? produto.id ?? ""),
    nome: produto.nome ?? "",
    preco: Number(produto.preco ?? produto.price ?? 0),
    categoria: produto.categoria ?? "",
    imagem: produto.imagem,
    potencia: Number(produto.potencia ?? 0),
  };
}

function normalizarResultado(
  resultado: ResultadoComparacaoApi
): ResultadoComparacao {
  return {
    ...resultado,
    produtoA: normalizarProduto(resultado.produtoA),
    produtoB: normalizarProduto(resultado.produtoB),
    vencedor:
      resultado.vencedor && typeof resultado.vencedor !== "string"
        ? normalizarProduto(resultado.vencedor)
        : undefined,
    perdedor: resultado.perdedor
      ? normalizarProduto(resultado.perdedor)
      : undefined,
  };
}

export async function listarProdutos(): Promise<ProdutoComparacao[]> {
  const response = await fetch("http://localhost:3000/api/produtos");

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos.");
  }

  const dados: ProdutoApi[] = await response.json();
  return dados.map(normalizarProduto);
}

export async function compararProdutos(
  produtoA: string,
  produtoB: string
): Promise<ResultadoComparacao> {
  const response = await fetch(
    `http://localhost:3000/api/comparar?produtoA=${produtoA}&produtoB=${produtoB}`
  );

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.erro || "Erro ao comparar produtos.");
  }

  const resultado: ResultadoComparacaoApi = await response.json();
  return normalizarResultado(resultado);
}
