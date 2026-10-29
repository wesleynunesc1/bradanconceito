import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacola de Interesse | BRADAN CONCEITO',
  description: 'Revise os produtos selecionados e solicite valores, tamanhos e disponibilidade diretamente pelo WhatsApp oficial.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SacolaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
