import { InterfaceCadastro } from "../interfaces/Register";
import { RetornoInterface } from "../interfaces/Return";
import { usuario } from "../data/Mock";
import { gerarToken } from "../server";

export class AuthService {
  async cadastro(dados: InterfaceCadastro): Promise<RetornoInterface> {

    if (
      !dados.user ||
      !dados.senha ||
      !dados.email ||
      !dados.Telefone ||
      !dados.DataNascimento ||
      !dados.genero ||
      !dados.confirmarSenha
    ) {
      return {
        sucesso: false,
        mensagem: "Preencha todos os campos",
      };
    }

    if (!dados.termos) {
      return {
        sucesso: false,
        mensagem: "Você deve aceitar os termos de uso",
      };
    }

    if (dados.senha !== dados.confirmarSenha) {
      return {
        sucesso: false,
        mensagem: "As senhas não conferem",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(dados.email)) {
      return {
        sucesso: false,
        mensagem: "Email inválido",
      };
    }

    if (dados.senha.length < 6) {
      return {
        sucesso: false,
        mensagem: "Senha deve ter no mínimo 6 caracteres",
      };
    }


    const usuarioExistente = usuario.some(
      (u) => u.email === dados.email
    );

    if (usuarioExistente) {
      return {
        sucesso: false,
        mensagem: "Email já cadastrado",
      };
    }


    const novoUsuario = {
      codigo: usuario.length + 1,
      nome: dados.user,
      idade: parseInt(dados.DataNascimento),
      email: dados.email,
      senha: dados.senha,
      confirmarSenha: dados.confirmarSenha,
    };


    usuario.push(novoUsuario);

    return {
      sucesso: true,
      mensagem: "Cadastro efetuado com sucesso",
    };
  }

  async login(
    user: string,
    senha: string
  ): Promise<RetornoInterface> {

 
    if (!user || !senha) {
      return {
        sucesso: false,
        mensagem: "Preencha usuário e senha",
      };
    }

    const usuarioEncontrado = usuario.find(
      (u) =>
        (u.nome === user || u.email === user) &&
        u.senha === senha
    );

    
    if (!usuarioEncontrado) {
      return {
        sucesso: false,
        mensagem: "Usuário ou senha incorretos",
      };
    }

 
    const token = gerarToken(usuarioEncontrado.codigo);

 
    return {
      sucesso: true,
      mensagem: "Login efetuado com sucesso",
      token: token
      
    };
  }
}