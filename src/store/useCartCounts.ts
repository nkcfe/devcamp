import { create } from 'zustand';

interface CartCounts {
  cartCounts: number;
  incrementCartCounts: () => void;
  decrementCartCounts: () => void;
  resetCartCounts: () => void;
}

export const useCartCounts = create<CartCounts>((set) => ({
  cartCounts: 0,
  incrementCartCounts: () =>
    set((state) => ({ cartCounts: state.cartCounts + 1 })),
  decrementCartCounts: () =>
    set((state) => ({ cartCounts: state.cartCounts - 1 })),
  resetCartCounts: () => set({ cartCounts: 0 }),
}));
