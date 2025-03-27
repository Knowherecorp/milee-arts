// Custom type definitions for Supabase data
// These complement the auto-generated types from Supabase

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  dimensions: string | null;
  materials: string | null;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
  totalOrders?: number; // For UI display purposes
  totalSpent?: string;  // For UI display purposes
  lastOrder?: string;   // For UI display purposes
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string | null;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  status: string;
  payment_method: string;
  payment_status: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  code: string;
  description: string;
  discount: number;
  discount_type: string;
  start_date: string;
  end_date: string;
  min_purchase: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Admin {
  id: string;
  username: string;
  created_at: string;
}

// Testimonial type for customer reviews
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  image_url: string | null;
  created_at: string;
}
