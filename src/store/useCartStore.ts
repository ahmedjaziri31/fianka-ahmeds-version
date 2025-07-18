import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product } from '@/types';

interface CartStore extends Cart {
  // Actions
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => void;
  removePromoCode: () => void;
  
  // Computed values
  getItemCount: () => number;
  getTotal: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
}

// Helper function to calculate totals
const calculateTotals = (items: CartItem[], promoCode?: string, discount?: number) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = discount || 0;
  const total = subtotal - discountAmount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { subtotal, total, itemCount, discount: discountAmount };
};

// Helper function to generate cart item ID
const generateCartItemId = (productId: number, size?: string, color?: string) => {
  return `${productId}-${size || 'default'}-${color || 'default'}`;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      total: 0,
      itemCount: 0,
      promoCode: undefined,
      discount: undefined,

      // Actions
      addItem: (product: Product, quantity = 1, size?: string, color?: string) => {
        const itemId = generateCartItemId(product.id, size, color);
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(item => item.id === itemId);

        let newItems: CartItem[];
        
        if (existingItemIndex >= 0) {
          // Update existing item quantity
          newItems = currentItems.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          const newItem: CartItem = {
            id: itemId,
            product,
            quantity,
            size,
            color
          };
          newItems = [...currentItems, newItem];
        }

        const { total, itemCount, discount } = calculateTotals(newItems, get().promoCode, get().discount);
        
        set({
          items: newItems,
          total,
          itemCount,
          discount
        });
      },

      removeItem: (itemId: string) => {
        const currentItems = get().items;
        const newItems = currentItems.filter(item => item.id !== itemId);
        
        const { total, itemCount, discount } = calculateTotals(newItems, get().promoCode, get().discount);
        
        set({
          items: newItems,
          total,
          itemCount,
          discount
        });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const currentItems = get().items;
        const newItems = currentItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );

        const { total, itemCount, discount } = calculateTotals(newItems, get().promoCode, get().discount);
        
        set({
          items: newItems,
          total,
          itemCount,
          discount
        });
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
          promoCode: undefined,
          discount: undefined
        });
      },

      applyPromoCode: (code: string) => {
        // Simple promo code logic - in real app, this would call an API
        let discount = 0;
        const subtotal = get().getSubtotal();
        
        switch (code.toUpperCase()) {
          case 'WELCOME10':
            discount = subtotal * 0.10; // 10% discount
            break;
          case 'SAVE20':
            discount = subtotal * 0.20; // 20% discount
            break;
          case 'FIANKA15':
            discount = subtotal * 0.15; // 15% discount
            break;
          default:
            discount = 0;
        }

        const total = subtotal - discount;
        
        set({
          promoCode: code,
          discount,
          total
        });
      },

      removePromoCode: () => {
        const subtotal = get().getSubtotal();
        set({
          promoCode: undefined,
          discount: undefined,
          total: subtotal
        });
      },

      // Computed values
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().discount || 0;
        return subtotal - discount;
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      },

      getDiscount: () => {
        return get().discount || 0;
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        discount: state.discount
      }),
      // Disable persistence during SSR
      skipHydration: true,
      // Rehydrate cart totals on load
      onRehydrateStorage: () => (state) => {
        if (state) {
          const { total, itemCount } = calculateTotals(state.items, state.promoCode, state.discount);
          state.total = total;
          state.itemCount = itemCount;
        }
      }
    }
  )
); 