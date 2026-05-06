import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f8fafc',
        surface: '#ffffff',
        ink: '#0f172a',
        muted: '#475569',
        line: '#e2e8f0',
        primary: {
          DEFAULT: '#0f2f5f',
          light: '#1a3a5c',
        },
        accent: '#c8102e',
        section: {
          about: '#0ea5e9',
          resume: '#16a34a',
          skills: '#7c3aed',
          career: '#ea580c',
          travel: '#0d9488',
          projects: '#4f46e5',
        },
        love: {
          50: '#fdf2f8',
          100: '#fce7f3',
          300: '#f9a8d4',
          500: '#ec4899',
          700: '#be185d',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
      },
      boxShadow: {
        sm: '0 6px 20px rgba(15, 23, 42, 0.08)',
      },
      maxWidth: {
        content: '1100px',
        prose: '70ch',
      },
    },
  },
  plugins: [],
};

export default config;
