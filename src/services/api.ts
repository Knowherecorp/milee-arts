
import { supabase } from "@/integrations/supabase/client";
import {
  Product,
  ProductImage,
  Category,
  Customer,
  Order,
  OrderItem,
  Banner,
  Offer,
  Admin
} from "@/types/supabase";

// Products API
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const getProductImages = async (productId: string): Promise<ProductImage[]> => {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data || [];
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProduct = async (id: string, product: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Categories API
export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const createCategory = async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateCategory = async (id: string, category: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Customers API
export const getCustomers = async (): Promise<Customer[]> => {
  const { data, error } = await supabase
    .from('customers')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const getCustomerById = async (id: string): Promise<Customer | null> => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const createCustomer = async (customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<Customer> => {
  const { data, error } = await supabase
    .from('customers')
    .insert(customer)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateCustomer = async (id: string, customer: Partial<Omit<Customer, 'id' | 'created_at' | 'updated_at'>>): Promise<Customer> => {
  const { data, error } = await supabase
    .from('customers')
    .update(customer)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Orders API
export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const getOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);
  
  if (error) throw error;
  return data || [];
};

export const updateOrderStatus = async (id: string, status: string): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Banners API
export const getBanners = async (): Promise<Banner[]> => {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data || [];
};

export const createBanner = async (banner: Omit<Banner, 'id' | 'created_at' | 'updated_at'>): Promise<Banner> => {
  const { data, error } = await supabase
    .from('banners')
    .insert(banner)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateBanner = async (id: string, banner: Partial<Omit<Banner, 'id' | 'created_at' | 'updated_at'>>): Promise<Banner> => {
  const { data, error } = await supabase
    .from('banners')
    .update(banner)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteBanner = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('banners')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Offers API
export const getOffers = async (): Promise<Offer[]> => {
  const { data, error } = await supabase
    .from('offers')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const createOffer = async (offer: Omit<Offer, 'id' | 'created_at' | 'updated_at'>): Promise<Offer> => {
  const { data, error } = await supabase
    .from('offers')
    .insert(offer)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateOffer = async (id: string, offer: Partial<Omit<Offer, 'id' | 'created_at' | 'updated_at'>>): Promise<Offer> => {
  const { data, error } = await supabase
    .from('offers')
    .update(offer)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteOffer = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('offers')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Admin Authentication API
export const adminLogin = async (username: string, password: string): Promise<Admin | null> => {
  // In a real app, you would use Supabase Auth or a secure authentication method
  // This is a simplified example for demonstration purposes
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('username', username)
    .single();
  
  if (error) return null;
  
  // Note: This is not secure! In a real app, you would use proper password hashing
  // and verification on the server side
  if (data && data.password_hash === password) {
    const { password_hash, ...adminWithoutPassword } = data;
    return adminWithoutPassword as Admin;
  }
  
  return null;
};

// File Storage API
export const uploadProductImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
  const filePath = `products/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);
  
  if (uploadError) throw uploadError;
  
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);
  
  return data.publicUrl;
};
