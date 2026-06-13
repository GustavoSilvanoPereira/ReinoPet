'use strict';

'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-xs transition-all duration-300 hover:border-slate-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      {/* Product Image and badges */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category Tag */}
        <span className="absolute top-2.5 left-2.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
          {product.category === 'racoes' ? 'Ração' : product.category === 'acessorios' ? 'Acessório' : 'Banho & Tosa'}
        </span>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-2.5 right-2.5 rounded-md bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
            -{discountPercent}%
          </span>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-400 shadow-xs transition-colors hover:text-rose-500 dark:bg-slate-950"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Info */}
      <div className="mt-4 flex flex-1 flex-col">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center text-amber-400">
            <Star className="h-3.5 w-3.5 fill-current" />
          </div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[10px] text-slate-400">({product.reviews_count} avaliações)</span>
        </div>

        {/* Title */}
        <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold text-slate-800 dark:text-slate-200 min-h-[40px]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            {product.originalPrice && (
              <span className="block text-xs text-slate-400 line-through">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-bold text-slate-900 dark:text-white">
              R$ {product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/produto/${product.id}`}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-teal-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Visualizar</span>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-3 text-xs font-semibold text-white shadow-xs transition-all hover:bg-teal-700 hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
