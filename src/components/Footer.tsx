'use strict';

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="border-t border-slate-100 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      
      {/* Top Banner section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-b border-slate-200/60 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="rounded-full bg-teal-50 p-2.5 text-teal-600 dark:bg-teal-950">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">Compra 100% Segura</h4>
              <p className="text-xs text-slate-400">Seus dados protegidos por criptografia de ponta.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="rounded-full bg-teal-50 p-2.5 text-teal-600 dark:bg-teal-950">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">Atendimento Rápido</h4>
              <p className="text-xs text-slate-400">Fale conosco via WhatsApp ou telefone.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="rounded-full bg-teal-50 p-2.5 text-teal-600 dark:bg-teal-950">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-white">Retirada em Loja</h4>
              <p className="text-xs text-slate-400">Compre online e retire grátis em até 2 horas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-teal-600">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-600 text-white font-extrabold text-sm">
                🐾
              </span>
              <span className="tracking-tight text-slate-800 dark:text-white">
                Reino<span className="text-teal-600 font-extrabold">Pet</span>
              </span>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              O Reino Pet é o shopping completo para o seu melhor amigo. Oferecemos as melhores rações, acessórios exclusivos e o serviço de banho e tosa mais cuidadoso da cidade.
            </p>
            <div className="mt-6 flex gap-3.5">
              <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-teal-600">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-teal-600">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter/X" className="text-slate-400 hover:text-teal-600">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              Categorias
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/#racoes" className="hover:text-teal-600">Rações Premium</Link>
              </li>
              <li>
                <Link href="/#acessorios" className="hover:text-teal-600">Camas e Brinquedos</Link>
              </li>
              <li>
                <Link href="/#acessorios" className="hover:text-teal-600">Coleiras e Guias</Link>
              </li>
              <li>
                <Link href="/#banho-e-tosa" className="hover:text-teal-600">Serviços de Tosa</Link>
              </li>
            </ul>
          </div>

          {/* Business Hours & Contact */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              Contato & Horários
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-teal-600" />
                <span>Av. Principal dos Pets, 1234 - Bairro Feliz, São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-teal-600" />
                <span>Seg - Sáb: 8:00 às 20:00<br />Dom & Feriados: 9:00 às 14:00</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-teal-600" />
                <a href="mailto:contato@reinopet.com.br" className="hover:text-teal-600">contato@reinopet.com.br</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              Fique por dentro
            </h3>
            <p className="mt-4 text-xs text-slate-400 leading-relaxed">
              Inscreva-se em nossa newsletter para receber promoções exclusivas e dicas de cuidados com seu pet!
            </p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-teal-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-900"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-teal-600 px-4 text-xs font-bold text-white transition-colors hover:bg-teal-700 cursor-pointer"
                >
                  Enviar
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs font-medium text-teal-600 animate-fade-in">
                  ✓ Sucesso! Obrigado por se inscrever.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Lower Banner: Payments and Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Reino Pet E-commerce. Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold mr-1">Pagamento:</span>
            <span className="rounded-md border border-slate-200 px-1.5 py-0.5 bg-white dark:border-slate-800 dark:bg-slate-900 font-bold tracking-tight text-slate-600">VISA</span>
            <span className="rounded-md border border-slate-200 px-1.5 py-0.5 bg-white dark:border-slate-800 dark:bg-slate-900 font-bold tracking-tight text-slate-600">MASTERCARD</span>
            <span className="rounded-md border border-slate-200 px-1.5 py-0.5 bg-white dark:border-slate-800 dark:bg-slate-900 font-bold tracking-tight text-teal-600">PIX</span>
            <span className="rounded-md border border-slate-200 px-1.5 py-0.5 bg-white dark:border-slate-800 dark:bg-slate-900 font-bold tracking-tight text-slate-600">BOLETO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
