/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1152px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        ink: {
          950: '#0a1220',
          900: '#0f1b2d',
          800: '#16283f',
          700: '#1f3654',
          600: '#2b4568',
        },
        brand: {
          50: '#fbeced',
          100: '#f6d7d9',
          200: '#eab0b5',
          300: '#da8288',
          400: '#c25760',
          500: '#9c1f2e',
          600: '#82192a',
          700: '#66131f',
          800: '#4f0f18',
          900: '#3b0b12',
          950: '#26060c',
        },
        accent: {
          400: '#d7b571',
          500: '#bd934a',
          600: '#9a7638',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        prose: '72ch',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
