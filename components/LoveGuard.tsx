'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAndDecrypt } from '@/lib/love-crypto';
import { LoveModal } from '@/components/LoveModal';

const SESSION_KEY = 'love_key';

export function LoveGuard({ chapter }: { chapter: string }) {
  const router = useRouter();
  const [html, setHtml] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const url = `/encrypted/${chapter}.enc`;

  useEffect(() => {
    let cancelled = false;
    const sessionPw = sessionStorage.getItem(SESSION_KEY);
    if (!sessionPw) {
      setShowModal(true);
      return;
    }
    fetchAndDecrypt(sessionPw, url)
      .then((decrypted) => {
        if (!cancelled) setHtml(decrypted);
      })
      .catch(() => {
        if (cancelled) return;
        sessionStorage.removeItem(SESSION_KEY);
        setShowModal(true);
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  const handleUnlock = useCallback(async () => {
    const pw = sessionStorage.getItem(SESSION_KEY);
    if (!pw) return;
    try {
      const decrypted = await fetchAndDecrypt(pw, url);
      setHtml(decrypted);
      setShowModal(false);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, [url]);

  return (
    <>
      <div
        id="chapter-content"
        className={`story-content${html ? ' is-loaded' : ''}`}
        data-chapter-file={chapter}
        {...(html ? { dangerouslySetInnerHTML: { __html: html } } : {})}
      />
      <LoveModal
        open={showModal}
        onClose={() => router.push('/')}
        onUnlock={handleUnlock}
        hint="Tipp: L → O → V → E auf der Hauptseite"
        cancelLabel="Zurück"
      />
    </>
  );
}
