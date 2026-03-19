
"use client"

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { FadeIn } from './fade-in';

const products = [
  { name: 'Vestido Floral Midi', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=600&q=80' },
  { name: 'Jaqueta Puffer Essential', image: 'https://images.unsplash.com/photo-1550639524-a6f58345a278?auto=format&fit=crop&w=600&q=80' },
  { name: 'Conjunto Fashion Amarelo', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80' },
  { name: 'T-Shirt Vintage Vibes', image: 'https://images.unsplash.com/photo-1434389678369-138372615469?auto=format&fit=crop&w=600&q=80' },
  { name: 'Bolsa Mini Classic', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Calça Cargo Utility', image: 'https://images.unsplash.com/photo-1529139513055-119797896d1c?auto=format&fit=crop&w=600&q=80' },
];

export const ProductCatalog = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-5 pb-24">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-6">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest border-b-2 border-black pb-3 inline-block">
            catálogo da fashion
          </h2>
        </FadeIn>
        
        <div className="hidden md:flex space-x-4">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-colors active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-colors active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide"
      >
        {products.map((item, i) => (
          <div key={i} className="snap-start shrink-0 w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[23%] group">
            <Link href="#" className="block">
              <div className="overflow-hidden mb-4 aspect-[3/4] bg-neutral-200">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <h3 className="text-lg font-bold leading-tight group-hover:underline uppercase tracking-tight">
                {item.name}
              </h3>
            </Link>
          </div>
        ))}
      </div>

      <FadeIn className="mt-8">
        <Link 
          href="#" 
          className="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors group"
        >
          <span>Shop Now</span>
          <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </FadeIn>
    </section>
  );
};
