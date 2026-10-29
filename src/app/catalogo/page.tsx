import React from 'react';
import type { Metadata } from 'next';
import { getAllProducts, getAllCategories } from '@/lib/catalog';
import CatalogBrowser from '@/components/CatalogBrowser';

export const metadata: Metadata = {
  title: 'Catálogo Geral | BRADAN CONCEITO',
  description: 'Explore nossa coleção completa de moda masculina premium, calçados nobres, perfumaria importada e peças exclusivas.',
};

export default function CatalogoPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D7A574] font-medium">
          Acervo Completo
        </span>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#F6F3EE]">
          NOSSA COLEÇÃO.
        </h1>
        <p className="text-sm text-[#9A928B] max-w-md mx-auto leading-relaxed">
          Peças autênticas selecionadas a dedo. Consulte disponibilidade, tamanhos e valores diretamente via WhatsApp.
        </p>
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#D7A574] to-transparent mx-auto mt-4" />
      </div>

      {/* Interactive Catalog Browser */}
      <CatalogBrowser initialProducts={products} categories={categories} />
    </div>
  );
}
