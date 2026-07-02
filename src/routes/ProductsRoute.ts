import { Router } from "express";

import {
  getListarProdutos,
  criarProduto
} from "../controllers/ProductsController";

const router = Router();

router.get("/produtos", getListarProdutos);
router.post("/saveProdutos", criarProduto);

export default router;