
"use client"

import React from 'react';
import Link from 'next/link';
import { FadeIn } from './fade-in';

export const HistorySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 pb-24">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <FadeIn className="w-full md:w-1/2 flex flex-col items-start">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
            Conheça a História da Fashion Girl
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Fundada em 2004 por Cida e seus filhos Alessandra e Adalberto, a Fashion Girl é uma referência em moda teen. A marca se destacou por investir na produção própria, garantindo qualidade e controle.
          </p>
          <Link href="#" className="inline-flex items-center justify-center bg-black text-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-transform hover:scale-105 active:scale-95">
            Conhecer a Fashion
          </Link>
        </FadeIn>
        
        <FadeIn delay={200} className="w-full md:w-1/2 overflow-hidden group">
          <img 
            src="https://picsum.photos/seed/fashiongirlstory/800/600" 
            alt="Cida e Alessandra - 20 Anos Fashion Girl" 
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </FadeIn>
      </div>
    </section>
  );
};
