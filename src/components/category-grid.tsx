"use client"

import React from 'react';
import Link from 'next/link';
import { FadeIn } from './fade-in';

const categories = [
  { name: 'Tendências', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dicas de Estilo', image: 'https://images.unsplash.com/photo-1529139513055-119797896d1c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80' },
];

export const CategoryGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <FadeIn key={cat.name} delay={i * 100}>
            <Link href="#" className="relative block h-32 md:h-48 overflow-hidden group bg-black rounded-none">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40" 
              />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-widest">{cat.name}</h3>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
