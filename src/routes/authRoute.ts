import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const routes = Router();
const authController = new AuthController();

routes.get("/", (req, res) => {
  return res.send("Rota de login ativa");
});

routes.post("/cadastro", (req, res) => {
  return authController.cadastro(req, res);
});

routes.post("/EfetuarCadastro", (req, res) => {
  return authController.cadastro(req, res);
});

routes.post("/efetuarCadastro", (req, res) => {
  return authController.cadastro(req, res);
});

routes.post("/efetuarLogin", (req, res) => {
  return authController.login(req, res);
});

routes.post("/login", (req, res) => {
  return authController.login(req, res);
});

routes.post("/", (req, res) => {
  return authController.login(req, res);
});

export default routes;
