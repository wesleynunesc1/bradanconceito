'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';

interface CatalogBrowserProps {
  initialProducts: Product[];
  categories: Category[];
}

function CatalogContent({ initialProducts, categories }: CatalogBrowserProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('categoria') || 'all';

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'category'>('name-asc');

  useEffect(() => {
    if (initialQuery) setSearch(initialQuery);
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialQuery, initialCategory]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesBrand = p.brand ? p.brand.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesCategory && !matchesBrand) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name, 'pt-BR');
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name, 'pt-BR');
      if (sortBy === 'category') return a.category.localeCompare(b.category, 'pt-BR');
      return 0;
    });
  }, [initialProducts, selectedCategory, search, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSortBy('name-asc');
  };

  const hasActiveFilters = search.trim() !== '' || selectedCategory !== 'all';

  return (
    <div className="w-full">
      {/* Search and Filters Bar */}
      <div className="bg-[#140F0D] border border-[#D7A574]/20 p-4 sm:p-6 mb-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#D7A574] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome, marca ou modelo..."
              className="w-full bg-[#0B0908] border border-[#D7A574]/25 px-10 py-2.5 text-xs text-[#F6F3EE] placeholder-[#9A928B] focus:outline-none focus:border-[#D7A574] transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A928B] hover:text-[#F6F3EE]"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full bg-[#0B0908] border border-[#D7A574]/25 px-3 py-2.5 text-xs text-[#F6F3EE] focus:outline-none focus:border-[#D7A574] transition-colors cursor-pointer"
            >
              <option value="all">Todas as Categorias ({initialProducts.length})</option>
              {categories.map(c => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.productCount})
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full bg-[#0B0908] border border-[#D7A574]/25 px-3 py-2.5 text-xs text-[#F6F3EE] focus:outline-none focus:border-[#D7A574] transition-colors cursor-pointer"
              >
                <option value="name-asc">Ordem: Nome (A - Z)</option>
                <option value="name-desc">Ordem: Nome (Z - A)</option>
                <option value="category">Ordem: Categoria</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Pills for Quick Filter */}
        <div className="pt-2 flex flex-wrap gap-2 items-center">
          <span className="text-[10px] uppercase tracking-wider text-[#9A928B] mr-1 hidden sm:inline-block">
            Filtrar:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-all border ${
              selectedCategory === 'all'
                ? 'bg-[#B47A4B] text-[#0B0908] border-[#B47A4B] font-semibold'
                : 'bg-[#0B0908] text-[#9A928B] border-[#D7A574]/20 hover:text-[#F6F3EE] hover:border-[#D7A574]/40'
            }`}
          >
            Todas ({initialProducts.length})
          </button>
          {categories.map(c => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setSelectedCategory(c.slug)}
              className={`px-3 py-1 text-[11px] uppercase tracking-wider transition-all border ${
                selectedCategory === c.slug
                  ? 'bg-[#B47A4B] text-[#0B0908] border-[#B47A4B] font-semibold'
                  : 'bg-[#0B0908] text-[#9A928B] border-[#D7A574]/20 hover:text-[#F6F3EE] hover:border-[#D7A574]/40'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Meta Bar: Product Count & Clear Filters */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D7A574]/15 text-xs text-[#9A928B]">
        <div>
          Exibindo <span className="text-[#D7A574] font-medium">{filteredProducts.length}</span>{' '}
          {filteredProducts.length === 1 ? 'peça encontrada' : 'peças encontradas'}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-[#D7A574] hover:underline flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Limpar filtros</span>
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center space-y-4 bg-[#140F0D]/60 border border-[#D7A574]/15 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-[#D7A574]">
            Nenhum produto encontrado
          </p>
          <p className="text-xs text-[#9A928B] max-w-sm mx-auto">
            Não encontramos peças com os critérios selecionados. Tente buscar por outro termo ou limpar os filtros.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={clearFilters}
              className="px-6 py-2.5 bg-[#B47A4B] text-[#0B0908] text-xs uppercase tracking-wider font-semibold hover:bg-[#D7A574] transition-colors"
            >
              Ver Todas as Peças
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CatalogBrowser(props: CatalogBrowserProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-[#D7A574]">Carregando catálogo...</div>}>
      <CatalogContent {...props} />
    </Suspense>
  );
}
