'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, BagItem } from '@/types';

interface BagContextType {
  items: BagItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBag: () => void;
  isInBag: (productId: string) => boolean;
  totalCount: number;
  lastAdded: Product | null;
  dismissToast: () => void;
}

const BagContext = createContext<BagContextType | undefined>(undefined);

const STORAGE_KEY = 'bradan_sacola_v1';

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Erro ao ler sacola do localStorage:', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Erro ao salvar sacola no localStorage:', e);
    }
  }, [items, isHydrated]);

  const addItem = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev; // already in bag
      }
      return [...prev, { product, quantity: 1, addedAt: Date.now() }];
    });
    setLastAdded(product);

    // Auto dismiss toast after 4s
    setTimeout(() => {
      setLastAdded(curr => (curr?.id === product.id ? null : curr));
    }, 4000);
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const clearBag = () => {
    setItems([]);
  };

  const isInBag = (productId: string) => {
    return items.some(i => i.product.id === productId);
  };

  const dismissToast = () => setLastAdded(null);

  const totalCount = items.length;

  return (
    <BagContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearBag,
        isInBag,
        totalCount,
        lastAdded,
        dismissToast,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error('useBag must be used within a BagProvider');
  }
  return context;
}
