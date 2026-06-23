import { Router } from "express";
import { getListarProdutos } from "../controllers/ProdutoController";

const router = Router();

router.get("/produtos", getListarProdutos);

export default router;