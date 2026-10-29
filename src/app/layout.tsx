import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { BagProvider } from '@/context/BagContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BagToast from '@/components/BagToast';
import WhatsAppFloating from '@/components/WhatsAppFloating';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bradanconceito.com.br'),
  title: 'BRADAN CONCEITO | Moda Masculina Premium & Catálogo Digital',
  description: 'O essencial não precisa ser comum. Catálogo digital exclusivo de moda masculina, calçados nobres, perfumaria importada e peças selecionadas.',
  keywords: 'Bradan Conceito, moda masculina, calçados masculinos, perfumes importados, camisas polo, ralph lauren, armani, hugo boss',
  openGraph: {
    title: 'BRADAN CONCEITO | Moda Masculina Premium',
    description: 'O essencial não precisa ser comum. Descubra nossa curadoria de moda masculina.',
    url: 'https://bradanconceito.com.br',
    siteName: 'BRADAN CONCEITO',
    images: [
      {
        url: '/brand/bradan-conceito-dark.jpg',
        width: 1200,
        height: 630,
        alt: 'BRADAN CONCEITO',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} scroll-smooth`}>
      <body className="bg-[#0B0908] text-[#F6F3EE] min-h-screen flex flex-col font-sans selection:bg-[#B47A4B] selection:text-white">
        <BagProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <BagToast />
          <WhatsAppFloating />
        </BagProvider>
      </body>
    </html>
  );
}
