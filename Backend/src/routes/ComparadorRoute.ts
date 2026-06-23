import { Router } from "express";
import { ComparadorController } from "../controllers/ComparadorController";

const router = Router();
const comparadorController = new ComparadorController();

router.get("/comparar", comparadorController.comparar);

export default router;