import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default [
  { ignores: ['.next/**', 'node_modules/**', '.agents/**', 'scrollcraft/**', 'public/**', 'lib/scrollcraft/**'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript').map((config) => ({
    ...config,
    files: ['app/**/*.site.tsx', 'components/editorial/**/*.tsx', 'lib/editorial/**/*.ts', 'next.config.ts', 'eslint.config.mjs'],
  })),
];
