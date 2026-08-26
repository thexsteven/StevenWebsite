import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  test: {
    // Die getesteten Module sind serverseitig – kein DOM nötig.
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      // Spiegelt den `@/*`-Alias aus tsconfig.json.
      '@': root,
      // `server-only` wirft beim Import, sofern der Bundler nicht die
      // react-server-Condition setzt. Vitest tut das nicht, also hier auf
      // einen leeren Marker umbiegen.
      'server-only': `${root}tests/stubs/server-only.ts`,
    },
  },
});
