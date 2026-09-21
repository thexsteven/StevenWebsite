/**
 * Ersatz für das `server-only`-Paket im Test.
 *
 * `server-only` wirft beim Import, sobald der Bundler nicht die
 * `react-server`-Condition setzt – Vitest tut das nicht. Das Paket ist ein
 * reiner Marker ohne Laufzeitverhalten; ein leeres Modul genügt hier.
 * Verdrahtet in `vitest.config.mts`.
 */
export {};
