import React, { useState, useEffect } from 'react';
import { Lock, User, KeyRound, ShieldAlert, Eye, EyeOff, LogIn, Clock, ShieldCheck } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('andersonkunicki');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);

  useEffect(() => {
    let timer;
    if (lockoutTime > 0) {
      timer = setInterval(() => {
        setLockoutTime(prev => {
          if (prev <= 1) {
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockoutTime > 0) return;

    setErrorMsg('');
    setIsLoading(true);

    try {
      const success = await onLogin(username.trim(), password);
      if (!success) {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= 5) {
          setLockoutTime(60);
          setErrorMsg('Múltiplas tentativas incorretas. Acesso temporariamente bloqueado por segurança (60s).');
        } else {
          setErrorMsg(`Usuário ou senha incorretos. Tentativa ${nextAttempts} de 5.`);
        }
      }
    } catch (err) {
      setErrorMsg('Erro de autenticação de segurança. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem',
      backgroundColor: 'var(--bg-main)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}>
        
        {/* Header Banner */}
        <div style={{
          backgroundColor: 'var(--primary-dark)',
          padding: '2.5rem 2rem 2rem',
          textAlign: 'center',
          color: '#FFFFFF',
          position: 'relative'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 1rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(200, 29, 37, 0.15)',
            border: '2px solid var(--accent-red)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-red)'
          }}>
            <Lock size={28} />
          </div>

          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--gold-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            Acesso Restrito Seguro
          </span>

          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            margin: '0.35rem 0 0.25rem',
            color: '#FFFFFF'
          }}>
            Painel Administrativo
          </h2>

          <p style={{
            fontSize: '0.85rem',
            color: '#94A3B8',
            margin: 0
          }}>
            Anderson Kunicki Corretor Imobiliário
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          
          {errorMsg && (
            <div style={{
              backgroundColor: lockoutTime > 0 ? '#FFFBEB' : '#FEF2F2',
              border: lockoutTime > 0 ? '1px solid #FCD34D' : '1px solid #FCA5A5',
              color: lockoutTime > 0 ? '#B45309' : '#991B1B',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              {lockoutTime > 0 ? <Clock size={20} style={{ flexShrink: 0 }} /> : <ShieldAlert size={18} style={{ flexShrink: 0 }} />}
              <div>
                <span>{errorMsg}</span>
                {lockoutTime > 0 && (
                  <div style={{ fontWeight: 800, marginTop: '0.25rem', fontSize: '0.9rem' }}>
                    Aguarde {lockoutTime} segundo(s)...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Username Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.825rem',
              fontWeight: 700,
              color: 'var(--primary-dark)',
              marginBottom: '0.4rem'
            }}>
              Usuário / Login
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <User size={18} />
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="Informe seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={lockoutTime > 0}
                style={{
                  paddingLeft: '2.75rem',
                  backgroundColor: 'var(--bg-subtle)'
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.825rem',
              fontWeight: 700,
              color: 'var(--primary-dark)',
              marginBottom: '0.4rem'
            }}>
              Senha de Acesso
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <KeyRound size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="Digite sua senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={lockoutTime > 0}
                autoFocus
                style={{
                  paddingLeft: '2.75rem',
                  paddingRight: '2.75rem',
                  backgroundColor: 'var(--bg-subtle)'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-red"
            disabled={isLoading || lockoutTime > 0}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              fontSize: '1rem',
              fontWeight: 700,
              justifyContent: 'center',
              opacity: lockoutTime > 0 ? 0.6 : 1
            }}
          >
            {isLoading ? (
              <span>Autenticando...</span>
            ) : lockoutTime > 0 ? (
              <span>Bloqueado ({lockoutTime}s)</span>
            ) : (
              <>
                <LogIn size={18} />
                <span>Entrar no Painel</span>
              </>
            )}
          </button>

          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'center',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem'
          }}>
            <ShieldCheck size={14} style={{ color: '#16A34A' }} />
            <span>Conexão Segura e Criptografada</span>
          </div>

        </form>

      </div>
    </div>
  );
}
