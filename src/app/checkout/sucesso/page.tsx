'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function SucessoPage() {
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('lastOrderNumber');
    if (savedOrder) {
      setOrderNumber(savedOrder);
      // Opcional: remover após exibir se quiser impedir F5 de ver novamente
      // sessionStorage.removeItem('lastOrderNumber');
    } else {
      // Fallback
      setOrderNumber('999999');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-teal-100 dark:bg-teal-900/30"></div>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400 shadow-sm border-4 border-white dark:border-slate-950">
          <CheckCircle className="h-12 w-12" />
        </div>
      </div>
      
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
        Pedido Confirmado!
      </h1>
      
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-2 max-w-md">
        Sua simulação de compra acadêmica foi realizada com sucesso no Reino Pet.
      </p>
      
      <div className="mt-8 mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 min-w-[300px]">
        <div className="flex items-center justify-center gap-3 text-slate-500 mb-2">
          <Package className="h-5 w-5" />
          <span className="text-sm font-medium uppercase tracking-wider">Número do Pedido</span>
        </div>
        <div className="text-3xl font-mono font-bold text-teal-600 dark:text-teal-400">
          #{orderNumber}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/catalogo"
          className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95"
        >
          Continuar Explorando
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
