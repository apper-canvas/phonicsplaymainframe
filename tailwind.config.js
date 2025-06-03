/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f6',
          100: '#fdeae8',
          200: '#fbd4d0',
          300: '#f7b5ac',
          400: '#f0877a',
          500: '#e7624f',
          600: '#d44527',
          700: '#b2361d',
          800: '#93301c',
          900: '#7a2e1e',
          950: '#42140b',
          DEFAULT: '#e7624f',
          light: '#f0877a',
          dark: '#d44527'
        },
        secondary: {
          50: '#ecfdf6',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669'
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
          DEFAULT: '#eab308',
          light: '#fde047',
          dark: '#ca8a04'
        },
        surface: {
          50: '#fafbfc',
          100: '#f4f6f8',
          200: '#e6eaef',
          300: '#d7dde5',
          400: '#a8b4c3',
          500: '#7a8ba1',
          600: '#5c6b7f',
          700: '#475569',
          800: '#334155',
          900: '#1e293b',
          950: '#0f172a',
          DEFAULT: '#fafbfc'
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a'
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.15)',
          medium: 'rgba(255, 255, 255, 0.25)',
          strong: 'rgba(255, 255, 255, 0.35)',
          dark: 'rgba(0, 0, 0, 0.15)',
          backdrop: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.625rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.625rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '3rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '3.75rem', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '4.5rem', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '5.25rem', letterSpacing: '-0.04em' }],
        '8xl': ['6rem', { lineHeight: '6.75rem', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '8.75rem', letterSpacing: '-0.05em' }]
      },
spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem'
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
        'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.08)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.08)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
        'soft': '0 2px 25px -3px rgba(0, 0, 0, 0.04), 0 8px 20px -8px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 25px -4px rgba(0, 0, 0, 0.06), 0 8px 15px -8px rgba(0, 0, 0, 0.06)',
        'playful': '0 8px 32px rgba(231, 98, 79, 0.12), 0 4px 16px rgba(16, 185, 129, 0.06)',
        'letter': '0 4px 18px rgba(234, 179, 8, 0.15), 0 2px 8px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px rgba(231, 98, 79, 0.3), 0 0 50px rgba(16, 185, 129, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'premium': '0 12px 40px -4px rgba(0, 0, 0, 0.08), 0 4px 15px -4px rgba(0, 0, 0, 0.04)'
      },
      borderRadius: {
        'none': '0',
        'sm': '0.1875rem',
        'DEFAULT': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        'bubble': '2rem',
        'organic': '2.5rem',
        'full': '9999px'
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pop': 'pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'star-pop': 'starPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'star-glow': 'starGlow 1s ease-in-out',
        'star-bounce': 'starBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'star-rotate': 'starRotate 0.5s ease-out',
        'star-pulse': 'starPulse 0.4s ease-in-out'
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' }
        },
        pop: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '0.95' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.02)' }
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        starPop: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1.15) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '1' }
        },
        starGlow: {
          '0%, 100%': { filter: 'brightness(1) drop-shadow(0 0 8px rgba(234, 179, 8, 0.3))' },
          '50%': { filter: 'brightness(1.3) drop-shadow(0 0 15px rgba(234, 179, 8, 0.6))' }
        },
        starBounce: {
          '0%': { transform: 'translateY(0px) scale(1)' },
          '30%': { transform: 'translateY(-12px) scale(1.05)' },
          '60%': { transform: 'translateY(-6px) scale(1.02)' },
          '100%': { transform: 'translateY(0px) scale(1)' }
        },
        starRotate: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        },
        starPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.95)' }
        }
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
'3xl': '32px'
      },
      transitionDuration: {
        '400': '400ms'
      }
    }
  },
  plugins: [],
}