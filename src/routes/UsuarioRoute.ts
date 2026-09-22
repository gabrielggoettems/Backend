import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router();
const usuarioController = new UsuarioController();

router.post("/", (req, res) => {
  return usuarioController.salvar(req, res);
});


export default router;
