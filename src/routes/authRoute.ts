import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const routes = Router();
const authController = new AuthController();

routes.post("/cadastro", (req, res) => {
  return authController.cadastro(req, res);
});

routes.post("/EfetuarCadastro", (req, res) => {
  return authController.cadastro(req, res);
});

routes.post("/efetuarLogin", (req, res) => {
  return authController.login(req, res);
});

export default routes;