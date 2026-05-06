'use client';

import { useEffect, useRef, useState } from 'react';
import {
  fetchAndDecrypt,
  importPasswordAsBaseKey,
} from '@/lib/love-crypto';
import { putBaseKey } from '@/lib/love-key-store';

const LOVE_PROBE_URL = '/encrypted/prolog.enc';

type LoveModalProps = {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
  hint?: string;
  cancelLabel?: string;
};

export function LoveModal({
  open,
  onClose,
  onUnlock,
  hint = '',
  cancelLabel = 'Abbrechen',
}: LoveModalProps) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 320);
      return () => window.clearTimeout(t);
    }
    setPassword('');
    setErrorMsg('');
    setShake(false);
    setBusy(false);
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    if (!password) return;
    setBusy(true);
    try {
      await fetchAndDecrypt(password, LOVE_PROBE_URL);
      const baseKey = await importPasswordAsBaseKey(password);
      await putBaseKey(baseKey);
      setPassword('');
      onUnlock();
    } catch {
      setShake(true);
      setErrorMsg('Falsches Passwort – versuch es nochmal.');
      setPassword('');
      window.setTimeout(() => setShake(false), 500);
      inputRef.current?.focus();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`love-modal-overlay${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="love-modal-title"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div className="love-modal">
        <span className="love-modal-icon" aria-hidden="true">
          🔒
        </span>
        <h2 id="love-modal-title">Private Sektion</h2>
        <p className="love-modal-sub">Diese Seite ist passwortgeschützt.</p>
        <input
          ref={inputRef}
          type="password"
          className={`love-password-input${shake ? ' is-error' : ''}`}
          placeholder="Passwort …"
          autoComplete="off"
          aria-label="Passwort für Love Story"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void handleSubmit();
            if (e.key === 'Escape') handleClose();
          }}
        />
        <p className="love-modal-error" role="alert" aria-live="polite">
          {errorMsg}
        </p>
        <div className="love-modal-actions">
          <button
            type="button"
            className="btn"
            onClick={() => void handleSubmit()}
            disabled={busy}
          >
            {busy ? 'Prüfe …' : 'Entsperren'}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleClose}
          >
            {cancelLabel}
          </button>
        </div>
        <p className="love-modal-hint">{hint}</p>
      </div>
    </div>
  );
}
