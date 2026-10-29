'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BrandIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Only play intro once per browser session
    const hasSeenIntro = typeof window !== 'undefined' ? sessionStorage.getItem('bradan_intro_seen') : null;
    if (!hasSeenIntro) {
      setIsVisible(true);
      // Start fade out after 1.4s
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 1400);

      // Unmount after fade out finishes (total ~1.8s)
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        try {
          sessionStorage.setItem('bradan_intro_seen', 'true');
        } catch {
          // ignore storage errors
        }
      }, 1900);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const handleDismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem('bradan_intro_seen', 'true');
      } catch {}
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0908] cursor-pointer transition-opacity duration-500 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Ambient background bronze halo */}
      <div className="absolute w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-radial from-[#B47A4B]/20 via-[#D7A574]/5 to-transparent blur-3xl pointer-events-none animate-pulse" />

      {/* Intro Content Container */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center space-y-6 animate-introScale">
        {/* Logo Container with Luxury Glow */}
        <div className="relative w-56 sm:w-72 h-36 sm:h-44 drop-shadow-[0_10px_35px_rgba(215,165,116,0.35)]">
          <Image
            src="/brand/bradan-logo.png"
            alt="Bradan Moda Masculina"
            fill
            priority
            className="object-contain"
          />
          {/* Subtle light sweep reflection */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmerSweep pointer-events-none" />
        </div>

        {/* Elegant Tagline */}
        <div className="space-y-2 max-w-sm">
          <div className="h-[1.5px] w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#D7A574] to-transparent mx-auto" />
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D7A574] font-medium font-sans">
            Alta Curadoria Masculina
          </p>
        </div>

        {/* Tap to skip prompt */}
        <span className="text-[9px] uppercase tracking-widest text-[#79736E] pt-4 opacity-70">
          Toque para entrar
        </span>
      </div>
    </div>
  );
}
