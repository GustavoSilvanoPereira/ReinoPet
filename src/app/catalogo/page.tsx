import React from 'react';
import { getProducts } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { CatalogFilters } from '@/components/CatalogFilters';
import { Pagination } from '@/components/Pagination';
import { PackageX } from 'lucide-react';

export const revalidate = 60; // 1 minute caching

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  
  const query = typeof params.q === 'string' ? params.q.toLowerCase() : '';
  const category = typeof params.categoria === 'string' ? params.categoria : 'todos';
  const pageParam = typeof params.page === 'string' ? params.page : '1';
  
  const currentPage = Math.max(1, parseInt(pageParam, 10));
  const ITEMS_PER_PAGE = 8;

  // Fetch all products (since we have 12 in the database, fetching all and filtering is fine)
  let products = await getProducts();

  // Apply Search Filter
  if (query) {
    products = products.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }

  // Apply Category Filter
  if (category && category !== 'todos') {
    products = products.filter((p) => p.category === category);
  }

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-8 pb-20 pt-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Nosso <span className="text-teal-600">Catálogo</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Encontre as melhores rações, brinquedos e acessórios para o seu pet com qualidade garantida.
          </p>
        </div>

        {/* Filters */}
        <CatalogFilters />

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>
            Mostrando {totalItems > 0 ? startIndex + 1 : 0} - {Math.min(endIndex, totalItems)} de {totalItems} produtos
          </span>
        </div>

        {/* Product Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-slate-200 rounded-3xl bg-slate-50 dark:bg-slate-900/50 dark:border-slate-800">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-400 dark:bg-slate-800 mb-4 shadow-sm">
              <PackageX className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Nenhum produto encontrado</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Não encontramos nenhum produto que corresponda aos filtros selecionados. Tente buscar com outros termos ou limpe os filtros.
            </p>
          </div>
        )}

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} />
        
      </div>
    </div>
  );
}
