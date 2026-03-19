
'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FadeIn } from '@/components/fade-in';
import { Heart, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock de dados para simular posts diferentes baseado no slug
const postData: Record<string, any> = {
  'retorno-do-minimalismo': {
    date: 'MAIO 24, 2024',
    title: 'O Retorno do Minimalismo: Como menos se tornou o novo "must-have" da moda teen.',
    subtitle: 'Exploramos como as linhas limpas e a paleta neutra estão dominando o guarda-roupa da nova geração.',
    mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1450',
    author: {
      name: 'Sofia Rebouças',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia'
    },
    content: (
      <>
        <p className="text-lg md:text-xl mb-8 text-neutral-800 leading-relaxed">
          <span className="float-left font-['Quandco'] text-[4.5rem] leading-[0.8] pt-[10px] pr-[15px]">A</span>
          moda é cíclica, disso todos sabemos. Mas o que estamos presenciando em 2024 vai além de uma simples tendência passageira: é um resgate estético profundo. O minimalismo, que antes era visto como algo "adulto" ou sério demais, encontrou seu lugar no coração da moda teen feminina. Marcas e influenciadoras estão deixando de lado o excesso de acessórios e cores neon para abraçar a sofisticação do "clean look".
        </p>
        
        <blockquote className="font-sans text-2xl md:text-3xl border-l-4 border-black pl-10 py-2 my-10 italic font-normal leading-tight text-neutral-900">
          “O estilo não é sobre ser notado logo de cara, mas sim sobre ser lembrado pela harmonia dos detalhes.”
        </blockquote>
        
        <h4 className="text-3xl font-['Quandco'] mt-10 mb-5">Cores Neutras e Cortes Estruturados</h4>
        
        <p className="text-lg md:text-xl mb-8 text-neutral-800 leading-relaxed">
          Diferente do que muitos pensam, o minimalismo não é sem graça. Ele foca na qualidade dos tecidos e na precisão do corte. Para a moda teen, isso se traduz em conjuntos de alfaiataria desconstruídos, camisetas de algodão premium e o uso inteligente de tons de off-white, bege e cinza mescla. <br /><br />
          
          Essa mudança também reflete uma consciência maior sobre consumo. A Fashion Girl entende que uma peça minimalista é versátil e atemporal, permitindo inúmeras combinações sem perder a essência. É o famoso guarda-roupa inteligente, onde poucas peças criam muitos looks.
        </p>
      </>
    )
  },
  'default': {
    date: 'MARÇO 20, 2024',
    title: 'Explorando as Novas Fronteiras da Moda Teen',
    subtitle: 'Como a tecnologia e a sustentabilidade estão moldando o futuro das passarelas e do dia a dia.',
    mainImage: 'https://images.unsplash.com/photo-1529139513065-07b3b1c5921b?q=80&w=1450',
    author: {
      name: 'Marina Silva',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marina'
    },
    content: (
      <>
        <p className="text-lg md:text-xl mb-8 text-neutral-800 leading-relaxed">
          <span className="float-left font-['Quandco'] text-[4.5rem] leading-[0.8] pt-[10px] pr-[15px]">T</span>
          ransformação é a palavra de ordem. A moda teen não é mais apenas sobre seguir o que está nas revistas, mas sobre expressar valores e identidade de forma autêntica. Neste artigo, mergulhamos nas tendências que estão definindo o comportamento da geração Z.
        </p>
        <blockquote className="font-sans text-2xl md:text-3xl border-l-4 border-black pl-10 py-2 my-10 italic font-normal leading-tight text-neutral-900">
          “Moda é a armadura para sobreviver à realidade do cotidiano.”
        </blockquote>
      </>
    )
  }
};

const relatedPosts = [
  {
    title: 'Guia de Acessórios Gold',
    excerpt: 'Como usar acessórios dourados para elevar o look básico ao extraordinário.',
    image: 'https://images.unsplash.com/photo-1529139513477-323c66b62adc?auto=format&fit=crop&q=80&w=400',
    slug: 'guia-acessorios-gold'
  },
  {
    title: 'Streetwear Chic',
    excerpt: 'O equilíbrio perfeito entre o conforto das ruas e a elegância da passarela.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=400',
    slug: 'streetwear-chic'
  },
  {
    title: 'Sustentabilidade Fashion',
    excerpt: 'Por que o consumo consciente é a tendência mais importante desta década.',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=400',
    slug: 'sustentabilidade-fashion'
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : 'default';
  const post = postData[slug] || postData['default'];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          {/* Título e Subtítulo */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeIn>
              <div className="text-[12px] font-bold text-neutral-400 uppercase tracking-[2px] mb-4">
                {post.date}
              </div>
              <h1 className="text-4xl md:text-6xl font-['Quandco'] leading-[1.1] mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                {post.subtitle}
              </p>
            </FadeIn>
          </div>

          {/* Imagem Principal */}
          <FadeIn delay={200}>
            <div className="w-full h-[400px] md:h-[600px] mb-20 overflow-hidden">
              <img 
                src={post.mainImage} 
                alt={post.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          </FadeIn>

          {/* Grid do Artigo */}
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-16 mb-20">
            {/* Sidebar do Autor (Sticky) */}
            <aside className="hidden md:block">
              <div className="sticky top-32 flex flex-col items-start">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-5 bg-neutral-100">
                  <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-[2px] bg-black mb-4"></div>
                <div className="text-[12px] uppercase text-neutral-400 font-bold mb-1 tracking-widest">Escrito por</div>
                <h3 className="text-2xl font-['Quandco']">{post.author.name}</h3>
              </div>
            </aside>

            {/* Conteúdo do Artigo */}
            <article className="max-w-3xl">
              <div className="prose prose-neutral max-w-none">
                {post.content}
              </div>

              {/* Ações: Curtir e Compartilhar */}
              <div className="flex gap-6 pt-10 border-t border-neutral-100 mt-16">
                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
                  <Heart className="w-5 h-5" />
                  Curtir
                </button>
                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
                  <Share2 className="w-5 h-5" />
                  Compartilhar!
                </button>
              </div>
            </article>
          </div>

          {/* Seção Relacionados */}
          <div className="mt-24">
            <div className="flex items-center gap-5 mb-10">
              <div className="flex-1 h-[1px] bg-neutral-100"></div>
              <h2 className="text-3xl font-['Quandco']">Artigos Relacionados</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {relatedPosts.map((related, i) => (
                <Link key={i} href={`/blog/${related.slug}`} className="group block">
                  <div className="w-full h-[250px] overflow-hidden mb-5">
                    <img 
                      src={related.image} 
                      alt={related.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <h3 className="text-2xl font-['Quandco'] mb-3 group-hover:underline">{related.title}</h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{related.excerpt}</p>
                  <span className="text-[12px] font-bold uppercase tracking-widest border-b border-black pb-1">Ler Mais</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
