import { Router } from "express";
import { getListarProdutos } from "../controllers/ProductsController";

const router = Router();

router.get("/produtos", getListarProdutos);

export default router;