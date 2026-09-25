import { RetornoInterface } from "../interfaces/Return";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const repository = new UsuarioRepository();

export class UsuarioService {
  async salvar(nome: string): Promise<RetornoInterface> {
    if (!nome || !nome.trim()) {
      return { sucesso: false, mensagem: "Informe o nome" };
    }

    const nomeLimpo = nome.trim();

    if (await repository.validarNomeUsuario(nomeLimpo)) {
      return { sucesso: false, mensagem: "Nome já cadastrado" };
    }

    await repository.salvar(nomeLimpo);

    return { sucesso: true, mensagem: "Usuário cadastrado com sucesso" };
  }
}