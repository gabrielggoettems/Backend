import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const authController = require("../controllers/AuthController");

router.post("/EfetuarCadastro", authController.EfetuarCadastro);          

export default router;