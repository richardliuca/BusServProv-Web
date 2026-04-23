import type { Config } from 'tailwindcss';

/** Scan paths only — tokens live in `src/styles/app-theme.css` (`@theme`). */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
};

export default config;
