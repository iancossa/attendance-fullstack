/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      spacing: {
        '0.5': '2px',
        '1.5': '6px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'zoom-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'zoom-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        'slide-in-from-top': {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-out-to-top': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-4px)' },
        },
        'slide-in-from-right': {
          '0%': { opacity: '0', transform: 'translateX(4px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-in',
        'zoom-in-95': 'zoom-in 0.2s ease-out',
        'zoom-out-95': 'zoom-out 0.2s ease-in',
        'slide-in-from-top-2': 'slide-in-from-top 0.2s ease-out',
        'slide-out-to-top-2': 'slide-out-to-top 0.2s ease-in',
        'slide-in-from-right-2': 'slide-in-from-right 0.2s ease-out',
        'in': 'fade-in 0.2s ease-out, zoom-in-95 0.2s ease-out, slide-in-from-top-2 0.2s ease-out',
      },
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // SaaS Orange variants
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Primary orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // SaaS Gray variants
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Sidebar colors
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.animate-in': {
          'animation-fill-mode': 'both',
        },
        '.animate-out': {
          'animation-fill-mode': 'both',
          'animation-direction': 'reverse',
        },
        '.fade-in-0': {
          'animation-name': 'fade-in',
        },
        '.fade-out-0': {
          'animation-name': 'fade-out',
        },
        '.zoom-in-95': {
          'animation-name': 'zoom-in',
        },
        '.zoom-out-95': {
          'animation-name': 'zoom-out',
        },
        '.slide-in-from-top-2': {
          'animation-name': 'slide-in-from-top',
        },
        '.slide-out-to-top-2': {
          'animation-name': 'slide-out-to-top',
        },
        '.slide-in-from-right-2': {
          'animation-name': 'slide-in-from-right',
        },
        '.duration-200': {
          'animation-duration': '200ms',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

