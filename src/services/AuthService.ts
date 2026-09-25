import bcrypt from "bcryptjs";
import { InterfaceCadastro } from "../interfaces/Register";
import { RetornoInterface } from "../interfaces/Return";
import { gerarToken } from "../jwt/jwt";
import {
  buscaUsuarioPorEmail,
  buscaUsuarioPorNome,
  cadastraUsuario,
} from "../repository/AuthRepository";

const SALT_ROUNDS = 10;
const SENHA_MINIMA = 8;
const SENHA_MAXIMA_BYTES = 72; // limite do bcrypt
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hash falso para gastar o mesmo tempo quando o usuário não existe
// (evita descobrir usuários existentes pelo tempo de resposta).
const HASH_FALSO = bcrypt.hashSync("senha-falsa", SALT_ROUNDS);

function dataNascimentoValida(valor: string): boolean {
  const data = new Date(valor);
  return !isNaN(data.getTime()) && data <= new Date();
}

export class AuthService {
  async cadastro(dados: InterfaceCadastro): Promise<RetornoInterface> {
    if (
      !dados.user ||
      !dados.senha ||
      !dados.email ||
      !dados.Telefone ||
      !dados.DataNascimento ||
      !dados.confirmarSenha
    ) {
      return { sucesso: false, mensagem: "Preencha todos os campos" };
    }

    if (!dados.termos) {
      return {
        sucesso: false,
        mensagem: "Você deve aceitar os termos de uso",
      };
    }

    const nome = dados.user.trim();
    const email = dados.email.trim().toLowerCase();

    if (!nome) {
      return { sucesso: false, mensagem: "Preencha todos os campos" };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { sucesso: false, mensagem: "Email inválido" };
    }

    if (!dataNascimentoValida(dados.DataNascimento)) {
      return { sucesso: false, mensagem: "Data de nascimento inválida" };
    }

    if (dados.senha !== dados.confirmarSenha) {
      return { sucesso: false, mensagem: "As senhas não conferem" };
    }

    if (dados.senha.length < SENHA_MINIMA) {
      return {
        sucesso: false,
        mensagem: `Senha deve ter no mínimo ${SENHA_MINIMA} caracteres`,
      };
    }

    if (Buffer.byteLength(dados.senha, "utf8") > SENHA_MAXIMA_BYTES) {
      return { sucesso: false, mensagem: "Senha muito longa" };
    }

    if (await buscaUsuarioPorNome(nome)) {
      return { sucesso: false, mensagem: "Usuário já cadastrado" };
    }

    if (await buscaUsuarioPorEmail(email)) {
      return { sucesso: false, mensagem: "Email já cadastrado" };
    }

    const senhaHash = await bcrypt.hash(dados.senha, SALT_ROUNDS);

    try {
      await cadastraUsuario({
        nome,
        email,
        senhaHash,
        telefone: dados.Telefone,
        dataNascimento: dados.DataNascimento,
        tipoUsuario: 1,
      });
    } catch (erro: any) {
      // 23505 = violação de unique (requisições simultâneas)
      if (erro?.code === "23505") {
        return {
          sucesso: false,
          mensagem: "Usuário ou email já cadastrado",
        };
      }
      throw erro;
    }

    return { sucesso: true, mensagem: "Cadastro efetuado com sucesso" };
  }

  async login(user: string, senha: string): Promise<RetornoInterface> {
    if (!user || !senha) {
      return { sucesso: false, mensagem: "Preencha usuário e senha" };
    }

    const usuarioEncontrado = await buscaUsuarioPorNome(user.trim());

    const senhaValida = await bcrypt.compare(
      senha,
      usuarioEncontrado?.tx_senha ?? HASH_FALSO,
    );

    if (!usuarioEncontrado || !senhaValida) {
      return { sucesso: false, mensagem: "Usuário ou senha incorretos" };
    }

    const token = gerarToken(usuarioEncontrado.id_usuario);

    return {
      sucesso: true,
      mensagem: "Login efetuado com sucesso",
      token,
    };
  }
}