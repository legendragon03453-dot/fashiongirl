"use client"

import React from 'react';
import Link from 'next/link';
import { FadeIn } from './fade-in';

export const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-black">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Conheça mais, a Fashion</h4>
            <div className="flex flex-col space-y-3">
              <Link href="#" className="text-neutral-500 hover:text-black transition-colors text-sm">Nossa História</Link>
              <Link href="#" className="text-neutral-500 hover:text-black transition-colors text-sm">Produtos</Link>
              <Link href="#" className="text-neutral-500 hover:text-black transition-colors text-sm">Guias de Medidas</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Suporte</h4>
            <div className="flex flex-col space-y-3">
              <Link href="#" className="text-neutral-500 hover:text-black transition-colors text-sm">Contato</Link>
              <Link href="#" className="text-neutral-500 hover:text-black transition-colors text-sm">Torne-se Parceiro</Link>
              <Link href="#" className="text-neutral-500 hover:text-black transition-colors text-sm">Consultora</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Dúvidas e Depoimentos</h4>
            <div className="flex flex-col space-y-3">
              <Link href="#" className="text-neutral-500 hover:text-black transition-colors text-sm">Dúvida</Link>
              <Link href="#" className="text-neutral-500 hover:text-black transition-colors text-sm">Depoimentos</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Informações Legais</h4>
            <div className="flex flex-col space-y-3">
              <Link href="#" className="text-neutral-500 hover:text-black transition-colors text-sm">Política de Privacidade</Link>
              <Link href="#" className="text-neutral-500 hover:text-black transition-colors text-sm">Troca e Devolução</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-bold uppercase tracking-widest mb-10">
          <Link href="#" className="hover:text-neutral-500 transition-colors">Whatsapp</Link>
          <span className="text-neutral-300">|</span>
          <Link href="#" className="hover:text-neutral-500 transition-colors">Instagram</Link>
          <span className="text-neutral-300">|</span>
          <Link href="#" className="hover:text-neutral-500 transition-colors">Catálogo</Link>
          <span className="text-neutral-300">|</span>
          <Link href="#" className="hover:text-neutral-500 transition-colors">Facebook</Link>
        </div>

        <div className="text-center text-xs font-medium text-neutral-400 space-y-2 border-t border-neutral-100 pt-8">
          <p>Endereço: R. Mendes Gonçalves, 246 - Pari, São Paulo - SP, 03027-010</p>
          <p>© Todos os direitos Reservados</p>
          <p>06.994.037/0001-69 - Oliver Gonçalves Confecções LTDA</p>
        </div>
      </div>
    </footer>
  );
};
