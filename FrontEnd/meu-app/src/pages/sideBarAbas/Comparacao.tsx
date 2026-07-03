import { useEffect, useState, type ChangeEvent } from "react";
import {compararProdutos, listarProdutos, type ProdutoComparacao, type ResultadoComparacao,} from "../../components/services/comparador";
import style from "./Comparação.module.css";

export default function Comparador() {
  const [produtos, setProdutos] = useState<ProdutoComparacao[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("gpu");
  const [produtoA, setProdutoA] = useState("rx 7600");
  const [produtoB, setProdutoB] = useState("rtx 4060");
  const [resultado, setResultado] = useState<ResultadoComparacao | null>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const dados = await listarProdutos();
        setProdutos(dados);
      } catch (error) {
        setErro("Erro ao carregar produtos.");
      }
    }

    carregarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter(
    (produto) => produto.categoria === categoriaSelecionada
  );

  function mudarCategoria(e: ChangeEvent<HTMLSelectElement>) {
    const novaCategoria = e.target.value;

    setCategoriaSelecionada(novaCategoria);
    setResultado(null);
    setErro("");

    const produtosDaCategoria = produtos.filter(
      (produto) => produto.categoria === novaCategoria
    );

    setProdutoA(produtosDaCategoria[0]?.codigo || "");
    setProdutoB(
      produtosDaCategoria[1]?.codigo || produtosDaCategoria[0]?.codigo || ""
    );
  }

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
        
        <div className={`${style.areaSelects} ${style.campoSelect}`}>
          
          <label>Categoria:</label>

           <select value={categoriaSelecionada} onChange={mudarCategoria} className= {style.espaço}>
          <option value="gpu">GPU</option>
          <option value="cpu">CPU</option>
          <option value="ram">Memória ram</option>
          <option value="psu">Fonte</option>
          <option value="motherboard">Placa mãe</option>
        </select>

          <label>Primeira peça</label>

          <select
            value={produtoA}
            onChange={(e) => setProdutoA(e.target.value)}
            disabled={!categoriaSelecionada}
          >
            {produtosFiltrados.map((produto) => (
              <option key={produto.codigo} value={produto.codigo}>
                {produto.nome}
              </option>
            ))}
          </select>

        </div>

        <div className={`${style.areaSelects} ${style.campoSelect}`}>

          <label>Segunda peça</label>

          <select
            value={produtoB}
            onChange={(e) => setProdutoB(e.target.value)}
            disabled={!categoriaSelecionada}
          >
            {produtosFiltrados.map((produto) => (
              <option key={produto.codigo} value={produto.codigo}>
                {produto.nome}
              </option>
            ))}
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
