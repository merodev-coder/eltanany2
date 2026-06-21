import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('eltanany_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addItem = useCallback((product: Product, color?: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.color === color);
      let newItems: CartItem[];
      if (existing) {
        newItems = prev.map(i =>
          i.product.id === product.id && i.color === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        newItems = [...prev, { product, quantity: 1, color }];
      }
      try {
        localStorage.setItem('eltanany_cart', JSON.stringify(newItems));
      } catch {
        // silently fail
      }
      return newItems;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => {
      const newItems = prev.filter(i => i.product.id !== productId);
      try {
        localStorage.setItem('eltanany_cart', JSON.stringify(newItems));
      } catch {
        // silently fail
      }
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => {
      const newItems = prev.map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      );
      try {
        localStorage.setItem('eltanany_cart', JSON.stringify(newItems));
      } catch {
        // silently fail
      }
      return newItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem('eltanany_cart');
    } catch {
      // silently fail
    }
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
