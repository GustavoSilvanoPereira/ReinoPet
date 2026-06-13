'use client';

import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, CreditCard } from 'lucide-react';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useCart();
  
  const handleBuyNow = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const isOutOfStock = product.stock_quantity === 0;

  if (isOutOfStock) {
    return (
      <div className="flex flex-col gap-3 mt-2">
        <button
          disabled
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-slate-200 text-sm font-bold text-slate-500 cursor-not-allowed dark:bg-slate-800 dark:text-slate-400"
        >
          Produto Esgotado
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-2">
      <button
        onClick={() => addToCart(product)}
        className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-teal-600 bg-white px-8 text-sm font-bold text-teal-600 shadow-xs transition-all hover:bg-teal-50 active:scale-95 cursor-pointer dark:bg-slate-900 dark:hover:bg-slate-800"
      >
        <ShoppingBag className="h-5 w-5" />
        Adicionar ao Carrinho
      </button>
      
      <button
        onClick={handleBuyNow}
        className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg active:scale-95 cursor-pointer"
      >
        <CreditCard className="h-5 w-5" />
        Comprar Agora
      </button>
    </div>
  );
}
