'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, MessageCircle, ArrowRight, ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useBag } from '@/context/BagContext';
import { buildBagWhatsAppLink, getStoreInfo } from '@/lib/catalog';

export default function SacolaPage() {
  const { items, removeItem, clearBag, totalCount } = useBag();
  const store = getStoreInfo();

  const currentHost = typeof window !== 'undefined' ? window.location.origin : '';
  const waLink = buildBagWhatsAppLink(items, currentHost);

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D7A574] font-medium">
          Seleção Personalizada
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F6F3EE]">
          SACOLA DE INTERESSE
        </h1>
        <p className="text-xs sm:text-sm text-[#9A928B] leading-relaxed">
          Reúna suas peças preferidas e consulte modelos, tamanhos e valores diretamente com nossa equipe via WhatsApp em um único atendimento.
        </p>
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#D7A574] to-transparent mx-auto mt-4" />
      </div>

      {totalCount > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#D7A574]/15 text-xs text-[#9A928B]">
              <span>
                {totalCount} {totalCount === 1 ? 'item selecionado' : 'itens selecionados'}
              </span>
              <button
                type="button"
                onClick={clearBag}
                className="text-xs text-[#D7A574] hover:underline"
              >
                Esvaziar sacola
              </button>
            </div>

            <div className="divide-y divide-[#D7A574]/10">
              {items.map(({ product }) => (
                <div
                  key={product.id}
                  className="py-4 flex items-center justify-between gap-4 group"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/produto/${product.slug}`}
                    className="relative w-20 h-24 sm:w-24 sm:h-28 bg-[#140F0D] border border-[#D7A574]/20 shrink-0 overflow-hidden"
                  >
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#D7A574]">
                      {product.category}
                    </span>
                    <Link href={`/produto/${product.slug}`}>
                      <h3 className="text-sm font-medium text-[#F6F3EE] hover:text-[#D7A574] transition-colors truncate">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#D7A574] font-medium mt-1">
                      {product.price || 'Consultar valor'}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="p-2 text-[#9A928B] hover:text-red-400 transition-colors"
                    title="Remover peça da sacola"
                    aria-label={`Remover ${product.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#D7A574] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continuar explorando o catálogo</span>
              </Link>
            </div>
          </div>

          {/* Checkout / WhatsApp Summary Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#140F0D] border border-[#D7A574]/25 p-6 sm:p-8 space-y-6">
            <h3 className="text-sm uppercase tracking-[0.2em] text-[#D7A574] font-semibold">
              Resumo da Consulta
            </h3>

            <div className="space-y-3 text-xs text-[#9A928B] border-t border-[#D7A574]/15 pt-4">
              <div className="flex justify-between">
                <span>Total de peças:</span>
                <span className="text-[#F6F3EE] font-medium">{totalCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Modalidade:</span>
                <span className="text-[#F6F3EE] font-medium">Catálogo Digital VIP</span>
              </div>
              <div className="flex justify-between">
                <span>Atendimento:</span>
                <span className="text-[#D7A574] font-medium">WhatsApp Oficial</span>
              </div>
            </div>

            <div className="p-4 bg-[#0B0908] border border-[#D7A574]/20 space-y-2 text-xs text-[#9A928B]">
              <p className="text-[#F6F3EE] font-medium text-xs">Como funciona?</p>
              <p className="leading-relaxed">
                Ao clicar no botão abaixo, uma mensagem estruturada com os nomes e links de todas as peças selecionadas será enviada ao nosso WhatsApp para confirmarmos disponibilidade e valores.
              </p>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2.5 transition-all shadow-xl hover:shadow-green-950/40"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Consultar Sacola no WhatsApp</span>
            </a>

            <div className="flex items-center space-x-2 text-[11px] text-[#79736E] justify-center pt-2">
              <ShieldCheck className="w-4 h-4 text-[#D7A574]" />
              <span>Sem pagamento online • Atendimento humano direto</span>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Bag State */
        <div className="py-20 text-center space-y-5 bg-[#140F0D]/50 border border-[#D7A574]/20 p-8 sm:p-12">
          <div className="w-16 h-16 rounded-full border border-[#D7A574]/30 flex items-center justify-center mx-auto text-[#D7A574]">
            <ShoppingBag className="w-7 h-7 stroke-[1.2]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-serif text-[#F6F3EE]">Sua sacola está vazia</h3>
            <p className="text-xs text-[#9A928B] max-w-sm mx-auto">
              Navegue pelo nosso catálogo de calçados, camisas, perfumes e selecione as peças que deseja consultar.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/catalogo"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-bronze-gradient text-[#0B0908] font-semibold text-xs uppercase tracking-[0.2em] transition-all"
            >
              <span>Explorar Catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
