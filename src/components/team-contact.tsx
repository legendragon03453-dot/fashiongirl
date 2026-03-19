
"use client"

import React from 'react';
import Link from 'next/link';
import { FadeIn } from './fade-in';

export const TeamContact = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 pb-24 border-t border-neutral-200 pt-16">
      <div className="flex flex-col md:flex-row-reverse items-center gap-12">
        <FadeIn className="w-full md:w-1/2 flex flex-col items-start">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
            Fale com nosso time
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Na Fashion Girl, nossa equipe de consultoras é dedicada a oferecer um atendimento personalizado e atento, sempre focada em entender as necessidades de cada cliente. Estamos aqui para te apoiar em cada escolha.
          </p>
          <Link href="#" className="inline-flex items-center justify-center bg-black text-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-transform hover:scale-105 active:scale-95">
            Falar com Equipe
          </Link>
        </FadeIn>

        <FadeIn delay={200} className="w-full md:w-1/2 overflow-hidden group">
          <img 
            src="https://picsum.photos/seed/fashionteam/800/600" 
            alt="Equipe Fashion Girl" 
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </FadeIn>
      </div>
    </section>
  );
};
