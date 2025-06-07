import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'electric-blue': '#0066FF',
        'neon-cyan': '#00FFFF', 
        'deep-space': '#0A0E27',
        
        // Secondary Colors
        'iridescent-purple': '#6366F1',
        'holographic-silver': '#E5E7EB',
        
        // Accent Colors
        'neon-green': '#00FF88',
        'coral-pink': '#FF6B6B',
        'golden-yellow': '#FFD700',
        
        // Background variants
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #E2E8F0 100%)',
        'gradient-text': 'linear-gradient(45deg, #0066FF, #00FFFF, #6366F1)',
      },
      backdropBlur: {
        'xl': '24px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #0066FF, 0 0 10px #0066FF, 0 0 15px #0066FF' },
          '100%': { boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
    },
  },
  plugins: [],
};
export default config;
