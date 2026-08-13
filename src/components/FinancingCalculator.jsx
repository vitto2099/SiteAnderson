import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, MessageCircle, HelpCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config';

export default function FinancingCalculator({ initialPrice = 450000 }) {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(10.5);
  const [years, setYears] = useState(30);

  const downPaymentAmount = (price * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, price - downPaymentAmount);

  // Simple PMT calculation (PRICE system)
  const months = years * 12;
  const monthlyRate = (interestRate / 100) / 12;
  
  let monthlyPayment = 0;
  if (monthlyRate > 0 && months > 0 && loanAmount > 0) {
    monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  }

  const formatMoney = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const waUrl = getWhatsAppUrl(`Olá Anderson! Fiz uma simulação de financiamento no site para um imóvel de ${formatMoney(price)} com entrada de ${formatMoney(downPaymentAmount)}. Gostaria de verificar as opções de crédito com você.`);

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      padding: '2rem',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(200, 29, 37, 0.1)',
          color: 'var(--accent-red)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Calculator size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-dark)' }}>Simulador de Financiamento Imobiliário</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Calcule o valor estimado das parcelas do seu novo imóvel</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '1.75rem' }}>
        {/* Input Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem', display: 'block' }}>
              Valor Total do Imóvel
            </label>
            <input 
              type="number"
              className="input-field"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
              step="10000"
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
                Entrada ({downPaymentPercent}%)
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-red)' }}>
                {formatMoney(downPaymentAmount)}
              </span>
            </div>
            <input 
              type="range"
              min="10"
              max="60"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-red)', cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem', display: 'block' }}>
                Prazo em Anos
              </label>
              <select 
                className="input-field"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value, 10))}
              >
                <option value={15}>15 anos (180x)</option>
                <option value={20}>20 anos (240x)</option>
                <option value={25}>25 anos (300x)</option>
                <option value={30}>30 anos (360x)</option>
                <option value={35}>35 anos (420x)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem', display: 'block' }}>
                Taxa Anual Média (%)
              </label>
              <input 
                type="number"
                className="input-field"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Calculation Result Summary Box */}
        <div style={{
          backgroundColor: 'var(--primary-dark)',
          borderRadius: 'var(--radius-md)',
          padding: '1.75rem',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', tracking: '0.05em', color: '#94A3B8', fontWeight: 700 }}>
              Estimativa da Parcela Inicial (PRICE)
            </div>
            
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#F8FAFC', margin: '0.5rem 0', fontFamily: 'Outfit, sans-serif' }}>
              {formatMoney(monthlyPayment)} <span style={{ fontSize: '0.9rem', color: '#94A3B8', fontWeight: 400 }}>/mês</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Valor a Financiar:</span>
                <strong>{formatMoney(loanAmount)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Total de Parcelas:</span>
                <strong>{months} meses</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Entrada Necessária:</span>
                <strong>{formatMoney(downPaymentAmount)}</strong>
              </div>
            </div>
          </div>

          <a 
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ width: '100%', marginTop: '1.5rem', padding: '0.85rem' }}
          >
            <MessageCircle size={18} /> Enviar Simulação ao Corretor
          </a>
        </div>
      </div>
    </div>
  );
}
