import { createClient } from '@supabase/supabase-js';
import { Product } from '@/types';
import { MOCK_PRODUCTS } from '@/utils/mockData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function getProducts(category?: string): Promise<Product[]> {
  if (!supabase) {
    // Local development graceful fallback
    let products = MOCK_PRODUCTS;
    if (category) {
      products = products.filter((p) => p.category === category);
    }
    return Promise.resolve(products);
  }

  try {
    let query = supabase.from('products').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    if (error) {
      console.warn('Erro ao ler do Supabase, usando dados locais:', error.message);
      return MOCK_PRODUCTS.filter((p) => !category || p.category === category);
    }
    
    return (data as Product[]) || [];
  } catch (err) {
    console.warn('Falha na conexão com Supabase, usando dados locais:', err);
    return MOCK_PRODUCTS.filter((p) => !category || p.category === category);
  }
}
