import React, { useState } from 'react';
import { Calculator, Landmark, CheckCircle2, Info, TrendingDown } from 'lucide-react';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { getWhatsAppUrl } from '../../config';
import { formatMoney } from '../../utils/formatters';

export default function FinancingCalculator({ initialPrice = 350000 }) {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(10.5);
  const [years, setYears] = useState(30);

  const downPaymentAmount = (price * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, price - downPaymentAmount);

  // PMT calculation (PRICE system)
  const months = years * 12;
  const monthlyRate = (interestRate / 100) / 12;
  
  let monthlyPayment = 0;
  if (monthlyRate > 0 && months > 0 && loanAmount > 0) {
    monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }

  const waUrl = getWhatsAppUrl(`Olá Anderson! Fiz uma simulação de financiamento no site para um imóvel de ${formatMoney(price)} com entrada de ${formatMoney(downPaymentAmount)} (${downPaymentPercent}%). Gostaria de auxílio para simular e aprovar meu crédito com você.`);

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      padding: 'clamp(1.75rem, 4vw, 3rem)',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: 'var(--radius-sm)',
          background: 'linear-gradient(135deg, #071527 0%, #123B6B 100%)',
          color: 'var(--gold-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(7, 21, 39, 0.25)'
        }}>
          <Calculator size={28} />
        </div>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Simulação Inteligente
          </span>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', margin: '0.1rem 0', fontWeight: 900 }}>
            Simulador de Financiamento Imobiliário
          </h2>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', margin: 0 }}>
            Estime as parcelas do seu imóvel próprio e prepare a documentação com assessoria gratuita.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginTop: '2.25rem' }}>
        
        {/* Input Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.45rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Valor do Imóvel</span>
              <span style={{ color: 'var(--primary-blue)', fontWeight: 800 }}>{formatMoney(price)}</span>
            </label>
            <input 
              type="number"
              className="input-field"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              step="10000"
              style={{ backgroundColor: 'var(--bg-subtle)', fontSize: '1.05rem', fontWeight: 700 }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                Entrada ({downPaymentPercent}%)
              </label>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-red)' }}>
                {formatMoney(downPaymentAmount)}
              </span>
            </div>
            <input 
              type="range"
              min="10"
              max="70"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-red)', cursor: 'pointer', height: '6px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              <span>Min. 10%</span>
              <span>Uso do FGTS permitido</span>
              <span>Max. 70%</span>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Composição da Compra:</span>
              <span>{downPaymentPercent}% Entrada / {100 - downPaymentPercent}% Financiado</span>
            </div>
            <div style={{ width: '100%', height: '10px', borderRadius: '5px', backgroundColor: 'var(--primary-blue)', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${downPaymentPercent}%`, height: '100%', backgroundColor: 'var(--accent-red)', transition: 'width 0.3s' }} title="Entrada" />
              <div style={{ width: `${100 - downPaymentPercent}%`, height: '100%', backgroundColor: 'var(--primary-navy)', transition: 'width 0.3s' }} title="Financiamento" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.4rem', display: 'block' }}>
                Prazo de Pagamento
              </label>
              <select 
                className="input-field"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value, 10))}
                style={{ backgroundColor: 'var(--bg-subtle)', fontWeight: 600 }}
              >
                <option value={15}>15 anos (180x)</option>
                <option value={20}>20 anos (240x)</option>
                <option value={25}>25 anos (300x)</option>
                <option value={30}>30 anos (360x)</option>
                <option value={35}>35 anos (420x)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.4rem', display: 'block' }}>
                Taxa de Juros Anual
              </label>
              <input 
                type="number"
                className="input-field"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                step="0.1"
                style={{ backgroundColor: 'var(--bg-subtle)', fontWeight: 600 }}
              />
            </div>
          </div>

          {/* Banks Compatibility */}
          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.85rem 1rem',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.825rem',
            color: 'var(--text-body)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}>
            <Landmark size={18} style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />
            <span>Compatível com <strong>Caixa Econômica Federal (Minha Casa Minha Vida / SBPE)</strong>, Banco do Brasil, Bradesco, Santander e Itaú.</span>
          </div>

        </div>

        {/* Luxury Result Card */}
        <div style={{
          background: 'linear-gradient(145deg, #071527 0%, #0B2240 100%)',
          borderRadius: 'var(--radius-md)',
          padding: '2.25rem 2rem',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 40px -10px rgba(7, 21, 39, 0.4)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          position: 'relative'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)', fontWeight: 800 }}>
                Parcela Mensal Estimada
              </span>
              <span style={{ fontSize: '0.72rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#CBD5E1' }}>
                Tabela PRICE
              </span>
            </div>
            
            <div style={{ fontSize: 'clamp(2.2rem, 3.5vw, 2.85rem)', fontWeight: 900, color: '#FFFFFF', margin: '0.4rem 0', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
              {formatMoney(monthlyPayment)} <span style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: 400 }}>/mês</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.12)', fontSize: '0.925rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Valor Financiado:</span>
                <strong style={{ color: '#F8FAFC' }}>{formatMoney(loanAmount)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Entrada Necessária:</span>
                <strong style={{ color: 'var(--gold-primary)' }}>{formatMoney(downPaymentAmount)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Prazo Total:</span>
                <strong style={{ color: '#F8FAFC' }}>{months} meses ({years} anos)</strong>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--radius-xs)', fontSize: '0.78rem', color: '#CBD5E1', display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
              <Info size={14} style={{ color: 'var(--gold-primary)', flexShrink: 0, marginTop: '2px' }} />
              <span>Valores estimados para referência. As taxas reais e a capacidade de crédito são confirmadas pelo agente bancário correspondente.</span>
            </div>
          </div>

          <a 
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ width: '100%', marginTop: '1.75rem', padding: '0.95rem', fontWeight: 800, fontSize: '0.95rem' }}
          >
            <WhatsAppIcon size={20} color="#FFFFFF" /> Solicitar Avaliação de Crédito no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
