import { useState, useEffect, useCallback } from 'react';
import { hashPassword } from '../utils/security';
import { auth, isFirebaseConfigured } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';

const AUTH_STORAGE_KEY = 'anderson_kunicki_auth_user_v1';
const CUSTOM_PASS_STORAGE_KEY = 'anderson_kunicki_custom_pass_hash_v1';
const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutos

export function useAuth(onToast) {
  const [currentUser, setCurrentUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Monitorar estado de autenticação do Firebase (se configurado)
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setFirebaseUser(user);
          setCurrentUser(user.displayName || user.email?.split('@')[0] || 'andersonkunicki');
        } else {
          setFirebaseUser(null);
          setCurrentUser(null);
        }
        setIsLoadingAuth(false);
      });
      return () => unsubscribe();
    } else {
      setIsLoadingAuth(false);
    }
  }, []);

  const login = useCallback(async (usernameOrEmail, passwordInput) => {
    const cleanUser = usernameOrEmail.trim();

    // 1. Tentar Login via Firebase Auth se estiver configurado
    if (isFirebaseConfigured && auth) {
      try {
        const email = cleanUser.includes('@') ? cleanUser : `${cleanUser}@andersonkunicki.com.br`;
        const userCredential = await signInWithEmailAndPassword(auth, email, passwordInput);
        const user = userCredential.user;
        const name = user.displayName || user.email?.split('@')[0] || 'andersonkunicki';
        setFirebaseUser(user);
        setCurrentUser(name);
        if (onToast) onToast(`Bem-vindo, ${name}! Autenticado com sucesso.`);
        return true;
      } catch (err) {
        console.warn('Falha no login Firebase Auth, tentando fallback seguro:', err.code);
        if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          if (onToast) onToast('Senha incorreta. Tente novamente.');
          return false;
        }
      }
    }

    // 2. Fallback de Segurança Criptográfica (SHA-256)
    const hashedInput = await hashPassword(passwordInput);
    const customHash = localStorage.getItem(CUSTOM_PASS_STORAGE_KEY);

    // Hashes SHA-256 autorizados
    const validHashes = [
      '0a2fb47fa6a7f7d142ce049386d34b46294a282f6e9196b0bd59048a1c97042a',
      '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
    ];

    if (customHash) {
      validHashes.unshift(customHash);
    }

    const isValid = validHashes.includes(hashedInput);
    const userMatch = cleanUser.toLowerCase() === 'andersonkunicki' || cleanUser.toLowerCase() === 'admin' || cleanUser.includes('@');

    if (isValid && userMatch) {
      const loggedName = cleanUser.includes('@') ? cleanUser.split('@')[0] : cleanUser;
      setCurrentUser(loggedName);
      if (onToast) onToast(`Bem-vindo, ${loggedName}. Sessão iniciada.`);
      return true;
    }

    if (onToast) onToast('Usuário ou senha inválidos.');
    return false;
  }, [onToast]);

  const logout = useCallback(async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.warn('Erro no signOut do Firebase:', err);
      }
    }

    setCurrentUser(null);
    setFirebaseUser(null);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    if (onToast) onToast('Sessão encerrada com sucesso.');
  }, [onToast]);

  // Alterar Senha (suporta Firebase Auth e Armazenamento Criptográfico Local)
  const updateUserPassword = useCallback(async (currentPass, newPass) => {
    // 1. Alterar no Firebase Auth se logado
    if (firebaseUser && auth.currentUser) {
      try {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPass);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await firebaseUpdatePassword(auth.currentUser, newPass);
        if (onToast) onToast('Senha alterada com sucesso no Firebase.');
        return true;
      } catch (err) {
        console.error('Erro ao atualizar senha no Firebase:', err);
        throw new Error('Falha ao atualizar no Firebase: ' + (err.message || 'Senha atual inválida.'));
      }
    }

    // 2. Alterar no modo de segurança local (SHA-256)
    const currentHashed = await hashPassword(currentPass);
    const storedCustom = localStorage.getItem(CUSTOM_PASS_STORAGE_KEY);
    const validCurrent = storedCustom 
      ? (currentHashed === storedCustom)
      : (currentHashed === '0a2fb47fa6a7f7d142ce049386d34b46294a282f6e9196b0bd59048a1c97042a' || currentHashed === '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');

    if (!validCurrent) {
      throw new Error('A senha atual informada está incorreta.');
    }

    const newHashed = await hashPassword(newPass);
    localStorage.setItem(CUSTOM_PASS_STORAGE_KEY, newHashed);
    if (onToast) onToast('Nova senha salva com sucesso.');
    return true;
  }, [firebaseUser, onToast]);

  // Timeout de inatividade automática (30 minutos)
  useEffect(() => {
    if (!currentUser) return;

    let timeoutId;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout();
        alert('Sua sessão foi encerrada automaticamente após 30 minutos de inatividade para sua segurança.');
      }, INACTIVITY_LIMIT);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(ev => window.addEventListener(ev, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(ev => window.removeEventListener(ev, resetTimer));
    };
  }, [currentUser, logout]);

  return {
    currentUser,
    firebaseUser,
    isLoadingAuth,
    login,
    logout,
    updateUserPassword,
    isAuthenticated: !!currentUser
  };
}
