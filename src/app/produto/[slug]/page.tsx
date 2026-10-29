import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/catalog';
import ProductView from '@/components/ProductView';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: 'Produto não encontrado' };
  }

  const title = product.name;
  const description = `${product.name} — ${product.category}. Acabamento primoroso e materiais selecionados no catálogo oficial BRADAN MODA MASCULINA. Consulte disponibilidade e valor via WhatsApp.`;
  const url = `https://bradanconceito.com.br/produto/${product.slug}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      product.brand || 'BRADAN Moda Masculina',
      'moda masculina',
      'peça original',
      'catálogo digital',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} | BRADAN MODA MASCULINA`,
      description,
      url,
      siteName: 'BRADAN MODA MASCULINA',
      images: product.images.map(img => ({
        url: img,
        alt: `${product.name} - BRADAN MODA MASCULINA`,
      })),
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | BRADAN MODA MASCULINA`,
      description,
      images: [product.mainImage],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.slug, 4);

  // Schema.org Product Rich Snippet
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map(img => `https://bradanconceito.com.br${img}`),
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'BRADAN MODA MASCULINA',
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: product.price ? product.price.replace(/[^0-9,.]/g, '') : undefined,
      availability: 'https://schema.org/InStock',
      url: `https://bradanconceito.com.br/produto/${product.slug}`,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'ClothingStore',
        name: 'BRADAN MODA MASCULINA',
      },
    },
  };

  // Schema.org BreadcrumbList Rich Snippet
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: 'https://bradanconceito.com.br',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Catálogo',
        item: 'https://bradanconceito.com.br/catalogo',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.category,
        item: `https://bradanconceito.com.br/categoria/${product.categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://bradanconceito.com.br/produto/${product.slug}`,
      },
    ],
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb Visual Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#9A928B] mb-8 overflow-x-auto pb-1">
        <Link href="/" className="hover:text-[#F6F3EE] transition-colors shrink-0">
          Início
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#D7A574]/50 shrink-0" />
        <Link href="/catalogo" className="hover:text-[#F6F3EE] transition-colors shrink-0">
          Catálogo
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#D7A574]/50 shrink-0" />
        <Link
          href={`/categoria/${product.categorySlug}`}
          className="hover:text-[#F6F3EE] transition-colors shrink-0"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#D7A574]/50 shrink-0" />
        <span className="text-[#D7A574] truncate shrink-0">{product.name}</span>
      </nav>

      {/* Main Product View Component */}
      <ProductView product={product} />

      {/* Related Products Section */}
      {related.length > 0 && (
        <div className="mt-24 pt-16 border-t border-[#D7A574]/15">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D7A574] font-medium block">
                Sugestões de Composição
              </span>
              <h2 className="text-xl sm:text-2xl font-normal text-[#F6F3EE] tracking-tight uppercase">
                PRODUTOS RELACIONADOS
              </h2>
            </div>
            <Link
              href={`/categoria/${product.categorySlug}`}
              className="text-xs uppercase tracking-wider text-[#D7A574] hover:underline"
            >
              Ver mais em {product.category}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
