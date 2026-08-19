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
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#b9dcff',
          300: '#87c4ff',
          400: '#4fa3ff',
          500: '#2680f5',
          600: '#1763d1',
          700: '#144fa8',
          800: '#154386',
          900: '#173a6e',
          950: '#0f2547',
        },
        accent: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
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
