import { InterfaceCadastro } from "../interfaces/Register";
import { RetornoInterface } from "../interfaces/Return";

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