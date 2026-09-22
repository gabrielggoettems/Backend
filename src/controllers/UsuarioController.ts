import { Request, Response } from "express";
import { UsuarioService } from "../services/Usuarioservice";

export class UsuarioController {
  constructor(private usuarioService = new UsuarioService()) {}

  async salvar(req: Request, res: Response) {
    const { nome } = req.body;

    if (typeof nome !== "string" || nome.trim() === "") {
      return res.status(400).json({ mensagem: "Nome nao encontrado" });
    }

    const retorno = await this.usuarioService.salvar(nome.trim());

    return res.status(retorno.sucesso ? 201 : 400).json(retorno);
  }
}
