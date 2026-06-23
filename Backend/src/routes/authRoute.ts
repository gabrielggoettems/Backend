import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const routes = Router();
const authController = new AuthController();

routes.post("/cadastro", (req, res) => {
  return authController.cadastro(req, res);
});

export default routes;