import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size?: string; color?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { items: updatedItems, total };
      } else {
        const newItem: CartItem = {
          ...product,
          quantity: 1,
          selectedSize: size,
          selectedColor: color
        };
        const items = [...state.items, newItem];
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return { items, total };
      }
    }

    case 'REMOVE_ITEM': {
      const items = state.items.filter(item => 
        `${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}` !== action.payload
      );
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items, total };
    }

    case 'UPDATE_QUANTITY': {
      const items = state.items.map(item => {
        const itemKey = `${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`;
        if (itemKey === action.payload.id) {
          return { ...item, quantity: Math.max(0, action.payload.quantity) };
        }
        return item;
      }).filter(item => item.quantity > 0);
      
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items, total };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};