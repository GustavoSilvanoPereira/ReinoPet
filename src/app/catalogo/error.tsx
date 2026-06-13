'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-500 mb-6">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
        Ops! Algo deu errado.
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
        Não conseguimos carregar o catálogo no momento. Verifique sua conexão ou tente novamente mais tarde.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95 cursor-pointer"
      >
        <RefreshCcw className="h-4 w-4" />
        Tentar novamente
      </button>
    </div>
  );
}
