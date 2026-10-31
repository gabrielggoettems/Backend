import { Request, Response } from "express";
import { ProdutoService } from "../services/ProductsService";

const produtoService = new ProdutoService();

export async function getListarProdutos(req: Request, res: Response) {
  try {
    const pesquisar = String(req.query.pesquisar ?? req.query.q ?? "").trim();
    const produtos = pesquisar
      ? await produtoService.buscarProdutosPorNome(pesquisar)
      : await produtoService.buscarTodosProdutos();
    return res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    return res.status(500).json({ mensagem: "Não foi possível carregar os produtos." });
  }
}

export async function criarProduto(req: Request, res: Response) {
  const { id, codigo, nome, categoria, marca, Marca, price, valor, estoque, imagem, img, detalhes } = req.body ?? {};
  const codigoProduto = String(codigo ?? id ?? "").trim();
  const preco = Number(price ?? valor);
  const quantidadeEstoque = Number(estoque ?? 0);
  if (!codigoProduto || !String(nome ?? "").trim() || !String(categoria ?? "").trim() ||
      !String(marca ?? Marca ?? "").trim() || !Number.isFinite(preco) || preco <= 0 || !Number.isInteger(quantidadeEstoque) || quantidadeEstoque < 0) {
    return res.status(400).json({ mensagem: "Informe código, nome, categoria, marca, preço válido e estoque inteiro não negativo." });
  }

  try {
    const novoProduto = await produtoService.criarProduto({
      id: codigoProduto,
      nome: String(nome).trim(),
      categoria: String(categoria).trim(),
      marca: String(marca ?? Marca).trim(),
      price: preco,
      estoque: quantidadeEstoque,
      imagem: imagem ?? img,
      detalhes: detalhes ?? {},
    });
    return res.status(201).json(novoProduto);
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    const erroPostgres = error as { code?: string };
    if (erroPostgres.code === "23505") {
      return res.status(409).json({ mensagem: "Já existe um produto com esse código." });
    }
    return res.status(500).json({ mensagem: "Não foi possível cadastrar o produto." });
  }
}

export async function deletarProduto(req: Request, res: Response) {
  const codigo = String(req.params.codigo ?? req.body?.codigo ?? "").trim();
  if (!codigo) {
    return res.status(400).json({ mensagem: "Informe o código do produto." });
  }
  try {
    const removido = await produtoService.removerProduto(codigo);
    if (!removido) return res.status(404).json({ mensagem: "Produto não encontrado." });
    return res.status(200).json({ mensagem: "Produto removido da loja." });
  } catch (error) {
    console.error("Erro ao remover produto:", error);
    return res.status(500).json({ mensagem: "Não foi possível remover o produto." });
  }
}
