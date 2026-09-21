/**
 * Zustand des Login-Formulars.
 *
 * Getrennt von `actions.ts`: eine `'use server'`-Datei darf ausschließlich
 * async-Funktionen exportieren, keine Konstanten.
 */

/** Rückmeldung des Formulars; `null` heißt „noch nichts versucht". */
export type LoginState = { error: string | null };

export const INITIAL_LOGIN_STATE: LoginState = { error: null };
