import { ItemType } from '@/module/type';
import { create } from 'zustand';

interface CartStore {
  items: ItemType[];
  addToCart: (item: ItemType) => void;
  removeFromCart: (item: ItemType) => void;
  resetCart: () => void;
}

const initialItems = localStorage.getItem('cartItems');
const parsedItems = initialItems ? JSON.parse(initialItems) : [];

export const useCartStore = create<CartStore>((set) => ({
  items: parsedItems,
  addToCart: (item) => {
    set((state) => {
      const newItems = state.items.some((i) => i.productId === item.productId)
        ? state.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          )
        : [...state.items, item];
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return { items: newItems };
    });
  },
  removeFromCart: (item) => {
    set((state) => {
      const newItems = state.items.filter((i) => i !== item);
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return { items: newItems };
    });
  },
  resetCart: () => {
    localStorage.removeItem('cartItems');
    set({ items: [] });
  },
}));
