import React from 'react';
import { getProductById } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/AddToCartButton';
import { Star, Truck, ShieldCheck, RotateCcw } from 'lucide-react';

export const revalidate = 60;

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-800 shadow-sm">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 rounded-lg bg-rose-500 px-3 py-1 text-sm font-bold text-white shadow-sm">
                -{discountPercent}%
              </span>
            )}
            <span className="absolute top-4 left-4 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
              {product.category === 'racoes' ? 'Ração' : product.category === 'acessorios' ? 'Acessório' : 'Banho & Tosa'}
            </span>
          </div>

          {/* Miniature Gallery */}
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <button 
                key={i} 
                className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                  i === 1 ? 'border-teal-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <img
                  src={product.image_url}
                  alt={`${product.name} galeria ${i}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">({product.reviews_count} avaliações)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {product.name}
          </h1>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              R$ {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-slate-400 line-through mb-1">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              product.stock_quantity && product.stock_quantity > 0 
                ? 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300' 
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${product.stock_quantity && product.stock_quantity > 0 ? 'bg-teal-500' : 'bg-rose-500'}`}></span>
              {product.stock_quantity && product.stock_quantity > 0 ? `${product.stock_quantity} em estoque` : 'Esgotado'}
            </span>
          </div>

          <p className="mt-6 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          {/* Trust Badges */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-8 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-950">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Frete Expresso</h4>
                <p className="text-xs text-slate-500 mt-0.5">Receba no mesmo dia para SP Capital</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Compra Segura</h4>
                <p className="text-xs text-slate-500 mt-0.5">Ambiente 100% criptografado</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Devolução Grátis</h4>
                <p className="text-xs text-slate-500 mt-0.5">Até 7 dias após o recebimento</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
