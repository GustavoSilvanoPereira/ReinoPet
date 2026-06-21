import React from 'react';
import { PetAssistant } from '@/components/PetAssistant';

export const metadata = {
  title: 'Assistente de IA | Reino Pet',
  description: 'Descubra os melhores produtos para o seu pet com a ajuda da nossa Inteligência Artificial.',
};

export default function PetAssistantPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="bg-teal-600 dark:bg-teal-900 py-8 text-center px-4">
        <h1 className="text-2xl font-bold text-white mb-2">Recomendação Inteligente</h1>
        <p className="text-teal-100 text-sm max-w-xl mx-auto">
          Nosso assistente analisa o perfil do seu animal e seleciona exatamente o que ele precisa no nosso catálogo.
        </p>
      </div>
      <PetAssistant />
    </div>
  );
}
