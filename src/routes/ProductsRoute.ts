import { Router } from "express";

import {
  getListarProdutos,
  criarProduto,
  deletarProduto,
} from "../controllers/ProductsController";

const router = Router();

router.get("/produtos", getListarProdutos);
router.post("/saveProdutos", criarProduto);
router.delete("/produtos", deletarProduto);

export default router;
