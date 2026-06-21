'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Bot, AlertCircle, Info } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';

interface Recommendation {
  product: Product;
  justification: string;
}

export function PetAssistant() {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar a solicitação.');
      }

      setRecommendations(data.recommendations);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro de conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-600 mb-4 shadow-inner dark:bg-teal-900/50 dark:text-teal-400">
          <Bot className="h-8 w-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          Assistente de IA do Reino Pet
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Descreva o seu amiguinho (raça, idade, porte, problemas de saúde ou personalidade) e nossa Inteligência Artificial fará as melhores recomendações do nosso catálogo!
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 mb-12 relative overflow-hidden">
        {/* Decoração de Fundo */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-gradient-to-br from-teal-100/40 to-amber-100/40 blur-3xl pointer-events-none dark:from-teal-900/20 dark:to-amber-900/20" />
        
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Sobre o seu Pet
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Tenho um cachorro de porte grande, 2 anos, com pele sensível e que destrói muitos brinquedos..."
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all resize-none dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-teal-600"
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || !description.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analisando Perfil...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Gerar Recomendações
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="mb-12 flex items-start gap-3 rounded-2xl bg-rose-50 p-5 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:border-rose-900/50 dark:text-rose-400">
          <AlertCircle className="h-6 w-6 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold">Ops! Algo deu errado.</h3>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {recommendations && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-amber-500" />
                Recomendações Personalizadas
              </h2>
              <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">
                Selecionamos {recommendations.length} itens que combinam perfeitamente com o seu pet.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map((rec, index) => (
              <div key={`${rec.product.id}-${index}`} className="flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800 transition-all hover:shadow-md">
                <div className="p-4 bg-gradient-to-r from-teal-50 to-white border-b border-slate-100 dark:from-teal-950/30 dark:to-slate-900 dark:border-slate-800 flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400">
                    <Info className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-700 italic dark:text-slate-300 leading-relaxed">
                    &quot;{rec.justification}&quot;
                  </p>
                </div>
                <div className="p-5 flex-1 flex">
                   <div className="w-full max-w-sm mx-auto">
                     {/* Reuse the existing ProductCard but wrapped cleanly */}
                     <ProductCard product={rec.product} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
