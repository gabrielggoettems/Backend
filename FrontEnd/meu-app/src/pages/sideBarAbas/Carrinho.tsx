import { useCart } from "../../context/CartContext";
import { listarProdutos, type Produto } from "../../components/services/ProdutoServices";
import styles from "./Carrinho.module.css";
import { useEffect, useState } from "react";

function Carrinho() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart, 
  } = useCart();


  const [produtos, setProdutos] = useState<Produto[]>([]);
  useEffect(() => {
    const fetchProdutos = async () => {
      const produtosLista = await listarProdutos();
      setProdutos(produtosLista);
    };
    fetchProdutos();
  }, []);

  const cartProducts = cart.map((item) => {
    const produtoAchado = produtos.find((produto) => produto.codigo === item.produto);

    return {
      ...item,
      produtoAchado,
    };
  });

  const total = cartProducts.reduce((sum, item) => {
    if (!item.produtoAchado) return sum;

    return sum + item.produtoAchado.valor * item.quantidade;
  }, 0);

  return (
    <section className={styles.cart}>
      <h1>Carrinho</h1>

      {cart.length === 0 && (
        <p className={styles.empty}>Seu carrinho esta vazio.</p>
      )}

      <div className={styles.items}>
        {cartProducts.map((item) => {
          if (!item.produtoAchado) return null;

          return (
            <article className={styles.item} key={item.produtoAchado.codigo}>
              {/* <img src={item.produtoAchado.image} alt={item.produtoAchado.nome} /> */}

              <div className={styles.info}>
                <h2>{item.produtoAchado.nome}</h2>

                <p>
                  {item.produtoAchado.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <strong>
                  Subtotal:{" "}
                  {(item.produtoAchado.valor * item.quantidade).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    },
                  )}
                </strong>
              </div>

              <div className={styles.actions}>
                <div className={styles.quantity}>
                  <button
                    type="button"
                    aria-label={`Diminuir quantidade de ${item.produtoAchado.nome}`}
                    onClick={() => decreaseQuantity(item.produto)}
                  >
                    -
                  </button>

                  <span>{item.quantidade}</span>

                  <button
                    type="button"
                    aria-label={`Aumentar quantidade de ${String(item.produtoAchado.nome)}`}
                    onClick={() => increaseQuantity(item.produto)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => removeFromCart(item.produto)}
                >
                  Remover
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {cart.length > 0 && (
        <footer className={styles.summary}>
          <h2>
            Total:{" "}
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h2>

          <button type="button" onClick={clearCart}>
            Limpar carrinho
          </button>
        </footer>
      )}
    </section>
  );
}

export default Carrinho;
