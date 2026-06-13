'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function CarrinhoPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  const isFreeShipping = cartTotal >= 199;
  const shippingCost = isFreeShipping ? 0 : 15.90;
  const finalTotal = cartTotal + (cartItems.length > 0 ? shippingCost : 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-900 mb-6 shadow-sm">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          Seu carrinho está vazio
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
          Você ainda não adicionou nenhum produto ao carrinho. Que tal explorar nosso catálogo?
        </p>
        <Link
          href="/catalogo"
          className="flex items-center gap-2 rounded-xl bg-teal-600 px-8 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95"
        >
          Explorar Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">
        Seu Carrinho
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {cartItems.map((item) => (
            <div 
              key={item.product.id} 
              className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Product Image */}
              <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800">
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-1 flex-col justify-between self-stretch">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 line-clamp-2">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors shrink-0"
                      aria-label="Remover item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-teal-600 dark:text-teal-400">
                    {item.product.category === 'racoes' ? 'Ração' : item.product.category === 'acessorios' ? 'Acessório' : 'Banho & Tosa'}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 font-medium">Qtd:</span>
                    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2.5 text-slate-500 hover:text-teal-600 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 text-sm font-bold text-slate-700 dark:text-slate-300 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2.5 text-slate-500 hover:text-teal-600 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-0.5">R$ {item.product.price.toFixed(2)} cada</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Resumo do Pedido
            </h2>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} itens)</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  R$ {cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 dark:border-slate-800">
                <span>Frete</span>
                {isFreeShipping ? (
                  <span className="font-bold text-teal-600 dark:text-teal-400">Grátis 🎉</span>
                ) : (
                  <span className="font-medium text-slate-800 dark:text-slate-200">R$ {shippingCost.toFixed(2)}</span>
                )}
              </div>
              
              {!isFreeShipping && (
                <div className="rounded-xl bg-teal-50 p-4 text-xs text-teal-800 dark:bg-teal-950/50 dark:text-teal-300">
                  Faltam apenas <strong>R$ {(199 - cartTotal).toFixed(2)}</strong> para você ganhar frete grátis!
                </div>
              )}

              <div className="flex justify-between pt-2">
                <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
                <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
                  R$ {finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert('Compra finalizada com sucesso! Esta é uma demonstração.')}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg active:scale-95"
            >
              Finalizar Compra
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <Link
              href="/catalogo"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Continuar Comprando
            </Link>

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <ShieldCheck className="h-5 w-5 text-teal-600" />
                Pagamento 100% seguro com criptografia de ponta a ponta.
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <Truck className="h-5 w-5 text-teal-600" />
                Entrega garantida ou seu dinheiro de volta.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
