import { Request, Response } from "express";
import { listarProdutos } from "../services/ProdutoService";

export function getProdutos(req: Request, res: Response) {
  const produtos = listarProdutos();
  return res.json(produtos);
}