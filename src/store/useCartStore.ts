import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';
import { validatePromoCode, calculateDiscount } from '@/lib/promo-codes';

interface CartStore {
  // State
  items: CartItem[];
  total: number;
  itemCount: number;
  promoCode: string;
  discount: number;
  promoMessage: string;
  promoValid: boolean;

  // Actions
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => void;
  removePromoCode: () => void;
  
  // Computed getters
  getTotal: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
}

const calculateTotals = (items: CartItem[], promoCode: string = '', discount: number = 0) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const actualDiscount = promoCode ? calculateDiscount(subtotal, promoCode) : 0;
  const total = subtotal - actualDiscount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { subtotal, discount: actualDiscount, total, itemCount };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      total: 0,
      itemCount: 0,
      promoCode: '',
      discount: 0,
      promoMessage: '',
      promoValid: false,

      // Actions
      addItem: (product, quantity = 1, size, color) => {
        const itemId = `${product.id}-${size || 'default'}-${color || 'default'}`;
        
        set((state) => {
          const existingItem = state.items.find(item => item.id === itemId);
          let newItems;
          
          if (existingItem) {
            newItems = state.items.map(item =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            const newItem: CartItem = {
              id: itemId,
              product,
              quantity,
              size,
              color,
            };
            newItems = [...state.items, newItem];
          }
          
          const { total, itemCount, discount } = calculateTotals(newItems, state.promoCode, state.discount);
          
          return {
            ...state,
            items: newItems,
            total,
            itemCount,
            discount
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => {
          const newItems = state.items.filter(item => item.id !== itemId);
          const { total, itemCount, discount } = calculateTotals(newItems, state.promoCode, state.discount);
          
          return {
            ...state,
            items: newItems,
            total,
            itemCount,
            discount
          };
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => {
          const newItems = state.items.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          );
          
          const { total, itemCount, discount } = calculateTotals(newItems, state.promoCode, state.discount);
          
          return {
            ...state,
            items: newItems,
            total,
            itemCount,
            discount
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
          promoCode: '',
          discount: 0,
          promoMessage: '',
          promoValid: false
        });
      },

      applyPromoCode: (code) => {
        const promoResult = validatePromoCode(code);
        
        set((state) => {
          const { total, itemCount, discount } = calculateTotals(state.items, promoResult.valid ? code : '', 0);
          
          return {
            ...state,
            promoCode: promoResult.valid ? code.trim().toUpperCase() : '',
            discount,
            total,
            promoMessage: promoResult.message,
            promoValid: promoResult.valid
          };
        });
      },

      removePromoCode: () => {
        set((state) => {
          const { total, itemCount } = calculateTotals(state.items, '', 0);
          
          return {
            ...state,
            promoCode: '',
            discount: 0,
            total,
            promoMessage: '',
            promoValid: false
          };
        });
      },

      getTotal: () => {
        const state = get();
        const subtotal = state.getSubtotal();
        const discount = state.getDiscount();
        return subtotal - discount;
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      },

      getDiscount: () => {
        const state = get();
        return state.promoCode ? calculateDiscount(state.getSubtotal(), state.promoCode) : 0;
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        discount: state.discount,
        promoValid: state.promoValid
      }),
      // Disable persistence during SSR
      skipHydration: true,
      // Rehydrate cart totals on load
      onRehydrateStorage: () => (state) => {
        if (state) {
          const { total, itemCount, discount } = calculateTotals(state.items, state.promoCode, state.discount);
          state.total = total;
          state.itemCount = itemCount;
          state.discount = discount;
          
          // Revalidate promo code on load
          if (state.promoCode) {
            const promoResult = validatePromoCode(state.promoCode);
            state.promoMessage = promoResult.message;
            state.promoValid = promoResult.valid;
          }
        }
      }
    }
  )
); 