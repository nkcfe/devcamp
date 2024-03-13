import { create } from 'zustand';

interface CartCounts {
  cartCounts: number;
  setCartCounts: (cartCounts: number) => void;
  incrementCartCounts: () => void;
  decrementCartCounts: () => void;
  resetCartCounts: () => void;
}

export const useCartCounts = create<CartCounts>((set) => ({
  cartCounts: 0,
  setCartCounts: (cartCounts: number) => set({ cartCounts }),
  incrementCartCounts: () =>
    set((state) => ({ cartCounts: state.cartCounts + 1 })),
  decrementCartCounts: () =>
    set((state) => ({ cartCounts: state.cartCounts - 1 })),
  resetCartCounts: () => set({ cartCounts: 0 }),
}));
