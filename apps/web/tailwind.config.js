// apps/web/tailwind.config.js
import tailwindcssAnimate from "tailwindcss-animate"; // <-- CAMBIO: Usamos import

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // 👇 CAMBIO: Añadimos explícitamente los archivos de historias
    "./src/**/*.stories.{js,ts,jsx,tsx}",
  ],
  theme: {
    // ... tu tema se queda igual ...
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        neutral: {
          50: "hsl(var(--neutral-50, 0 0% 98%))",
          100: "hsl(var(--neutral-100))",
          200: "hsl(var(--neutral-200))",
          300: "hsl(var(--neutral-300, 0 0% 89%))",
          400: "hsl(var(--neutral-400, 0 0% 64%))",
          500: "hsl(var(--neutral-500, 0 0% 45%))",
          600: "hsl(var(--neutral-600, 0 0% 32%))",
          700: "hsl(var(--neutral-700, 0 0% 23%))",
          800: "hsl(var(--neutral-800, 0 0% 13%))",
          900: "hsl(var(--neutral-900))",
        },
        success: "hsl(var(--success, 142 76% 36%))",
        warning: "hsl(var(--warning, 38 92% 50%))",
        error: "hsl(var(--error, 0 84% 60%))",
        info: "hsl(var(--info, 217 91% 60%))",
        academy: {
          blue: "hsl(var(--academy-blue))",
          green: "hsl(var(--academy-green))",
          gold: "hsl(var(--academy-gold))",
        },
        paper: {
          DEFAULT: "hsl(var(--paper))",
          dark: "hsl(var(--paper-dark))",
        },
      },
      fontSize: {
        "display-lg": ["3rem", { lineHeight: "1.1", fontWeight: "700" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", fontWeight: "600" }],
        "heading-lg": ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-md": ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.5", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        xs: "0.25rem",
        sm: "0.375rem",
        base: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "pulse-soft": "pulse-soft 1.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(to right, hsl(var(--academy-blue)), hsl(var(--academy-green)))",
        "gradient-card":
          "linear-gradient(145deg, hsl(var(--paper)), hsl(var(--paper-dark)))",
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        "4xl": "4rem",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0,0,0,0.05)",
        subtle: "0 2px 6px rgba(0,0,0,0.08)",
        sm: "0 4px 8px rgba(0,0,0,0.1)",
        medium: "0 4px 12px rgba(0,0,0,0.12)",
        lg: "0 8px 16px rgba(0,0,0,0.15)",
        heavy: "0 8px 20px rgba(0,0,0,0.2)",
        "elevation-1": "0 12px 24px rgba(0,0,0,0.18)",
        "elevation-2": "0 16px 32px rgba(0,0,0,0.22)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(.28,.84,.42,1)",
      },
      zIndex: {
        hide: "-1",
        base: "0",
        dropdown: "1000",
        modal: "1050",
        popover: "1100",
        tooltip: "1150",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      lineHeight: {
        tight: "1.1",
        snug: "1.3",
        normal: "1.5",
        relaxed: "1.6",
        loose: "1.8",
      },
    },
  },
  plugins: [tailwindcssAnimate], // <-- CAMBIO: Usamos la variable importada
};
