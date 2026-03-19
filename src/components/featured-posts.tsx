
"use client"

import React from 'react';
import Link from 'next/link';
import { FadeIn } from './fade-in';

const posts = [
  {
    category: 'Tendências',
    title: 'As cores que vão dominar o verão 2026',
    author: 'Marina Silva',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'Estilo',
    title: 'Como montar um look streetwear perfeito',
    author: 'Sofia Costa',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'Acessórios',
    title: 'Os colares e anéis que não podem faltar',
    author: 'Clara Mendes',
    image: 'https://images.unsplash.com/photo-1485230895905-ef203be4f5bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'Dicas',
    title: 'Guia prático: transição do look dia para noite',
    author: 'Julia Almeida',
    image: 'https://images.unsplash.com/photo-1434389678369-138372615469?auto=format&fit=crop&w=800&q=80'
  }
];

export const FeaturedPosts = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 pb-24">
      <FadeIn className="mb-12">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest border-b-2 border-black pb-3 inline-block">
          posts em destaques da fashion
        </h2>
      </FadeIn>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map((post, i) => (
          <FadeIn key={i} delay={i * 100}>
            <div className="group cursor-pointer">
              <Link href="#" className="block overflow-hidden mb-4 aspect-[4/5]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </Link>
              <div className="flex flex-col">
                <Link href="#" className="text-[10px] font-black text-neutral-500 uppercase tracking-wider mb-2 hover:text-black transition-colors">
                  {post.category}
                </Link>
                <Link href="#" className="text-xl font-bold leading-tight mb-3 hover:text-accent transition-colors">
                  {post.title}
                </Link>
                <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest">
                  Por <Link href="#" className="text-black hover:underline">{post.author}</Link>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-14 flex justify-center">
        <Link href="#" className="inline-flex items-center justify-center bg-black text-white px-10 py-4 text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-transform hover:scale-105 active:scale-95">
          saiba mais
        </Link>
      </FadeIn>
    </section>
  );
};
