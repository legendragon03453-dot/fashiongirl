
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Categoria', href: '/categoria' },
    { name: 'Catálogo', href: '#' },
    { name: 'Blog', href: '/' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black border-b border-black">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <img 
                  className="h-10 w-auto" 
                  src="https://raw.githubusercontent.com/legendragon03453-dot/fashiongirl/main/691f0ec81205d846a3e7709f_Logo%20Fashion%20Girl%20fornecedor%20de%20moda%20teen%20feminina%20atacado%20branco%20(1).svg" 
                  alt="Fashion Girl" 
                />
              </Link>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-bold text-white hover:text-gray-300 transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(true)} className="text-white p-2">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-[60] flex flex-col p-8 md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end">
          <button onClick={() => setIsMenuOpen(false)} className="text-3xl text-black">
            <X className="h-8 w-8" />
          </button>
        </div>
        <div className="flex flex-col space-y-6 mt-10 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-bold uppercase transition-colors text-black hover:text-gray-600"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
