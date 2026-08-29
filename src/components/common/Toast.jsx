import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-notification">
      <Sparkles size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
      <span>{message}</span>
    </div>
  );
}
