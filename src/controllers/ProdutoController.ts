import { Request, Response } from "express";
import { ProdutoService } from "../services/ProdutoService";

const produtoService = new ProdutoService();

export function getListarProdutos(req: Request, res: Response) {
  const pesquisar = req.query.pesquisar as string;

  if (!pesquisar?.trim()) {
    return res.status(200).json(produtoService.buscarTodosProdutos());
  }

  const produtos = produtoService.buscarProdutosPorNome(pesquisar);

  return res.status(200).json(produtos);
}