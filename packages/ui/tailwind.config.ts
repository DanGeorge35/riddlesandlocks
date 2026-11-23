import type { Config } from 'tailwindcss';
import { riddlesPreset } from './src/tailwind-preset';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  presets: [riddlesPreset],
};

export default config;
