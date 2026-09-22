import { RetornoInterface } from "../interfaces/Return";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const repository = new UsuarioRepository();

export class UsuarioService {
  async salvar(nome: string): Promise<RetornoInterface> {
    const existe = await repository.validarNomeUsuario(nome);

    if (existe) {
      return {
        sucesso: false,
        mensagem: "Nome ja cadastrado",
      };
    }

    await repository.salvarNomeUsuario(nome);

    return {
      sucesso: true,
      mensagem: "Usuario cadastrado com sucesso",
    };
  }
}
