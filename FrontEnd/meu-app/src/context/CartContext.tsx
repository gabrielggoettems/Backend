import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  produto: string;
  quantidade: number;
};

type CartContextValue = {
  cart: CartItem[];
  addToCart: (productcodigo: string) => void;
  removeFromCart: (productcodigo: string) => void;
  increaseQuantity: (productcodigo: string) => void;
  decreaseQuantity: (productcodigo: string) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "easypc-cart";
const CartContext = createContext<CartContextValue | null>(null);

function loadStoredCart(): CartItem[] {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) return [];

  try {
    const parsedCart = JSON.parse(storedCart) as CartItem[];

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart.filter(
      (item) =>
        typeof item.produto === "string" &&
        Number.isInteger(item.quantidade) &&
        item.quantidade > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(productId: string) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.produto === productId);

      if (existingItem) {
        return currentCart.map((item) =>
          item.produto === productId
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...currentCart, { produto: productId, quantidade: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.produto   !== productId),
    );
  }

  function increaseQuantity(productId: string) {
    addToCart(productId);
  }

  function decreaseQuantity(productId: string) {
    setCart((currentCart) =>
      currentCart.flatMap((item) => {
        if (item.produto !== productId) return [item];
        if (item.quantidade <= 1) return [];

        return [{ ...item, quantidade: item.quantidade - 1 }];
      }),
    );
  }

  function clearCart() {
    setCart([]);
  }

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }

  return context;
}
