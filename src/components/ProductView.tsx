'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MessageCircle,
  ShoppingBag,
  Check,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Product } from '@/types';
import { useBag } from '@/context/BagContext';
import { buildProductWhatsAppLink } from '@/lib/catalog';

interface ProductViewProps {
  product: Product;
}

export default function ProductView({ product }: ProductViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [copied, setCopied] = useState(false);
  const { addItem, isInBag } = useBag();
  const inBag = isInBag(product.id);

  // Generate WhatsApp link using client current origin if available
  const currentHost = typeof window !== 'undefined' ? window.location.origin : '';
  const waLink = buildProductWhatsAppLink(product, currentHost);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      {/* Left Column: Gallery (7 Cols on LG) */}
      <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
        {/* Thumbnails (if multiple images) */}
        {product.images.length > 1 && (
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[580px] shrink-0 pb-2 md:pb-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 shrink-0 bg-[#140F0D] border transition-all overflow-hidden ${
                  selectedImage === idx
                    ? 'border-[#D7A574] ring-1 ring-[#D7A574]'
                    : 'border-[#D7A574]/20 hover:border-[#D7A574]/50 opacity-70 hover:opacity-100'
                }`}
                aria-label={`Ver foto ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} miniatura ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Image Display */}
        <div className="relative flex-1 aspect-[4/5] bg-[#140F0D] border border-[#D7A574]/20 overflow-hidden group">
          <Image
            src={product.images[selectedImage] || product.mainImage}
            alt={`${product.name} foto ${selectedImage + 1} - ${product.category} BRADAN MODA MASCULINA`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-contain sm:object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Photo indicator badge */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-[#0B0908]/80 backdrop-blur-md px-3 py-1 text-xs text-[#D7A574] border border-[#D7A574]/20">
              {selectedImage + 1} / {product.images.length}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Product Information & CTAs (5 Cols on LG) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          {/* Category & Brand tags */}
          <div className="flex items-center space-x-2">
            <Link
              href={`/categoria/${product.categorySlug}`}
              className="text-xs uppercase tracking-[0.25em] text-[#D7A574] hover:underline font-semibold"
            >
              {product.category}
            </Link>
            {product.brand && (
              <>
                <span className="text-[#9A928B]">•</span>
                <span className="text-xs uppercase tracking-wider text-[#9A928B]">
                  {product.brand}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F6F3EE] tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="py-2">
            <span className="text-xl sm:text-2xl font-serif text-[#D7A574] tracking-wide">
              {product.price || 'Consultar valor'}
            </span>
            <p className="text-xs text-[#9A928B] mt-1">
              Atendimento exclusivo para consulta de valores e formas de pagamento.
            </p>
          </div>

          <div className="h-[1px] bg-[#D7A574]/15" />

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D7A574] font-medium">
              Detalhes da Peça
            </h4>
            <p className="text-sm text-[#9A928B] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Call to action buttons */}
          <div className="pt-4 space-y-3">
            {/* Primary CTA: WhatsApp */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2.5 transition-all shadow-lg hover:shadow-green-950/40"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Consultar pelo WhatsApp</span>
            </a>

            {/* Secondary CTA: Add to Bag */}
            <button
              type="button"
              onClick={() => addItem(product)}
              className={`w-full py-3.5 px-6 border text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2 transition-all ${
                inBag
                  ? 'bg-[#B47A4B] text-[#0B0908] border-[#B47A4B]'
                  : 'bg-[#140F0D] hover:bg-[#D7A574]/10 text-[#F6F3EE] border-[#D7A574]/30 hover:border-[#D7A574]'
              }`}
            >
              {inBag ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Item na Sacola de Interesse</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#D7A574]" />
                  <span>Adicionar à Sacola de Interesse</span>
                </>
              )}
            </button>

            {/* Share link button */}
            <button
              type="button"
              onClick={handleShare}
              className="w-full py-2.5 text-xs text-[#9A928B] hover:text-[#D7A574] flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link copiado!' : 'Compartilhar peça'}</span>
            </button>
          </div>
        </div>

        {/* Reassurance items */}
        <div className="pt-6 border-t border-[#D7A574]/15 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#9A928B]">
          <div className="flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-[#D7A574] shrink-0 mt-0.5" />
            <span>Produto 100% original com fotos reais do acervo.</span>
          </div>
          <div className="flex items-start space-x-2.5">
            <Truck className="w-4 h-4 text-[#D7A574] shrink-0 mt-0.5" />
            <span>Envios seguros para todo o Brasil.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
