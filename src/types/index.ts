export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image_url: string;
  category: 'racoes' | 'acessorios' | 'banho-e-tosa';
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  stock_quantity?: number;
  is_featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string; // e.g., "45 min"
  icon: string;
}
