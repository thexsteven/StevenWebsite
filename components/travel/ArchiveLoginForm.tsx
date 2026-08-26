'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { login } from '@/app/reisen/archiv/login/actions';
import {
  INITIAL_LOGIN_STATE,
  type LoginState,
} from '@/app/reisen/archiv/login/loginState';

import styles from './Archive.module.css';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.ghostButton} disabled={pending}>
      {pending ? 'Prüfe …' : 'Galerie öffnen'}
    </button>
  );
}

/**
 * Passwort-Formular für die Reise-Galerie.
 *
 * Die eigentliche Prüfung passiert in der Server Action – hier steht nur das
 * Formular und die Rückmeldung.
 */
export function ArchiveLoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(
    login,
    INITIAL_LOGIN_STATE,
  );

  return (
    <div className={styles.loginScreen}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Reise-Archiv</h1>
        <p className={styles.loginText}>
          Alle Reisen seit 2021 in einem durchgehenden Feed. Der Bereich ist
          privat – mit dem Passwort geht es weiter.
        </p>

        <form action={formAction}>
          <input type="hidden" name="weiter" value={redirectTo} />

          <label className={styles.loginLabel} htmlFor="archive-password">
            Passwort
          </label>
          <input
            id="archive-password"
            className={styles.loginInput}
            type="password"
            name="password"
            autoComplete="current-password"
            autoFocus
            required
          />

          {state.error !== null && (
            <p className={styles.loginError} role="alert">
              {state.error}
            </p>
          )}

          <div className={styles.loginActions}>
            <SubmitButton />
            <Link href="/reisen" className={styles.loginBack}>
              Zurück zu den Reisen
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
