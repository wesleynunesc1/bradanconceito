import React from 'react';
import type { Metadata } from 'next';
import { getAllProducts, getAllCategories } from '@/lib/catalog';
import CatalogBrowser from '@/components/CatalogBrowser';

export const metadata: Metadata = {
  title: 'Catálogo Completo | Bradan Moda Masculina',
  description: 'Explore nossa coleção completa de moda masculina premium, calçados nobres, perfumaria importada e alfaiataria casual.',
  alternates: {
    canonical: 'https://bradanconceito.com.br/catalogo',
  },
  openGraph: {
    title: 'Catálogo Geral | Bradan Moda Masculina',
    description: 'Catálogo exclusivo da Bradan Moda Masculina, calçados e perfumaria com consulta via WhatsApp.',
    url: 'https://bradanconceito.com.br/catalogo',
    siteName: 'Bradan Moda Masculina',
    images: [
      {
        url: '/brand/bradan-logo.png',
        width: 1115,
        height: 755,
        alt: 'Catálogo Bradan Moda Masculina',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo Geral | Bradan Moda Masculina',
    description: 'Explore nossa coleção completa de moda masculina premium e calçados nobres.',
    images: ['/brand/bradan-logo.png'],
  },
};

export default function CatalogoPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  const catalogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Catálogo Completo Bradan Moda Masculina',
    description: 'Curadoria completa de moda masculina e acessórios selecionados.',
    url: 'https://bradanconceito.com.br/catalogo',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((prod, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `https://bradanconceito.com.br/produto/${prod.slug}`,
        name: prod.name,
      })),
    },
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />

      {/* Editorial Header */}
      <header className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D7A574] font-medium">
          Acervo Completo
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F6F3EE] uppercase">
          NOSSA COLEÇÃO
        </h1>
        <p className="text-sm text-[#9A928B] max-w-md mx-auto leading-relaxed">
          Peças autênticas selecionadas a dedo. Consulte disponibilidade, tamanhos e valores diretamente via WhatsApp.
        </p>
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#D7A574] to-transparent mx-auto mt-4" />
      </header>

      {/* Interactive Catalog Browser */}
      <CatalogBrowser initialProducts={products} categories={categories} />
    </div>
  );
}
