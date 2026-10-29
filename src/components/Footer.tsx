import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { getAllCategories, getStoreInfo } from '@/lib/catalog';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const categories = getAllCategories();
  const store = getStoreInfo();

  return (
    <footer className="bg-[#0A0706] border-t border-[#D7A574]/15 pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#B47A4B]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-[#D7A574]/10">
          {/* Brand Presentation */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative h-14 w-56">
                <Image
                  src="/brand/bradan-logo.png"
                  alt="Bradan Moda Masculina"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-[#9A928B] leading-relaxed max-w-sm">
              {store.slogan} Acreditamos que estilo está nos detalhes, nas escolhas e na maneira como cada homem constrói sua própria identidade visual.
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <a
                href={`https://instagram.com/${store.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#D7A574]/20 flex items-center justify-center text-[#D7A574] hover:bg-[#D7A574] hover:text-[#0B0908] transition-all"
                aria-label="Instagram Bradan Moda Masculina"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent('👋 Olá! Gostaria de consultar informações sobre as peças do catálogo da Bradan Moda Masculina 👔')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#D7A574]/20 flex items-center justify-center text-[#D7A574] hover:bg-[#D7A574] hover:text-[#0B0908] transition-all"
                aria-label="WhatsApp Bradan Moda Masculina"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D7A574] font-semibold mb-5">
              Navegação
            </h4>
            <ul className="space-y-3 text-xs text-[#9A928B]">
              <li>
                <Link href="/" className="hover:text-[#F6F3EE] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-[#F6F3EE] transition-colors">
                  Catálogo Completo
                </Link>
              </li>
              <li>
                <Link href="/sacola" className="hover:text-[#F6F3EE] transition-colors">
                  Sacola de Interesse
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-[#F6F3EE] transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D7A574] font-semibold mb-5">
              Coleções
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9A928B]">
              {categories.slice(0, 6).map(c => (
                <li key={c.slug}>
                  <Link
                    href={`/categoria/${c.slug}`}
                    className="hover:text-[#F6F3EE] transition-colors flex items-center group"
                  >
                    <span>{c.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 text-[#D7A574] transition-all" />
                  </Link>
                </li>
              ))}
              {categories.length > 6 && (
                <li>
                  <Link href="/catalogo" className="text-[#D7A574] hover:underline">
                    + Ver todas ({categories.length})
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D7A574] font-semibold mb-5">
              Atendimento
            </h4>
            <div className="space-y-3.5 text-xs text-[#9A928B]">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#D7A574] shrink-0 mt-0.5" />
                <span>{store.location}</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-[#D7A574] shrink-0 mt-0.5" />
                <span>{store.schedule}</span>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent('👋 Olá! Gostaria de consultar informações sobre as peças do catálogo da Bradan Moda Masculina 👔')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-[#D7A574] hover:text-[#ECC8A4] font-medium transition-colors"
                >
                  <span>Consultar no WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#79736E] gap-4">
          <p>© {new Date().getFullYear()} Bradan Moda Masculina. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-6">
            <Link href="/politica-de-privacidade" className="hover:text-[#9A928B] transition-colors">
              Política de Privacidade
            </Link>
            <span>•</span>
            <span className="text-[#79736E]">Catálogo Digital & Atendimento Exclusivo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
