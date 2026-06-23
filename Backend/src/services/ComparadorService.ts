import { produtos } from "../data/ProdutoMock";

export class ComparadorService {
  comparar(codigoA: string, codigoB: string) {
    const produtoA = produtos.find((produto) => produto.id === codigoA);
    const produtoB = produtos.find((produto) => produto.id === codigoB);

    if (!produtoA || !produtoB) {
      throw new Error("Produto não encontrado.");
    }

    if (produtoA.categoria !== produtoB.categoria) {
      throw new Error("Só é possível comparar produtos da mesma categoria.");
    }

    const potenciaA = produtoA.potencia;
    const potenciaB = produtoB.potencia;

    if (potenciaA === potenciaB) {
      return {
        produtoA,
        produtoB,
        vencedor: "empate",
        diferencaPercentual: 0,
        resumo: `${produtoA.nome} e ${produtoB.nome} possuem a mesma potência.`,
      };
    }

    const produtoVencedor = potenciaA > potenciaB ? produtoA : produtoB;
    const produtoPerdedor = potenciaA > potenciaB ? produtoB : produtoA;

    const maiorPotencia = Math.max(potenciaA, potenciaB);
    const menorPotencia = Math.min(potenciaA, potenciaB);

    const diferencaPercentual =
      ((maiorPotencia - menorPotencia) / menorPotencia) * 100;

    return {
      produtoA,
      produtoB,
      vencedor: produtoVencedor,
      perdedor: produtoPerdedor,
      diferencaPercentual: Number(diferencaPercentual.toFixed(1)),
      resumo: `${produtoVencedor.nome} é aproximadamente ${diferencaPercentual.toFixed(
        1
      )}% melhor que ${produtoPerdedor.nome}.`,
    };
  }
}