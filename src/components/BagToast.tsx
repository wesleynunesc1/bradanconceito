'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowRight, Check } from 'lucide-react';
import { useBag } from '@/context/BagContext';

export default function BagToast() {
  const { lastAdded, dismissToast, totalCount } = useBag();

  if (!lastAdded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#181310] border border-[#D7A574]/40 p-4 shadow-2xl shadow-black/80 flex items-center space-x-4">
        {/* Thumbnail */}
        <div className="relative w-14 h-16 bg-[#0F0C0A] shrink-0 border border-[#D7A574]/20 overflow-hidden">
          <Image
            src={lastAdded.mainImage}
            alt={lastAdded.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1.5 text-[10px] text-[#D7A574] uppercase tracking-wider font-semibold mb-0.5">
            <Check className="w-3 h-3" />
            <span>Adicionado à Sacola</span>
          </div>
          <p className="text-xs font-medium text-[#F6F3EE] truncate">{lastAdded.name}</p>
          <div className="mt-2 flex items-center space-x-3 text-xs">
            <Link
              href="/sacola"
              onClick={dismissToast}
              className="text-[#D7A574] hover:underline font-medium inline-flex items-center space-x-1"
            >
              <span>Ver sacola ({totalCount})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={dismissToast}
          className="text-[#9A928B] hover:text-[#F6F3EE] p-1 -mt-6 -mr-1"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
