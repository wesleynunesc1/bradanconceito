import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/lib/catalog';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return { title: 'Categoria não encontrada | BRADAN CONCEITO' };
  }
  return {
    title: `${category.name} | Coleção BRADAN CONCEITO`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);
  const allCategories = getAllCategories();
  const otherCategories = allCategories.filter(c => c.slug !== category.slug);

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-[#9A928B] mb-8">
        <Link href="/" className="hover:text-[#F6F3EE] transition-colors">
          Início
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#D7A574]/50" />
        <Link href="/catalogo" className="hover:text-[#F6F3EE] transition-colors">
          Catálogo
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#D7A574]/50" />
        <span className="text-[#D7A574]">{category.name}</span>
      </nav>

      {/* Editorial Category Header */}
      <div className="bg-[#140F0D] border border-[#D7A574]/20 p-8 sm:p-12 mb-12 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D7A574] font-medium">
            Coleção Oficial
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#F6F3EE]">
            {category.name.toUpperCase()}
          </h1>
          <p className="text-sm sm:text-base text-[#9A928B] leading-relaxed pt-1">
            {category.description}
          </p>
          <div className="pt-2">
            <span className="text-xs text-[#D7A574] uppercase tracking-wider font-semibold">
              {products.length} {products.length === 1 ? 'modelo disponível' : 'modelos disponíveis'}
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-xs text-[#9A928B]">
          Nenhum produto cadastrado nesta categoria no momento.
        </div>
      )}

      {/* Other Categories Links */}
      <div className="mt-20 pt-12 border-t border-[#D7A574]/15">
        <h3 className="text-xs uppercase tracking-[0.25em] text-[#D7A574] font-semibold mb-6">
          Explorar Outras Coleções
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {otherCategories.map(c => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="px-4 py-2 bg-[#140F0D] hover:bg-[#D7A574] hover:text-[#0B0908] text-xs text-[#9A928B] hover:border-[#D7A574] border border-[#D7A574]/20 transition-all uppercase tracking-wider"
            >
              {c.name} ({c.productCount})
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
