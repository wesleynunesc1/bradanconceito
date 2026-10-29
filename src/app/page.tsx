import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, MessageCircle, Award } from 'lucide-react';
import {
  getAllCategories,
  getFeaturedProducts,
  getNewArrivals,
  getStoreInfo,
} from '@/lib/catalog';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Bradan Moda Masculina | Loja Online & Catálogo Digital',
  description: 'O essencial não precisa ser comum. Catálogo digital exclusivo da Bradan Moda Masculina, calçados nobres em couro, perfumaria importada e peças selecionadas.',
  alternates: {
    canonical: 'https://bradanconceito.com.br',
  },
};

export default function HomePage() {
  const categories = getAllCategories();
  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(4);
  const store = getStoreInfo();

  return (
    <div className="w-full flex flex-col pt-24 sm:pt-32">
      {/* SEÇÃO 01 — CATEGORIAS EM DESTAQUE */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header editorial compacto */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 border border-[#D7A574]/30 bg-[#16100D]/80 backdrop-blur-sm text-[10px] uppercase tracking-[0.25em] text-[#D7A574]">
            <Award className="w-3.5 h-3.5" />
            <span>Curadoria Masculina Premium</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F6F3EE] uppercase font-sans">
            EXPLORE NOSSO UNIVERSO
          </h1>
          <p className="text-xs sm:text-sm text-[#9A928B] max-w-lg mx-auto font-light leading-relaxed">
            Peças autênticas selecionadas a dedo. Conheça as coleções de calçados nobres, perfumaria importada e alfaiataria casual.
          </p>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#D7A574] to-transparent mx-auto mt-4" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="group relative h-72 sm:h-88 overflow-hidden border border-[#D7A574]/15 hover:border-[#D7A574]/50 transition-all duration-500 bg-[#140F0D]"
            >
              <Image
                src={cat.coverImage}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0908] via-[#0B0908]/40 to-transparent group-hover:via-[#0B0908]/20 transition-all duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D7A574] font-medium">
                  {cat.productCount} {cat.productCount === 1 ? 'peça' : 'peças'}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-[#F6F3EE] group-hover:text-[#D7A574] transition-colors uppercase tracking-wide">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#9A928B] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center text-xs text-[#D7A574] font-medium tracking-wider uppercase group-hover:translate-x-1 transition-transform">
                  <span>Explorar peças</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all categories link */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/catalogo"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] text-[#D7A574] hover:text-[#ECC8A4] transition-colors font-semibold pb-1 border-b border-[#D7A574]/30"
          >
            <span>Ver todas as {categories.length} categorias</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SEÇÃO 02 — SELEÇÃO BRADAN */}
      <section id="curadoria" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-[#D7A574]/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#D7A574] font-medium">
              Destaques Selecionados
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F6F3EE] uppercase">
              UMA CURADORIA DE ESTILO
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#D7A574] hover:text-[#ECC8A4] transition-colors font-semibold"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SEÇÃO 03 — MANIFESTO DA MARCA */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#140F0D] via-[#0B0908] to-[#140F0D] border-y border-[#D7A574]/20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#B47A4B]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          <div className="inline-block relative h-16 w-56 sm:w-64 mx-auto mb-2">
            <Image
              src="/brand/bradan-logo.png"
              alt="Bradan Moda Masculina"
              fill
              className="object-contain"
            />
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#F6F3EE] tracking-tight">
            Mais do que vestir, <span className="text-bronze-gradient font-normal">expressar quem você é.</span>
          </h3>

          <p className="text-sm sm:text-base text-[#9A928B] max-w-2xl mx-auto leading-relaxed font-light">
            Acreditamos que estilo está nos detalhes, nas escolhas e na maneira como cada pessoa constrói sua própria identidade. Nossa curadoria reúne peças autênticas com acabamento nobre, presença marcante e sofisticação atemporal.
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              href="/catalogo"
              className="px-8 py-3.5 border border-[#D7A574]/40 hover:bg-[#D7A574]/10 text-xs uppercase tracking-[0.22em] text-[#D7A574] transition-all font-semibold"
            >
              Explorar Catálogo Completo
            </Link>
          </div>
        </div>
      </section>

      {/* SEÇÃO 04 — NOVIDADES */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#D7A574] font-medium">
              Catálogo Atualizado
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F6F3EE] uppercase">
              NOVIDADES NO ACERVO
            </h2>
          </div>
          <p className="text-xs text-[#9A928B] max-w-xs">
            Peças adicionadas recentemente, prontas para consulta e envio imediato.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SEÇÃO 05 — ATENDIMENTO PERSONALIZADO */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-[#16110E] border border-[#D7A574]/25 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-5">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#D7A574] font-semibold block">
              Atendimento Exclusivo
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F6F3EE] uppercase">
              SEU ESTILO, <br />
              <span className="text-bronze-gradient">
                NOSSA PRIORIDADE.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9A928B] leading-relaxed">
              Encontrou uma peça que combina com você? Converse com nossa equipe e consulte modelos, tamanhos e disponibilidade. Atendimento ágil e consultoria personalizada via WhatsApp.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
                  '👋 Olá! Gostaria de falar com a equipe da Bradan Moda Masculina para consultar modelos e disponibilidade 👔🛍️'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-green-900/30"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Decorative background logo */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 pointer-events-none hidden lg:block">
            <Image
              src="/brand/bradan-logo.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
