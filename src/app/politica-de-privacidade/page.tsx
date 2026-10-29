import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { getStoreInfo } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Política de Privacidade | BRADAN MODA MASCULINA',
  description: 'Política de privacidade e diretrizes de atendimento do catálogo digital BRADAN MODA MASCULINA.',
  alternates: {
    canonical: 'https://bradanconceito.com.br/politica-de-privacidade',
  },
};

export default function PoliticaPrivacidadePage() {
  const store = getStoreInfo();

  return (
    <div className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#D7A574] hover:underline mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Voltar ao início</span>
      </Link>

      <div className="space-y-4 mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-[#D7A574] font-medium block">
          Transparência & Segurança
        </span>
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F6F3EE]">
          POLÍTICA DE PRIVACIDADE
        </h1>
        <p className="text-xs text-[#9A928B]">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
        <div className="w-16 h-[1px] bg-[#D7A574]/30 pt-2" />
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-[#9A928B] leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-serif text-[#F6F3EE]">
            1. Apresentação e Finalidade do Catálogo
          </h2>
          <p>
            O website da <strong>BRADAN MODA MASCULINA</strong> funciona primordialmente como um catálogo digital interativo de produtos de moda masculina e acessórios selecionados. Nosso objetivo é apresentar as peças disponíveis em nosso acervo com total fidelidade visual e facilitar o contato direto entre o cliente e nossa equipe de atendimento.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-serif text-[#F6F3EE]">
            2. Coleta de Dados e Ausência de Transações Financeiras Online
          </h2>
          <p>
            Nosso catálogo digital não realiza cobranças financeiras diretas no site, nem armazena números de cartões de crédito, dados bancários ou senhas pessoais.
          </p>
          <p>
            A seleção de produtos através da "Sacola de Interesse" é armazenada unicamente no navegador do visitante (armazenamento local) para compor a mensagem de consulta enviada via WhatsApp pelo próprio usuário.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-serif text-[#F6F3EE]">
            3. Comunicação via WhatsApp
          </h2>
          <p>
            Ao clicar nos botões de atendimento via WhatsApp, o usuário é direcionado para o aplicativo oficial do WhatsApp. As informações compartilhadas na conversa são utilizadas exclusivamente para fins de atendimento ao cliente, consulta de disponibilidade, esclarecimento sobre tamanhos e alinhamento de envio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-serif text-[#F6F3EE]">
            4. Direitos Autorais e Imagens Reais
          </h2>
          <p>
            Todas as fotografias de produtos apresentadas neste catálogo correspondem a itens reais de nosso acervo ou fotografias autorizadas de fornecedores oficiais, refletindo nosso compromisso com a integridade visual e qualidade dos produtos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-serif text-[#F6F3EE]">
            5. Dúvidas e Atendimento
          </h2>
          <p>
            Para qualquer esclarecimento sobre o uso do site ou sobre nossas peças, entre em contato através dos nossos canais oficiais de atendimento no WhatsApp ou Instagram.
          </p>
        </section>
      </div>
    </div>
  );
}
