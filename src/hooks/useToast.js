import { useState, useCallback } from 'react';

export function useToast(defaultDuration = 3800) {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg, duration = defaultDuration) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage('');
    }, duration);
    return () => clearTimeout(timer);
  }, [defaultDuration]);

  const hideToast = useCallback(() => {
    setToastMessage('');
  }, []);

  return {
    toastMessage,
    showToast,
    hideToast
  };
}
