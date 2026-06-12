import { LoginInterface } from "../interfaces/login";
import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();
export class AuthController {

    async login(req:Request, res:Response) {
        const { email, senha }:LoginInterface = req.body;   

        if (email == null || senha == null || email == "" || senha == "") {
            return res.status(500).json({ message: "Email e senha são obrigatórios." });
        }

        const retorno = authService.login({ email, senha });

        return res.status(200).json({ message: "Login realizado com sucesso." });
}
}