import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4A63A',
          hover: '#E6BC55',
          faded: '#6B5A2E',
          light: '#2A2416',
        },
        ink: '#0B1020',
        surface: {
          DEFAULT: '#141A2E',
          2: '#1C2340',
        },
        vault: '#070A14',
        teal: '#3CC8C8',
        success: { DEFAULT: '#22C55E', light: '#0F2E1C' },
        warning: { DEFAULT: '#F5B546', light: '#33270F' },
        error: { DEFAULT: '#E02424', 2: '#E06666', light: '#331414' },
        body: '#C9CDD8',
        muted: '#8A90A2',
        input: { DEFAULT: '#121830', text: '#A3A9BA' },
        stroke: '#2A3150',
        header: '#F5F3EE',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      borderRadius: {
        input: '7px',
        button: '10px',
        chip: '12px',
        card: '16px',
      },
      height: {
        input: '50px',
        button: '50px',
        topbar: '72px',
      },
      width: {
        sidebar: '240px',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.4)',
        'glow-gold': '0 0 24px rgba(212,166,58,0.35)',
        'focus-gold': '0 0 0 3px rgba(212,166,58,0.2)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg,#D4A63A,#F2D27A)',
      },
    },
  },
  plugins: [],
};

export default config;
