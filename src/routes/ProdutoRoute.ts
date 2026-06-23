import { Router } from "express";
import {
  getListarProdutos,
  criarProduto
} from "../controllers/ProdutoController";

const router = Router();

router.get("/produtos", getListarProdutos);

router.post("/produtos", criarProduto);

export default router;