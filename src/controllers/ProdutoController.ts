import { Request, Response } from "express";
import { ProdutoService } from "../services/ProdutoService";

const produtoService = new ProdutoService();

export function getListarProdutos(req: Request, res: Response) {
  const pesquisar = req.query.pesquisar as string;

  if (pesquisar == null || pesquisar === "") {
    return res.status(200).json(
      produtoService.buscarTodosProdutos()
    );
  }

  return res.status(200).json(
    produtoService.buscarProdutosPorNome(String(pesquisar))
  );
}

export function criarProduto(req: Request, res: Response) {
  const produto = req.body;

  const novoProduto = produtoService.criarProduto(produto);

  return res.status(201).json(novoProduto);

}