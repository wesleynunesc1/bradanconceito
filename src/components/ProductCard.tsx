'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Product } from '@/types';
import { useBag } from '@/context/BagContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem, isInBag } = useBag();
  const inBag = isInBag(product.id);

  return (
    <div className="group relative flex flex-col bg-[#140F0D] border border-[#D7A574]/15 hover:border-[#D7A574]/40 transition-all duration-300 overflow-hidden">
      {/* Image container with 4:5 luxury aspect ratio */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative block w-full aspect-[4/5] overflow-hidden bg-[#0F0C0A]"
      >
        <Image
          src={product.mainImage}
          alt={`${product.name} - ${product.category} Bradan Moda Masculina`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle shadow overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0908]/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

        {/* Gallery badge if multiple photos exist */}
        {product.images.length > 1 && (
          <div className="absolute top-2.5 left-2.5 bg-[#0B0908]/75 backdrop-blur-md px-2 py-0.5 text-[9px] uppercase tracking-widest text-[#D7A574] border border-[#D7A574]/20">
            {product.images.length} fotos
          </div>
        )}

        {/* Brand badge */}
        {product.brand && product.brand !== 'Bradan Moda Masculina' && (
          <div className="absolute top-2.5 right-2.5 bg-[#0B0908]/75 backdrop-blur-md px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#F6F3EE] border border-[#D7A574]/20">
            {product.brand}
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#D7A574]/80 font-medium block mb-1">
            {product.category}
          </span>
          <Link href={`/produto/${product.slug}`}>
            <h3 className="text-sm font-medium text-[#F6F3EE] hover:text-[#D7A574] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="pt-2 border-t border-[#D7A574]/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#D7A574] tracking-wide">
              {product.price || 'Consultar valor'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Add to Interest Bag */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              title={inBag ? 'Item na sacola' : 'Adicionar à sacola de interesse'}
              className={`p-2 transition-all duration-200 border ${
                inBag
                  ? 'bg-[#B47A4B] text-[#0B0908] border-[#B47A4B]'
                  : 'bg-[#181310] text-[#D7A574] border-[#D7A574]/25 hover:border-[#D7A574] hover:bg-[#D7A574] hover:text-[#0B0908]'
              }`}
              aria-label="Adicionar à sacola"
            >
              {inBag ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            </button>

            {/* View Details */}
            <Link
              href={`/produto/${product.slug}`}
              className="p-2 bg-[#181310] text-[#9A928B] hover:text-[#F6F3EE] border border-[#D7A574]/25 hover:border-[#D7A574] transition-all"
              title="Ver detalhes do produto"
              aria-label="Ver detalhes"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
