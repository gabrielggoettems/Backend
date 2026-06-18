import { Request, Response } from "express";
import { ProdutoService } from "../services/ProdutoService";

const produtoService = new ProdutoService();
export function getListarProdutos(req: Request, res: Response) {
  const { pesquisar } = req.query;

  if (pesquisar == null || pesquisar == "") {
    return res.status(200).json(produtoService.buscarTodosProdutos());
  }

    return res.status(200).json(produtoService.buscarProdutosPorNome(pesquisar));
}
