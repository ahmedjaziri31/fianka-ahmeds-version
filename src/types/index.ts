// Auth types
export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  birth_date?: string;
  gender?: string;
  city?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}

// App State
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
}

// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'homme' | 'femme' | 'unisexe' | 'fianka';
  size?: string;
  color?: string;
  stock: number;
  created_at: string;
  availableSizes?: string[];
  sizeChart?: Record<string, string>;
}

// Cart types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  promoCode: string;
  discount: number;
}

// Shipping types
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

// Order types
export interface Order {
  id: number;
  user_id?: number;
  items: CartItem[];
  shipping_address: ShippingAddress;
  total: number;
  subtotal: number;
  discount: number;
  promo_code?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CreateOrderData {
  items: CartItem[];
  shipping_address: ShippingAddress;
  promo_code?: string;
  user_id?: number;
}

// Promo code types
export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
} 