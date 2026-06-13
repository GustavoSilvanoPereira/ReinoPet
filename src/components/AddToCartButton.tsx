'use client';

import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag } from 'lucide-react';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  
  return (
    <button
      onClick={() => addToCart(product)}
      className="flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg active:scale-95 cursor-pointer"
    >
      <ShoppingBag className="h-5 w-5" />
      Adicionar ao Carrinho
    </button>
  );
}
