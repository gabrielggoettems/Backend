import { useState } from "react";
import { compararProdutos, type ResultadoComparacao } from "../../components/services/comparador";
import style from "./Comparação.module.css";

export default function Comparador() {
  const [tipopeça, settipo] = useState (gpu);
  const [produtoA, setProdutoA] = useState("rtx-4060");
  const [produtoB, setProdutoB] = useState("rx-7600");
  const [resultado, setResultado] = useState<ResultadoComparacao | null>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleComparar() {
    try {
      setLoading(true);
      setErro("");
      setResultado(null);

      const dados = await compararProdutos(produtoA, produtoB);

      setResultado(dados);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao comparar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      
      <h1>Comparador de Peças</h1>

      <section>
        <div>
          <select value={tipopeça} name="Tipo de peça" onChange={(e) => setProdutoA(e.target.value)}>

          </select>
        </div>
        <div className={`${style.areaSelects} ${style.campoSelect}`}>

           <label>Primeira peça</label>
          
          <select value={produtoA} onChange={(e) => setProdutoA(e.target.value)}>
            <option value="rtx-4060">RTX 4060</option>
            <option value="rx-7600">RX 7600</option>
            <option value="gtx-1660">GTX 1660</option>
          </select>

        </div>

        <div className={`${style.areaSelects} ${style.campoSelect}`}>

          <label>Segunda peça</label>

          <select value={produtoB} onChange={(e) => setProdutoB(e.target.value)}>
            <option value="rtx-4060">RTX 4060</option>
            <option value="rx-7600">RX 7600</option>
            <option value="gtx-1660">GTX 1660</option>
          </select>

        </div>

        <button onClick={handleComparar} disabled={loading} className={style.botão}>
          {loading ? "Comparando..." : "Comparar"}
        </button>
      </section>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {resultado && (
        <section>
          <h2>Resultado</h2>

          <div>
            <div>
              <h3>{resultado.produtoA.nome}</h3>
              <p>Potência: {resultado.produtoA.potencia}</p>
              <p>Preço: R$ {resultado.produtoA.preco}</p>
            </div>

            <div>
              <h3>{resultado.produtoB.nome}</h3>
              <p>Potência: {resultado.produtoB.potencia}</p>
              <p>Preço: R$ {resultado.produtoB.preco}</p>
            </div>
          </div>

          <h3>{resultado.resumo}</h3>

          {resultado.vencedor && resultado.perdedor && (
            <p>
              Vencedor: <strong>{resultado.vencedor.nome}</strong>
              <br />
              Diferença: <strong>{resultado.diferencaPercentual}%</strong>
            </p>
          )}
        </section>
      )}
    </main>
  );
}
