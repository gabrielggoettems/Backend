import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { InterfaceCadastro } from "../interfaces/Cadastro";

export class AuthController {

    constructor(private authService = new AuthService()) {}
  async cadastro(req: Request, res: Response) {
    const dados: InterfaceCadastro = req.body;

    const retorno = await this.authService.cadastro(dados);

    return res.status(retorno.sucesso ? 200 : 400).json(retorno);
  }
}