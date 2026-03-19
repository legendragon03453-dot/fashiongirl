
"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const slides = [
  {
    title: "O Retorno do Minimalismo: Como menos se tornou o novo 'must-have' da moda teen.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=80",
    slug: 'retorno-do-minimalismo'
  },
  {
    title: "Como combinar acessórios minimalistas com looks teen",
    image: "https://images.unsplash.com/photo-1529139513055-119797896d1c?auto=format&fit=crop&w=1920&q=80",
    slug: 'acessorios-minimalistas'
  },
  {
    title: "A história por trás da nossa nova coleção exclusiva",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80",
    slug: 'historia-nova-colecao'
  },
  {
    title: "5 Dicas de looks para arrasar no seu primeiro evento oficial",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80",
    slug: 'looks-primeiro-evento'
  }
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="max-w-7xl mx-auto px-5 pb-20">
      <div className="relative overflow-hidden h-[600px] rounded-none">
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={cn(
                "min-w-full relative w-full flex-shrink-0 h-full overflow-hidden",
                currentSlide === index ? "active-slide" : ""
              )}
            >
              <Link href={`/blog/${slide.slug}`} className="w-full h-full block image-zoom-animation">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover" 
                />
              </Link>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 md:p-20 text-white">
                <h3 className="text-2xl md:text-4xl font-bold max-w-2xl leading-tight">
                  {slide.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 space-x-6">
        <button 
          onClick={prevSlide}
          className="w-14 h-14 flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-transform hover:scale-105 active:scale-95 rounded-none"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex space-x-3 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-3 transition-all duration-300 rounded-none border-none p-0",
                currentSlide === i ? "w-10 bg-black" : "w-3 bg-neutral-300"
              )}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className="w-14 h-14 flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-transform hover:scale-105 active:scale-95 rounded-none"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};
