import { useState } from "react";
import style from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { Service } from "../../../component/service/Service";
import type { CadastroInterface } from "../../../interfaces/Cadastro";
import Button from "../../../component/button/Button";

function Cadastro() {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  const [usuario, setUsuario] = useState<CadastroInterface>({
    user: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    DataNascimento: "",
    Telefone: "",
    genero: "",
    termos: false,
  });

  async function fazerCadastro() {
  try {
    const sucesso = await Service.POST("EfetuarCadastro", usuario);

    if (sucesso) {
      navigate("/login");
    }
  } catch (error) {
    setMensagem("Erro ao realizar cadastro");
    console.error(error);
  }
}
  function validarFormulario() {
    if (!usuario.user.trim()) return setMensagem("Informe seu nome"), false;
    if (!usuario.email.trim()) return setMensagem("Informe seu email"), false;
    if (!usuario.senha.trim()) return setMensagem("Informe sua senha"), false;
    if (!usuario.confirmarSenha.trim()) return setMensagem("Confirme sua senha"), false;

    if (usuario.senha !== usuario.confirmarSenha)
      return setMensagem("As senhas não coincidem"), false;

    if (!usuario.DataNascimento)
      return setMensagem("Informe sua data de nascimento"), false;

    if (!usuario.Telefone.trim())
      return setMensagem("Informe seu telefone"), false;

    if (!usuario.genero)
      return setMensagem("Selecione um gênero"), false;

    if (!usuario.termos)
      return setMensagem("Aceite os termos de uso"), false;

    setMensagem("");
    return true;
  }

  return (
    <div className={style.body}>
      <div className={style.cadastrar}>
        <h2>Cadastro</h2>

        {mensagem && <div className={style.aviso}>{mensagem}</div>}

        <input
          className={style.input}
          placeholder="Nome Completo"
          value={usuario.user}
          onChange={(e) =>
            setUsuario({ ...usuario, user: e.target.value })
          }
        />

        <input
          className={style.input}
          placeholder="Email"
          value={usuario.email}
          onChange={(e) =>
            setUsuario({ ...usuario, email: e.target.value })
          }
        />

        <input
          className={style.input}
          type="password"
          placeholder="Senha"
          value={usuario.senha}
          onChange={(e) =>
            setUsuario({ ...usuario, senha: e.target.value })
          }
        />

        <input
          className={style.input}
          type="password"
          placeholder="Confirmar Senha"
          value={usuario.confirmarSenha}
          onChange={(e) =>
            setUsuario({ ...usuario, confirmarSenha: e.target.value })
          }
        />

        <input
          className={style.input}
          type="date"
          value={usuario.DataNascimento}
          onChange={(e) =>
            setUsuario({ ...usuario, DataNascimento: e.target.value })
          }
        />

        <input
          className={style.input}
          type="tel"
          placeholder="Telefone"
          value={usuario.Telefone}
          onChange={(e) =>
            setUsuario({ ...usuario, Telefone: e.target.value })
          }
        />

        <select
          className={style.input}
          value={usuario.genero}
          onChange={(e) =>
            setUsuario({ ...usuario, genero: e.target.value })
          }
        >
          <option value="">Selecione um gênero</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Abacaxi">Abacaxi</option>
        </select>

        <label className={style.checkboxGenero}>
          <input
            type="checkbox"
            checked={usuario.termos}
            onChange={(e) =>
              setUsuario({ ...usuario, termos: e.target.checked })
            }
          />
          Aceito os Termos de Uso
        </label>

        <Button
          texto="Cadastrar"
          Click={() => validarFormulario() && fazerCadastro()}
        />

        <div className={style.login}>
          Já tem conta?{" "}
          <a className={style.link} onClick={() => navigate("/login")}>
            Fazer Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
