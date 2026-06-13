'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'racoes', label: 'Rações' },
  { id: 'acessorios', label: 'Acessórios' },
  { id: 'banho-e-tosa', label: 'Banho & Tosa' },
];

export function CatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('categoria') || 'todos';
  const currentQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(currentQuery);

  // Update URL params
  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'todos') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset page to 1 when filters change
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams('q', searchTerm);
  };

  return (
    <div className="flex flex-col gap-6 w-full mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 hidden items-center gap-1.5 text-xs font-semibold text-slate-500 sm:flex dark:text-slate-400">
            <SlidersHorizontal className="h-4 w-4" />
            Filtrar por:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => updateParams('categoria', cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs shrink-0">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-10 text-sm text-slate-800 shadow-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-teal-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  updateParams('q', '');
                }}
                className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
