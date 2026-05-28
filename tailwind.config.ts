import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta premium Indra Luxe
        indra: {
          50: "#fdf8f0",
          100: "#f5e6d0",
          200: "#e8cc9f",
          300: "#d4a96a",
          400: "#c4944a",
          500: "#a67c3b",
          600: "#8a6330",
          700: "#6d4c28",
          800: "#4a3420",
          900: "#2d1f14",
          950: "#1a120a",
        },
        saffron: {
          50: "#fff8f0",
          100: "#ffedd5",
          200: "#ffd6a0",
          300: "#ffb84d",
          400: "#ff9f1a",
          500: "#e8850a",
          600: "#c46a05",
          700: "#9c5208",
          800: "#7d3f0f",
          900: "#5c2f10",
        },
        spice: {
          50: "#fdf5f0",
          100: "#f5ddd0",
          200: "#e8b89f",
          300: "#d48e6a",
          400: "#c4734a",
          500: "#a65c3b",
          600: "#8a4830",
          700: "#6d3728",
          800: "#4a2720",
          900: "#2d1914",
        },
        gold: {
          50: "#fffdf5",
          100: "#fff9d6",
          200: "#fff0a0",
          300: "#ffe44d",
          400: "#ffd91a",
          500: "#e5b80c",
          600: "#b89008",
          700: "#8c6d0a",
          800: "#6d5410",
          900: "#5c4514",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "luxury-warm": "linear-gradient(135deg, #fdf8f0 0%, #f5e6d0 50%, #fdf5f0 100%)",
        "luxury-dark": "linear-gradient(135deg, #2d1f14 0%, #1a120a 100%)",
        "saffron-glow": "linear-gradient(135deg, #ffedd5 0%, #ffd6a0 50%, #ffb84d 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent, rgba(255,215,0,0.15), transparent)",
      },
      boxShadow: {
        luxury: "0 25px 60px -15px rgba(45, 31, 20, 0.15)",
        "luxury-sm": "0 10px 30px -10px rgba(45, 31, 20, 0.12)",
        "gold-glow": "0 0 40px rgba(229, 184, 12, 0.3)",
        "inner-warm": "inset 0 2px 10px rgba(212, 169, 106, 0.1)",
      },
      borderRadius: {
        luxury: "1rem",
        "luxury-lg": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
