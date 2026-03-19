
"use client"

import React from 'react';
import Link from 'next/link';
import { FadeIn } from './fade-in';

const otherPosts = [
  {
    title: 'Designers who changed the web',
    excerpt: 'Explicabo quia possimus repudiandae esse qui. Quas mollitia voluptas eum sed officia est excepturi explicabo rerum.',
    category: 'Fundraising',
    readTime: '6 min',
    date: 'Jul 27',
    image: 'https://picsum.photos/seed/blog1/400/300'
  },
  {
    title: 'Why we love Webflow (and you should, too!)',
    excerpt: 'Facere illo quas explicabo quae minima voluptatem consequatur laborum modi. Asperiores ducimus esse.',
    category: 'Business',
    readTime: '12 min',
    date: 'Nov 22',
    image: 'https://picsum.photos/seed/blog2/400/300'
  },
  {
    title: '10 things nobody told you about being a designer',
    excerpt: 'Aut est officia eos qui. Odio aut modi similique voluptatibus est vero. Alias fuga praesentium.',
    category: 'Advice',
    readTime: '7 min',
    date: 'Jul 27',
    image: 'https://picsum.photos/seed/blog3/400/300'
  },
  {
    title: '7 things about web design your boss wants to know',
    excerpt: 'Culpa non amet. Autem est sed in itaque reiciendis dicta id. Aut porro occaecati fugit.',
    category: 'Technology',
    readTime: '12 min',
    date: 'Jul 27',
    image: 'https://picsum.photos/seed/blog4/400/300'
  }
];

export const OtherPosts = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 pb-24 border-t border-neutral-200 pt-16">
      <FadeIn className="mb-12">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest border-b-2 border-black pb-3 inline-block">
          outros assuntos sobre a fashion
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
        {otherPosts.map((post, i) => (
          <FadeIn key={i} delay={i * 100}>
            <Link href="#" className="flex flex-col-reverse sm:flex-row gap-6 group border-b border-neutral-100 pb-8 items-center">
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-black mb-3 leading-snug group-hover:underline uppercase tracking-tight">
                  {post.title}
                </h3>
                <p className="text-neutral-600 mb-4 line-clamp-2 text-sm font-medium">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap items-center text-[10px] text-neutral-500 font-black tracking-widest uppercase gap-2">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <div className="w-full sm:w-48 aspect-square sm:aspect-[4/3] overflow-hidden shrink-0 bg-neutral-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
