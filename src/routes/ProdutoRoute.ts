import { Router } from "express";
import { getProdutos } from "../controllers/ProdutoController";

const router = Router();

router.get("/produtos", getProdutos);

export default router;