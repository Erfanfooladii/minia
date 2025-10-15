import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  totalQuantity: () => number;
  totalPrice: () => number;
  hasItem: (id: string) => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, qty: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      totalQuantity: () => get().items.reduce((acc, cur) => acc + cur.qty, 0),
      totalPrice: () =>
        get().items.reduce((acc, cur) => acc + cur.qty * cur.price, 0),
      hasItem: (id: string) => get().items.some((i) => i.id === id),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
