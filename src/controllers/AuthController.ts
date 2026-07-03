import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { InterfaceCadastro } from "../interfaces/Register";

export class AuthController {

    

    constructor(private authService = new AuthService()) {}
  async cadastro(req: Request, res: Response) {

    const dados: InterfaceCadastro = req.body;

    const retorno = await this.authService.cadastro(dados);

    return res.status(retorno.sucesso ? 200 : 400).json(retorno);
  }

  async login(req: Request, res: Response) {
    const { user, senha } = req.body;

    const retorno = await this.authService.login(user, senha);

    return res.status(retorno.sucesso ? 200 : 400).json(retorno);
  }
}
