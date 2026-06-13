import { createClient } from '@supabase/supabase-js';
import { Product } from '@/types';
import { MOCK_PRODUCTS } from '@/utils/mockData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Interface correspondente à tabela 'produtos' no Supabase
export interface DbProduct {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  preco: number;
  imagem: string;
  estoque: number;
  created_at: string;
}

// Mapeador de DbProduct do banco para Product do frontend
export function mapDbProductToProduct(dbProduct: DbProduct): Product {
  const nameLen = dbProduct.nome.length;
  // Gerar classificações e reviews determinísticas com base no produto para manter o visual rico
  const rating = 4.5 + (nameLen % 6) * 0.1;
  const reviews_count = 15 + (Math.floor(Number(dbProduct.preco)) % 80);
  const is_featured = dbProduct.preco >= 169 || dbProduct.estoque > 30;

  return {
    id: dbProduct.id,
    name: dbProduct.nome,
    description: dbProduct.descricao || '',
    price: Number(dbProduct.preco),
    image_url: dbProduct.imagem || '',
    category: dbProduct.categoria as 'racoes' | 'acessorios' | 'banho-e-tosa',
    rating,
    reviews_count,
    in_stock: dbProduct.estoque > 0,
    is_featured,
  };
}

// 1. Listar produtos (listar_produtos)
export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    return MOCK_PRODUCTS;
  }

  try {
    // Tenta chamar a função RPC criada no Supabase
    const { data: rpcData, error: rpcError } = await supabase.rpc('listar_produtos');
    if (!rpcError && rpcData) {
      return (rpcData as DbProduct[]).map(mapDbProductToProduct);
    }

    // Fallback para select tradicional caso a função RPC não exista
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as DbProduct[]).map(mapDbProductToProduct);
  } catch (err) {
    console.warn('Erro ao ler produtos do Supabase, usando dados locais de fallback:', err);
    return MOCK_PRODUCTS;
  }
}

// 2. Buscar produtos (buscar_produtos)
export async function searchProducts(query: string): Promise<Product[]> {
  if (!supabase) {
    const q = query.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  try {
    // Tenta chamar a função RPC de pesquisa no Supabase
    const { data: rpcData, error: rpcError } = await supabase.rpc('buscar_produtos', {
      termo_pesquisa: query,
    });
    if (!rpcError && rpcData) {
      return (rpcData as DbProduct[]).map(mapDbProductToProduct);
    }

    // Fallback para select tradicional com filtro OR
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .or(`nome.ilike.%${query}%,descricao.ilike.%${query}%`);

    if (error) throw error;
    return (data as DbProduct[]).map(mapDbProductToProduct);
  } catch (err) {
    console.warn('Erro ao pesquisar produtos no Supabase, usando dados locais de fallback:', err);
    const q = query.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
}

// 3. Filtrar por categoria (filtrar_por_categoria)
export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (!supabase) {
    return MOCK_PRODUCTS.filter((p) => p.category === category);
  }

  try {
    // Tenta chamar a função RPC de filtragem por categoria
    const { data: rpcData, error: rpcError } = await supabase.rpc('filtrar_por_categoria', {
      cat: category,
    });
    if (!rpcError && rpcData) {
      return (rpcData as DbProduct[]).map(mapDbProductToProduct);
    }

    // Fallback para select tradicional
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('categoria', category);

    if (error) throw error;
    return (data as DbProduct[]).map(mapDbProductToProduct);
  } catch (err) {
    console.warn('Erro ao filtrar produtos por categoria no Supabase, usando dados locais de fallback:', err);
    return MOCK_PRODUCTS.filter((p) => p.category === category);
  }
}

// 4. Buscar produto por ID (buscar_produto_por_id)
export async function getProductById(id: string): Promise<Product | null> {
  if (!supabase) {
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  }

  try {
    // Validar se o ID é um formato UUID válido antes de rodar RPC que espera tipo UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (isUuid) {
      const { data: rpcData, error: rpcError } = await supabase.rpc('buscar_produto_por_id', {
        prod_id: id,
      });
      if (!rpcError && rpcData && (rpcData as DbProduct[]).length > 0) {
        return mapDbProductToProduct((rpcData as DbProduct[])[0]);
      }
    }

    // Fallback para select tradicional
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data ? mapDbProductToProduct(data as DbProduct) : null;
  } catch (err) {
    console.warn('Erro ao buscar produto por ID no Supabase, usando dados locais de fallback:', err);
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  }
}
