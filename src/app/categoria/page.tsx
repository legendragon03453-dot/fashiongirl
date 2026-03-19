
"use client"

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FadeIn } from '@/components/fade-in';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    title: "Como montar looks incríveis para o verão teen",
    category: "Tendências",
    date: "20 Março 2024",
    excerpt: "Descubra as peças essenciais que não podem faltar no seu guarda-roupa nesta estação. Do jeans destroyed às cores vibrantes.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    slug: 'looks-verao-teen'
  },
  {
    title: "Dicas de fotografia para bombar no seu Instagram",
    category: "Lifestyle",
    date: "15 Março 2024",
    excerpt: "Quer fotos de nível profissional usando apenas o seu celular? Separamos 5 truques de iluminação e poses que fazem a diferença.",
    image: "https://images.unsplash.com/photo-1529139513065-07b3b1c5921b?q=80&w=1000&auto=format&fit=crop",
    slug: 'dicas-fotografia-instagram'
  },
  {
    title: "O poder dos acessórios no look do dia a dia",
    category: "Dicas",
    date: "10 Março 2024",
    excerpt: "Como transformar uma camiseta básica e jeans em um visual fashionista usando os cintos, colares e bolsas certas.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    slug: 'poder-acessorios-dia-a-dia'
  },
  {
    title: "Fashion Girl em Paris: O que vimos nas passarelas",
    category: "Inspiration",
    date: "05 Março 2024",
    excerpt: "Nossa equipe viajou para conferir as novidades da moda europeia que vão chegar com tudo por aqui. Confira o resumo.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    slug: 'fashion-girl-paris'
  }
];

export default function CategoryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <FadeIn className="pt-16 pb-8 text-center bg-white">
        <h1 className="text-4xl md:text-5xl uppercase tracking-tighter font-black font-['Quandco']">Últimas do Blog</h1>
        <p className="mt-4 text-gray-500 uppercase text-xs tracking-widest font-bold">Tendências Teen & Estilo de Vida</p>
      </FadeIn>

      <section className="py-12 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogPosts.map((post, i) => (
              <FadeIn key={i} delay={i * 100}>
                <Link href={`/blog/${post.slug}`} className="group block bg-white border border-black overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-none">
                  <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
                    <img 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      src={post.image} 
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute top-4 right-4 bg-black text-white px-4 py-1 flex items-center gap-2 shadow-lg z-10">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-4 uppercase tracking-widest font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-xl uppercase mb-4 group-hover:underline decoration-1 underline-offset-4 transition-all font-black font-['Quandco']">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <span className="text-black text-xs font-bold uppercase tracking-widest">Ler Artigo</span>
                      <ArrowRight className="text-black group-hover:translate-x-2 transition-transform duration-300 w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="flex items-center justify-center gap-3 mt-16">
            <button className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all rounded-none">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Link className="w-10 h-10 flex items-center justify-center bg-black text-white text-xs font-bold rounded-none" href="#">1</Link>
              <Link className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-black text-xs font-bold rounded-none" href="#">2</Link>
              <Link className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-black text-xs font-bold rounded-none" href="#">3</Link>
            </div>
            <button className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all rounded-none">
              <ChevronRight className="w-5 h-5" />
            </button>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
