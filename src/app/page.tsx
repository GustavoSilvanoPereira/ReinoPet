import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { MOCK_SERVICES } from '@/utils/mockData';
import { 
  Sparkles, 
  ChevronRight, 
  Truck, 
  RotateCcw, 
  Award, 
  Star, 
  Droplet, 
  Scissors, 
  ShoppingBag
} from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const products = await getProducts();
  
  const racoes = products.filter((p) => p.category === 'racoes');
  const acessorios = products.filter((p) => p.category === 'acessorios');
  const banhoTosaProducts = products.filter((p) => p.category === 'banho-e-tosa');
  const featuredProducts = products.filter((p) => p.is_featured);

  // Helper to get service icon component
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets':
        return <Droplet className="h-6 w-6 text-teal-600" />;
      case 'Scissors':
        return <Scissors className="h-6 w-6 text-teal-600" />;
      default:
        return <Sparkles className="h-6 w-6 text-teal-600" />;
    }
  };

  return (
    <div className="flex flex-col gap-16 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-amber-50/30 to-white py-12 md:py-20 dark:from-slate-900 dark:via-teal-950/20 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                <Sparkles className="h-3.5 w-3.5" />
                Novidade: Agendamento de Banho & Tosa Online!
              </span>
              
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                O shopping completo para o seu <span className="text-teal-600">melhor amigo</span>.
              </h1>
              
              <p className="text-base text-slate-500 dark:text-slate-400">
                No Reino Pet, selecionamos cada ração, brinquedo e acessório com o carinho que seu pet merece. Além disso, contamos com profissionais certificados para o bem-estar do seu companheiro.
              </p>
              
              <div className="flex flex-wrap gap-3.5 mt-2">
                <Link 
                  href="/catalogo" 
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Comprar Agora
                </Link>
                <a 
                  href="#banho-e-tosa" 
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-teal-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Agendar Banho
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              {/* Bullet Advantages */}
              <div className="grid grid-cols-2 gap-4 mt-4 w-full border-t border-slate-200/50 pt-6 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-600 text-xs font-bold dark:bg-teal-950">✓</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Rações Super Premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-600 text-xs font-bold dark:bg-teal-950">✓</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Tosa Especializada</span>
                </div>
              </div>
            </div>

            {/* Right Media (Dog & Cat Collage) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-tr from-teal-500/20 to-amber-500/20 p-4">
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80"
                    alt="Cachorro Feliz"
                    className="h-full w-full object-cover"
                  />
                </div>
                
                {/* Floating Badges */}
                <div className="absolute -top-4 -left-4 glass rounded-2xl p-3 shadow-md flex items-center gap-2 animate-bounce-slow border border-white/50">
                  <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-white">★</div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold leading-none">Clientes Felizes</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-white mt-0.5">Nota 4.9/5.0</p>
                  </div>
                </div>

                <div className="absolute bottom-6 -right-6 glass rounded-2xl p-3 shadow-md border border-white/50">
                  <p className="text-[10px] text-teal-600 font-extrabold uppercase tracking-wider">Cupom Primeira Compra</p>
                  <p className="text-sm font-black text-slate-800 dark:text-white mt-0.5">REINOPET10</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Trust Indicators Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-900 dark:bg-slate-950">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Entrega Super Rápida</h3>
              <p className="text-xs text-slate-400">Receba no mesmo dia para a Grande SP.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Devolução Descomplicada</h3>
              <p className="text-xs text-slate-400">Até 7 dias para trocar ou devolver grátis.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Qualidade Garantida</h3>
              <p className="text-xs text-slate-400">Apenas marcas premium originais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Shortcuts */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Categorias em Destaque</h2>
          <p className="text-xs text-slate-400 mt-2">Navegue pelas principais divisões de produtos e serviços para o seu amiguinho.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {/* Ração Category Card */}
          <Link href="#racoes" className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-teal-900 text-white shadow-xs cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80"
              alt="Rações"
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-lg font-bold">Rações Premium</h3>
              <p className="text-xs text-slate-300 mt-1">Nutrição balanceada para cães e gatos.</p>
            </div>
          </Link>

          {/* Acessórios Category Card */}
          <Link href="#acessorios" className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-amber-900 text-white shadow-xs cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&auto=format&fit=crop&q=80"
              alt="Acessórios"
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-lg font-bold">Acessórios Exclusivos</h3>
              <p className="text-xs text-slate-300 mt-1">Guia, camas, brinquedos e comedouros.</p>
            </div>
          </Link>

          {/* Banho & Tosa Category Card */}
          <Link href="#banho-e-tosa" className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-slate-900 text-white shadow-xs cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80"
              alt="Banho e Tosa"
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-lg font-bold">Banho & Tosa</h3>
              <p className="text-xs text-slate-300 mt-1">Serviço de estética e higiene animal.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Featured Products (Destaques) */}
      <section id="destaques" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-slate-100 pb-4 dark:border-slate-900">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Recomendados da Semana</h2>
            <p className="text-xs text-slate-400 mt-1">Os produtos mais queridos pelos nossos clientes.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Rações Products Grid */}
      <section id="racoes" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-slate-100 pb-4 dark:border-slate-900">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Rações & Nutrição</h2>
            <p className="text-xs text-slate-400 mt-1">A ração ideal para manter a saúde e vitalidade do seu animal.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {racoes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Acessórios Products Grid */}
      <section id="acessorios" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-slate-100 pb-4 dark:border-slate-900">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Acessórios & Estilo</h2>
            <p className="text-xs text-slate-400 mt-1">Conforto, diversão e segurança para todos os tamanhos.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {acessorios.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Banho & Tosa Grooming Services Section */}
      <section id="banho-e-tosa" className="relative bg-teal-50/50 py-16 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (Text & Call) */}
            <div className="lg:col-span-5 flex flex-col items-start gap-4">
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                🐾 Estética Animal
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Banho & Tosa profissional com muito carinho
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Contamos com um centro de estética de última geração. Nossos profissionais utilizam produtos hipoalergênicos e secadores silenciosos para diminuir o estresse do seu pet.
              </p>
              
              <div className="flex flex-col gap-3.5 mt-2 w-full">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white text-xs font-bold">✓</span>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Toalhas individualizadas e esterilizadas</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white text-xs font-bold">✓</span>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Câmeras para acompanhar o banho do seu pet</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white text-xs font-bold">✓</span>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Secagem com temperatura controlada</span>
                </div>
              </div>
              
              <a 
                href="https://wa.me/551199999999?text=Ol%C3%A1%21+Gostaria+de+agendar+um+banho+ou+tosa+para+o+meu+pet+no+Reino+Pet."
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-xs font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg active:scale-98 cursor-pointer"
              >
                Agendar pelo WhatsApp
              </a>
            </div>

            {/* Right Content (Services Cards Grid) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {MOCK_SERVICES.map((service) => (
                <div 
                  key={service.id} 
                  className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950">
                      {renderServiceIcon(service.icon)}
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">{service.name}</h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed min-h-[60px]">{service.description}</p>
                  </div>
                  
                  <div className="mt-6 border-t border-slate-50 pt-4 dark:border-slate-800/50">
                    <span className="block text-[10px] text-slate-400 font-medium">Duração média: {service.duration}</span>
                    <span className="mt-1 block text-base font-extrabold text-slate-900 dark:text-white">
                      R$ {service.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 8. Banho e Tosa Products Grid (e.g. Shampoos, Brushes) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between border-b border-slate-100 pb-4 dark:border-slate-900">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Higiene & Cuidados</h2>
            <p className="text-xs text-slate-400 mt-1">Mantenha seu companheiro limpo, cheiroso e com os pelos bem escovados.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8">
          {banhoTosaProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. Customer Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">O que dizem os tutores</h2>
          <p className="text-xs text-slate-400 mt-2">Depoimentos reais de quem confia no Reino Pet.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center text-amber-400 gap-0.5">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <p className="mt-4 text-xs italic text-slate-500 dark:text-slate-400 leading-relaxed">
              &quot;O serviço de banho e tosa é espetacular. Meu Golden Retriever sempre volta super cheiroso e calmo. A equipe é muito carinhosa e atenciosa!&quot;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-100">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Mariana Silva" className="h-full w-full object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-850 dark:text-white">Mariana Silva</h4>
                <p className="text-[10px] text-slate-400">Tutor da Mel (Golden Retriever)</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center text-amber-400 gap-0.5">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <p className="mt-4 text-xs italic text-slate-500 dark:text-slate-400 leading-relaxed">
              &quot;Compro a ração do meu gato aqui mensalmente. O preço é excelente e a entrega expressa realmente chega no mesmo dia. Atendimento nota 10!&quot;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-100">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Roberto Souza" className="h-full w-full object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-850 dark:text-white">Roberto Souza</h4>
                <p className="text-[10px] text-slate-400">Tutor do Mingau (Gato Persa)</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center text-amber-400 gap-0.5">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <p className="mt-4 text-xs italic text-slate-500 dark:text-slate-400 leading-relaxed">
              &quot;Comprei uma cama ortopédica e um comedouro elevado de inox. Meu cão idoso adorou e está comendo muito melhor. A qualidade dos materiais é fantástica!&quot;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-100">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Carla Borges" className="h-full w-full object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-850 dark:text-white">Carla Borges</h4>
                <p className="text-[10px] text-slate-400">Tutor do Thor (Buldogue Francês)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
