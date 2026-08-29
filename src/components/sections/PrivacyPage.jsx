import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Mail, ArrowLeft } from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { SITE_CONFIG, getWhatsAppUrl } from '../../config';

export default function PrivacyPage({ onBackToCatalog }) {
  const waUrl = getWhatsAppUrl("Olá Anderson! Tenho uma dúvida sobre privacidade e tratamento de dados.");

  return (
    <section style={{ padding: '4.5rem 0 6rem', backgroundColor: 'var(--bg-main)' }} id="privacidade">
      <div className="container" style={{ maxWidth: '880px' }}>
        
        {/* Back Button */}
        <div style={{ marginBottom: '2rem' }}>
          <button 
            className="btn btn-outline btn-sm" 
            onClick={onBackToCatalog}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
          >
            <ArrowLeft size={16} /> Voltar ao Catálogo de Imóveis
          </button>
        </div>

        {/* Main Privacy Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)',
          padding: '3rem 2.5rem',
          lineHeight: 1.7
        }}>
          
          {/* Header */}
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.75rem', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: '#16A34A',
              fontWeight: 700,
              fontSize: '0.8rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-xs)',
              marginBottom: '0.85rem'
            }}>
              <ShieldCheck size={16} /> Conformidade com a LGPD (Lei nº 13.709/2018)
            </div>
            <h1 style={{ fontSize: '2.2rem', color: 'var(--primary-dark)', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              Política de Privacidade & Termos de Uso
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', margin: 0 }}>
              Última atualização: {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })} • {SITE_CONFIG.brokerName} ({SITE_CONFIG.creci})
            </p>
          </div>

          {/* Intro */}
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '1.025rem', color: 'var(--text-body)' }}>
              A presente <strong>Política de Privacidade</strong> tem como compromisso proteger a privacidade dos usuários e clientes que acessam o site do corretor imobiliário <strong>{SITE_CONFIG.brokerName}</strong>, inscrito no {SITE_CONFIG.creci}, em consonância com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
            </p>
          </div>

          {/* Section 1 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <FileText size={20} style={{ color: 'var(--accent-red)' }} /> 1. Informações que Coletamos
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>
              Nosso site opera com o princípio da <em>minimização de dados</em>. Não realizamos cadastros invasivos nem rastreamento de dados sensíveis. Os dados coletados podem incluir:
            </p>
            <ul style={{ paddingLeft: '1.4rem', color: 'var(--text-body)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Dados de contato voluntários:</strong> Nome, número de telefone/WhatsApp e preferências de imóveis que você nos fornece diretamente ao clicar em links de contato ou simulações.</li>
              <li><strong>Dados anônimos de navegação:</strong> Informações de desempenho estritamente necessárias para a estabilidade do site (endereço IP resumido, tipo de navegador, resolução de tela).</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Eye size={20} style={{ color: 'var(--primary-blue)' }} /> 2. Finalidade do Uso dos Dados
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>
              As informações fornecidas voluntariamente têm propósitos exclusivos de:
            </p>
            <ul style={{ paddingLeft: '1.4rem', color: 'var(--text-body)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Atendimento personalizado para intermediação e consultoria imobiliária (compra, venda ou locação).</li>
              <li>Agendamento de visitas presenciais a imóveis de interesse.</li>
              <li>Envio de simulações de financiamento solicitadas pelo cliente.</li>
              <li>Cumprimento de obrigações legais pertinentes ao Conselho Regional de Corretores de Imóveis (CRECI/COFECI).</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <Lock size={20} style={{ color: '#16A34A' }} /> 3. Segurança e Sigilo
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>
              Garantimos que <strong>nunca vendemos, alugamos ou comercializamos seus dados</strong> com terceiros para fins de marketing. O acesso às informações de negociação é restrito ao corretor responsável, protegido por padrões modernos de criptografia e segurança de rede.
            </p>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <ShieldCheck size={20} style={{ color: 'var(--gold-primary)' }} /> 4. Seus Direitos como Titular de Dados
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.95rem' }}>
              De acordo com a LGPD, você possui total direito de:
            </p>
            <ul style={{ paddingLeft: '1.4rem', color: 'var(--text-body)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Confirmar a existência de tratamento de dados pessoais.</li>
              <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
              <li>Solicitar a exclusão definitiva dos seus dados de contato dos nossos canais de atendimento a qualquer momento.</li>
            </ul>
          </div>

          {/* Contact Encarregado */}
          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem',
            border: '1px solid var(--border-subtle)',
            marginTop: '2rem'
          }}>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', fontWeight: 800, marginBottom: '0.5rem' }}>
              Canal de Atendimento do Titular (DPO / Responsável)
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Para exercer qualquer dos seus direitos ou esclarecer dúvidas sobre nossa política de privacidade, entre em contato direto:
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href={`mailto:${SITE_CONFIG.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-red)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
                <Mail size={16} /> {SITE_CONFIG.email}
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#16A34A', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
                <WhatsAppIcon size={16} color="#16A34A" /> WhatsApp: {SITE_CONFIG.phoneFormatted}
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
