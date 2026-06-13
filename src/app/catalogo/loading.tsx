import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 pb-20 pt-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800"></div>
          <div className="mt-2 h-4 w-96 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800/50"></div>
        </div>
        
        {/* Filters Skeleton */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800"></div>
            ))}
          </div>
          <div className="h-10 w-full sm:w-80 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="aspect-square w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"></div>
              <div className="mt-4 flex flex-1 flex-col gap-2">
                <div className="h-3 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
                <div className="mt-auto pt-4 flex items-end justify-between">
                  <div className="h-6 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-9 w-full sm:w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
