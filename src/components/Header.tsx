'use strict';

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  Sparkles,
  Phone,
  Heart
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    cartItems, 
    cartCount, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart 
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-teal-700 text-white py-1.5 px-4 text-center text-xs font-medium tracking-wide">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
          Frete grátis em compras acima de R$ 199! Aproveite.
        </span>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/90 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-teal-600 transition-transform active:scale-95">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white font-extrabold text-lg shadow-sm">
                🐾
              </span>
              <span className="tracking-tight text-slate-800 dark:text-white">
                Reino<span className="text-teal-600 font-extrabold">Pet</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link href="/catalogo" className="hover:text-teal-600 transition-colors font-bold text-teal-600 dark:text-teal-400">
                Catálogo
              </Link>
              <Link href="/#racoes" className="hover:text-teal-600 transition-colors">
                Rações
              </Link>
              <Link href="/#acessorios" className="hover:text-teal-600 transition-colors">
                Acessórios
              </Link>
              <Link href="/#banho-e-tosa" className="hover:text-teal-600 transition-colors">
                Banho e Tosa
              </Link>
            </nav>

            {/* Search Input */}
            <div className="hidden sm:flex relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-4 pr-10 text-xs transition-all focus:border-teal-500 focus:bg-white focus:outline-hidden dark:border-slate-800 dark:bg-slate-900"
              />
              <Search className="absolute right-3.5 top-2 h-4 w-4 text-slate-400" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Phone contact */}
              <a href="tel:+551199999999" className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600">
                <Phone className="h-3.5 w-3.5" />
                <span>(11) 9999-9999</span>
              </a>

              {/* Favorites (visual placeholder) */}
              <button className="hidden sm:flex text-slate-500 hover:text-rose-500 p-1.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900">
                <Heart className="h-5 w-5" />
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-700 shadow-xs hover:bg-teal-50 hover:text-teal-600 transition-colors dark:bg-slate-900 dark:text-slate-300 cursor-pointer"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white animate-fade-in">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex md:hidden h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 shadow-lg dark:border-slate-800 dark:bg-slate-950 animate-fade-in">
            <div className="flex flex-col gap-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Link
                href="/catalogo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-teal-600 text-teal-600 dark:text-teal-400"
              >
                Catálogo
              </Link>
              <Link
                href="/#racoes"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-teal-600"
              >
                Rações
              </Link>
              <Link
                href="/#acessorios"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-teal-600"
              >
                Acessórios
              </Link>
              <Link
                href="/#banho-e-tosa"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-teal-600"
              >
                Banho e Tosa
              </Link>

              {/* Search bar inside mobile drawer */}
              <div className="relative mt-2 sm:hidden">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-4 pr-10 text-xs focus:border-teal-500 focus:bg-white focus:outline-hidden dark:border-slate-800 dark:bg-slate-900"
                />
                <Search className="absolute right-3.5 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer Back Drop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Drawer Panel */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform duration-300 dark:bg-slate-950 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex h-full flex-col">
          {/* Cart Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 dark:border-slate-900">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-teal-600" />
              <h2 className="text-base font-bold text-slate-800 dark:text-white">Seu Carrinho</h2>
              <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-600 dark:bg-teal-950">
                {cartCount} {cartCount === 1 ? 'item' : 'itens'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:bg-slate-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="rounded-full bg-slate-50 p-6 text-slate-400 dark:bg-slate-900">
                  <ShoppingBag className="h-10 w-10 stroke-1" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">O carrinho está vazio</h3>
                <p className="mt-1 text-xs text-slate-400 max-w-[200px]">
                  Explore as categorias no site para adicionar produtos incríveis.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 rounded-full bg-teal-600 px-6 py-2 text-xs font-bold text-white transition-all hover:bg-teal-700 cursor-pointer"
                >
                  Voltar às Compras
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.product.id} 
                  className="flex items-center gap-3 border-b border-slate-50 pb-4 dark:border-slate-900 last:border-0"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-800">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                      {item.product.name}
                    </h4>
                    <span className="text-xs font-semibold text-teal-600">
                      R$ {item.product.price.toFixed(2)}
                    </span>
                    
                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center rounded-lg border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-slate-500 hover:text-teal-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:text-teal-600"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Trash action */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-slate-100 p-4 bg-slate-50/50 dark:border-slate-900 dark:bg-slate-900/30">
              <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                <span>Subtotal:</span>
                <span className="text-slate-900 dark:text-white">R$ {cartTotal.toFixed(2)}</span>
              </div>
              <div className="mt-1 flex justify-between text-xs text-slate-400">
                <span>Entrega:</span>
                <span>{cartTotal >= 199 ? 'Grátis 🎉' : 'Calcular na finalização'}</span>
              </div>
              
              <Link
                href="/carrinho"
                onClick={() => setIsCartOpen(false)}
                className="mt-4 block w-full rounded-xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg text-center cursor-pointer"
              >
                Ver Carrinho Completo
              </Link>
              
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2.5 w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Continuar Comprando
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
