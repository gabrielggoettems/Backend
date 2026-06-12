import { InterfaceCadastro } from "../interfaces/Cadastro";
import { RetornoInterface } from "../interfaces/Retorno";

export class AuthService {
  async cadastro(dados: InterfaceCadastro): Promise<RetornoInterface> {
    if (!dados.user || !dados.senha) {
      return {
        sucesso: false,
        mensagem: "Preencha todos os campos",
      };
    }

    return {
      sucesso: true,
      mensagem: "Cadastro efetuado com sucesso",
    };
  }
}