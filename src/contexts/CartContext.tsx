import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export interface CartItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (name: string, price: number, quantity?: number, id?: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((name: string, price: number, quantity: number = 1, id?: string) => {
    setCartItems((prev) => {
      // Find existing item by id if provided, else by name
      const existing = prev.find((item) => (id && item.id === id) || (!id && item.name === name));
      if (existing) {
        return prev.map((item) =>
          ((id && item.id === id) || (!id && item.name === name))
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id, name, price, quantity }];
    });
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
