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

  return response.json();
}