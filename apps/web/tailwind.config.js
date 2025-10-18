// apps/web/tailwind.config.js
import tailwindcssAnimate from 'tailwindcss-animate'; // <-- CAMBIO: Usamos import

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // 👇 CAMBIO: Añadimos explícitamente los archivos de historias
    './src/**/*.stories.{js,ts,jsx,tsx}', 
  ],
  theme: {
    // ... tu tema se queda igual ...
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        neutral: {
          100: 'hsl(var(--neutral-100))',
          200: 'hsl(var(--neutral-200))',
          900: 'hsl(var(--neutral-900))',
        },
        academy: {
          blue: 'hsl(var(--academy-blue))',
          green: 'hsl(var(--academy-green))',
          gold: 'hsl(var(--academy-gold))',
        },
        paper: {
          DEFAULT: 'hsl(var(--paper))',
          dark: 'hsl(var(--paper-dark))',
        },
      },
      borderRadius: {
        xl: 'var(--radius-xl)',
        lg: 'var(--radius-lg)',
        md: 'calc(var(--radius-lg) - 2px)',
        sm: 'calc(var(--radius-lg) - 4px)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'pulse-soft': 'pulse-soft 1.5s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to right, hsl(var(--academy-blue)), hsl(var(--academy-green)))',
        'gradient-card': 'linear-gradient(145deg, hsl(var(--paper)), hsl(var(--paper-dark)))',
      },
      boxShadow: {
        subtle: '0 2px 6px rgba(0,0,0,0.08)',
        medium: '0 4px 12px rgba(0,0,0,0.12)',
        heavy: '0 8px 20px rgba(0,0,0,0.2)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(.28,.84,.42,1)',
      },
    },
  },
  plugins: [tailwindcssAnimate], // <-- CAMBIO: Usamos la variable importada
};