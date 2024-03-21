import { themeColors } from './script/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: themeColors,
  },
};
