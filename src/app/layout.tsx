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
  title: {
    default: 'BRADAN MODA MASCULINA | Loja Online & Catálogo Digital',
    template: '%s | BRADAN MODA MASCULINA',
  },
  description: 'O essencial não precisa ser comum. Catálogo digital exclusivo da BRADAN MODA MASCULINA, calçados nobres, perfumaria importada e peças selecionadas.',
  keywords: [
    'Bradan Moda Masculina',
    'Bradan',
    'moda masculina premium',
    'calçados masculinos em couro',
    'loafers masculinos',
    'camisas polo',
    'camisetas casuais ralph lauren',
    'tênis armani exchange',
    'perfumes importados masculinos',
    'perfume árabe asad lattafa',
    'catálogo de moda masculina',
  ],
  authors: [{ name: 'BRADAN MODA MASCULINA', url: 'https://bradanconceito.com.br' }],
  creator: 'BRADAN MODA MASCULINA',
  publisher: 'BRADAN MODA MASCULINA',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/brand/bradan-emblem.png',
    apple: '/brand/bradan-emblem.png',
  },
  openGraph: {
    title: 'BRADAN MODA MASCULINA | Alta Curadoria de Estilo',
    description: 'O essencial não precisa ser comum. Descubra nossa curadoria de moda masculina.',
    url: 'https://bradanconceito.com.br',
    siteName: 'BRADAN MODA MASCULINA',
    images: [
      {
        url: '/brand/bradan-logo.png',
        width: 1115,
        height: 755,
        alt: 'BRADAN MODA MASCULINA',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BRADAN MODA MASCULINA | Alta Curadoria de Estilo',
    description: 'Catálogo digital exclusivo de moda masculina, calçados nobres e perfumaria importada.',
    images: ['/brand/bradan-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: 'BRADAN MODA MASCULINA',
  url: 'https://bradanconceito.com.br',
  logo: 'https://bradanconceito.com.br/brand/bradan-logo.png',
  image: 'https://bradanconceito.com.br/brand/bradan-logo.png',
  description: 'O essencial não precisa ser comum. Curadoria de moda masculina premium, calçados nobres e perfumaria importada.',
  telephone: '+5585991284210',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: [
    'https://instagram.com/bradanconceito',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} scroll-smooth`}>
      <body className="bg-[#0B0908] text-[#F6F3EE] min-h-screen flex flex-col font-sans selection:bg-[#B47A4B] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
