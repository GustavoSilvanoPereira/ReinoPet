'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { AlertCircle, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  });

  const isFreeShipping = cartTotal >= 199;
  const shippingCost = isFreeShipping ? 0 : 15.90;
  const finalTotal = cartTotal + (cartItems.length > 0 ? shippingCost : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order generation
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    
    // Pass order number via sessionStorage since it's a mock
    sessionStorage.setItem('lastOrderNumber', orderNumber.toString());
    
    // Clear cart and redirect
    clearCart();
    router.push('/checkout/sucesso');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Seu carrinho está vazio</h1>
        <Link href="/catalogo" className="text-teal-600 font-medium hover:underline">Voltar para o catálogo</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Warning Alert */}
      <div className="mb-8 flex items-center gap-3 rounded-xl bg-amber-50 p-4 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">
          Aviso: Checkout em modo de demonstração acadêmica. Nenhuma cobrança real será feita.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">
            Finalizar Compra
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Dados Pessoais e Entrega</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Nome Completo
                  </label>
                  <input
                    required
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    placeholder="Ex: João da Silva"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      E-mail
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="joao@exemplo.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Telefone
                    </label>
                    <input
                      required
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="endereco" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Endereço Completo de Entrega
                  </label>
                  <textarea
                    required
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-teal-500 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    placeholder="Rua, Número, Bairro, Cidade, CEP..."
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg active:scale-95"
            >
              Confirmar Pedido
              <CheckCircle2 className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Resumo do Pedido
            </h2>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-4 items-center">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <img src={item.product.image_url} alt={item.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.product.name}</h4>
                    <p className="text-xs text-slate-500">Qtd: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  R$ {cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 dark:border-slate-800">
                <span>Frete</span>
                {isFreeShipping ? (
                  <span className="font-bold text-teal-600 dark:text-teal-400">Grátis</span>
                ) : (
                  <span className="font-medium text-slate-800 dark:text-slate-200">R$ {shippingCost.toFixed(2)}</span>
                )}
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="text-base font-bold text-slate-900 dark:text-white">Total a pagar</span>
                <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
                  R$ {finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <ShieldCheck className="h-5 w-5 text-teal-600" />
                Ambiente seguro para simulação de checkout.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
