import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import { Service } from "../../../components/services/services";
import type { LoginInterface } from "../../../interfaces/login.ts";
import Button from "../../../component/button/Button";

function Login() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function efetuarLogin() {
    setLoading(true);
    setErro("");

    try {
      const parametros: LoginInterface = {
        "user": user,
        "senha": senha,
      };

      const sucesso = await Service.POST("efetuarLogin", parametros);



      setLoading(false);

      if (sucesso != null) {
        navigate("/home");
        return;
      }

      setErro("Usuário ou senha inválidos");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setErro("Erro ao conectar com o servidor");
      setLoading(false);
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.Login} id="login">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Digite seu nome de usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className={styles.input}
          id="usuario"
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={styles.input}
          id="senha"
        />

        {erro && <p className={styles.erro}>{erro}</p>}

      <Button Click={efetuarLogin} texto={loading ? "Entrando..." : "Entrar"} ></Button>

        <h3>
          <input type="checkbox" id="lembrar" name="lembrar" value="Lembrar" />
          <label htmlFor="lembrar">Lembrar-me</label>
        </h3>

        <div>
          <a className={styles.link} onClick={() => navigate("/EsqueciSenha")}>
            Esqueci minha senha
          </a>
        </div>

        <div>
          Não é cadastrado? <a href="#">Cadastrar</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
