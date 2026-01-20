/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stripe's exact color palette
        primary: {
          DEFAULT: '#635BFF', // Stripe Purple
          50: '#F4F3FF',
          100: '#EBE9FE',
          200: '#D9D6FE',
          300: '#BDB4FE',
          400: '#A195FD',
          500: '#635BFF',
          600: '#5851DB',
          700: '#4E47B8',
          800: '#433D95',
          900: '#38347A',
        },
        // Stripe's UI grays
        gray: {
          50: '#F7F9FC',
          100: '#F4F6F9',
          200: '#E6EAF0',
          300: '#D4DAE4',
          400: '#A8B4C8',
          500: '#697386',
          600: '#525F7F',
          700: '#424770',
          800: '#32325D',
          900: '#1A1F36',
        },
        // Stripe semantic colors
        success: {
          DEFAULT: '#00D924',
          light: '#E6F9EA',
          dark: '#00A319',
        },
        warning: {
          DEFAULT: '#FFB020',
          light: '#FFF8E6',
          dark: '#CC8C1A',
        },
        danger: {
          DEFAULT: '#ED5F74',
          light: '#FCE8EB',
          dark: '#C4314B',
        },
        info: {
          DEFAULT: '#0090FF',
          light: '#E6F4FF',
          dark: '#0073CC',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          'Monaco',
          '"Cascadia Code"',
          '"Roboto Mono"',
          'Consolas',
          '"Courier New"',
          'monospace',
        ],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['0.9375rem', { lineHeight: '1.5rem' }], // Stripe uses 15px base
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(50, 50, 93, 0.11), 0 1px 0 0 rgba(0, 0, 0, 0.08)',
        'md': '0 4px 6px -1px rgba(50, 50, 93, 0.11), 0 2px 4px -1px rgba(0, 0, 0, 0.08)',
        'lg': '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)',
        'xl': '0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)',
        'stripe': '0px 2px 5px rgba(60, 66, 87, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.12)',
        'stripe-lg': '0px 15px 35px rgba(60, 66, 87, 0.08), 0px 5px 15px rgba(0, 0, 0, 0.12)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
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
    },
  },
  plugins: [],
}
