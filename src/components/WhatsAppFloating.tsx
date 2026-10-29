'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getStoreInfo } from '@/lib/catalog';

export default function WhatsAppFloating() {
  const store = getStoreInfo();
  const text = encodeURIComponent(
    'Olá! Gostaria de consultar modelos, tamanhos e valores do catálogo da BRADAN CONCEITO.'
  );

  return (
    <a
      href={`https://wa.me/${store.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center space-x-2 bg-[#25D366] text-white px-3.5 py-2.5 rounded-full shadow-lg shadow-black/50 hover:bg-[#20ba59] transition-all duration-300 hover:scale-105 group"
      aria-label="Falar conosco no WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="text-xs font-semibold tracking-wide pr-1 hidden sm:inline-block">
        WhatsApp Bradan
      </span>
    </a>
  );
}
