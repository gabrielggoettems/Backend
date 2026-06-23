import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { listarProdutos, type Produto } from "../components/services/ProdutoServices";
import styles from "./loja.module.css";

function Loja() {
  const { addToCart, cart } = useCart();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await listarProdutos();
        setProdutos(resposta);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    carregarProdutos();
  }, []);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <section className={styles.loja}>
      <header className={styles.header}>
        <div>
          <h1>Loja EasyPC</h1>
          <p>Escolha pecas para montar seu computador.</p>
        </div>

        <strong className={styles.cartCount}>
          {totalItems} no carrinho
        </strong>
      </header>

      <div className={styles.grid}>
        {produtos.map((produto) => (
          <article className={styles.card} key={produto.codigo}>
            <div className={styles.cardBody}>
              <span className={styles.category}>{produto.categoria}</span>

              <h2>{produto.nome}</h2>

              <p>{produto.Marca}</p>

              <strong>
                {produto.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>

              <button
                type="button"
                onClick={() => addToCart(produto.codigo)}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </article>
        ))}
      </div>

      {produtos.length === 0 && (
        <p className={styles.empty}>Nenhum produto encontrado.</p>
      )}
    </section>
  );
}

export default Loja;