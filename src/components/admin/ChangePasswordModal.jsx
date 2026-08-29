import React, { useState } from 'react';
import { KeyRound, Lock, Eye, EyeOff, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function ChangePasswordModal({ isOpen, onClose, onUpdatePassword }) {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!currentPass) {
      setError('Por favor, informe a senha atual.');
      return;
    }

    if (newPass.length < 6) {
      setError('A nova senha deve possuir pelo menos 6 caracteres.');
      return;
    }

    if (newPass !== confirmPass) {
      setError('A confirmação da nova senha não confere.');
      return;
    }

    setIsLoading(true);
    try {
      const success = await onUpdatePassword(currentPass, newPass);
      if (success) {
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Erro ao alterar a senha. Verifique a senha atual digitada.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content" style={{ maxWidth: '440px', padding: '2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--accent-red-subtle)', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <KeyRound size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', fontWeight: 800, margin: 0 }}>
                Alterar Senha
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Defina uma nova senha de acesso ao painel</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#DC2626',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          
          {/* Current Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
              Senha Atual
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPass ? "text" : "password"} 
                className="input-field"
                placeholder="Digite a senha atual"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                required
                style={{ paddingRight: '2.5rem' }}
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
              Nova Senha (mínimo 6 caracteres)
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPass ? "text" : "password"} 
                className="input-field"
                placeholder="Digite a nova senha"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
                minLength={6}
                style={{ paddingRight: '2.5rem' }}
              />
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
              Confirmar Nova Senha
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPass ? "text" : "password"} 
                className="input-field"
                placeholder="Repita a nova senha"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
                minLength={6}
                style={{ paddingRight: '2.5rem' }}
              />
            </div>
          </div>

          {/* Show/Hide password toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: 0
              }}
            >
              {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              <span>{showPass ? 'Ocultar senhas' : 'Exibir senhas'}</span>
            </button>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={onClose} 
              style={{ flex: 1 }}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-red" 
              style={{ flex: 1.5, fontWeight: 700 }}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar Nova Senha'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
