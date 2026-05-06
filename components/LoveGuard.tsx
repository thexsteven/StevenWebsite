'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAndDecryptWithBaseKey } from '@/lib/love-crypto';
import { clearBaseKey, getBaseKey } from '@/lib/love-key-store';
import { LoveModal } from '@/components/LoveModal';

export function LoveGuard({ chapter }: { chapter: string }) {
  const router = useRouter();
  const [html, setHtml] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const url = `/encrypted/${chapter}.enc`;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const baseKey = await getBaseKey();
      if (cancelled) return;
      if (!baseKey) {
        setShowModal(true);
        return;
      }
      try {
        const decrypted = await fetchAndDecryptWithBaseKey(baseKey, url);
        if (!cancelled) setHtml(decrypted);
      } catch {
        if (cancelled) return;
        await clearBaseKey();
        setShowModal(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url]);

  const handleUnlock = useCallback(async () => {
    const baseKey = await getBaseKey();
    if (!baseKey) return;
    try {
      const decrypted = await fetchAndDecryptWithBaseKey(baseKey, url);
      setHtml(decrypted);
      setShowModal(false);
    } catch {
      await clearBaseKey();
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
