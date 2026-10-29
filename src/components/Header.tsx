'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, ChevronRight, Phone } from 'lucide-react';
import { useBag } from '@/context/BagContext';
import { getAllCategories, getStoreInfo } from '@/lib/catalog';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { totalCount } = useBag();
  const categories = getAllCategories();
  const store = getStoreInfo();

  // Scroll listener for sticky glass header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Calçados', href: '/categoria/calcados' },
    { label: 'Camisas Polo', href: '/categoria/camisas-polo' },
    { label: 'Perfumes', href: '/categoria/perfumes-importados' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0908]/90 backdrop-blur-md border-b border-[#D7A574]/15 shadow-xl shadow-black/40 py-3.5'
            : 'bg-gradient-to-b from-[#0B0908]/90 via-[#0B0908]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile: Hamburger on left */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#F6F3EE] hover:text-[#D7A574] transition-colors focus:outline-none"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
              <Link href="/" className="inline-flex items-center group">
                <div className="relative h-9 sm:h-11 w-40 sm:w-48 transition-transform duration-300 group-hover:scale-[1.02]">
                  <Image
                    src="/brand/bradan-conceito-bronze.png"
                    alt="BRADAN CONCEITO"
                    fill
                    priority
                    sizes="(max-width: 640px) 160px, 192px"
                    className="object-contain object-left md:object-left"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs uppercase tracking-[0.22em] font-medium transition-all duration-200 relative py-1 ${
                      isActive
                        ? 'text-[#D7A574]'
                        : 'text-[#F6F3EE]/80 hover:text-[#D7A574]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D7A574] to-transparent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons: Search & Sacola */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-[#F6F3EE]/80 hover:text-[#D7A574] transition-colors focus:outline-none"
                aria-label="Pesquisar produtos"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              <Link
                href="/sacola"
                className="p-2 text-[#F6F3EE]/80 hover:text-[#D7A574] transition-colors relative focus:outline-none"
                aria-label="Sacola de interesse"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#B47A4B] to-[#D7A574] text-[#0B0908] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {totalCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Quick Search Dropdown Bar */}
          {isSearchOpen && (
            <div className="mt-4 pt-3 border-t border-[#D7A574]/15 transition-all">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/catalogo?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="relative flex items-center"
              >
                <Search className="w-4 h-4 text-[#D7A574] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar peças, marcas (Ralph Lauren, Aramis, Loafers, etc.)..."
                  autoFocus
                  className="w-full bg-[#140F0D] border border-[#D7A574]/30 rounded-none pl-10 pr-24 py-2.5 text-sm text-[#F6F3EE] placeholder-[#9A928B] focus:outline-none focus:border-[#D7A574] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 bg-[#B47A4B] hover:bg-[#D7A574] text-[#0B0908] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Buscar
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer / Fullscreen Refined Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-xs bg-[#0B0908] border-r border-[#D7A574]/20 p-6 flex flex-col justify-between overflow-y-auto h-full shadow-2xl">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#D7A574]/15">
                <div className="relative h-8 w-36">
                  <Image
                    src="/brand/bradan-conceito-bronze.png"
                    alt="BRADAN CONCEITO"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#9A928B] hover:text-[#D7A574]"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="py-6 space-y-4">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm uppercase tracking-[0.2em] font-medium text-[#F6F3EE] hover:text-[#D7A574] transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Categories list in mobile drawer */}
              <div className="pt-4 border-t border-[#D7A574]/15">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D7A574] font-semibold mb-3">
                  Categorias em Destaque
                </p>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/categoria/${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2 text-xs text-[#9A928B] hover:text-[#F6F3EE] transition-colors"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D7A574]/60" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-[#D7A574]/15 text-xs text-[#9A928B] space-y-2">
              <p className="text-[#F6F3EE] font-medium text-xs">Atendimento Personalizado</p>
              <Link
                href={`https://wa.me/${store.whatsapp}`}
                target="_blank"
                className="inline-flex items-center text-[#D7A574] hover:underline space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Oficial</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
