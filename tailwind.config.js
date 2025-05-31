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
          DEFAULT: '#FF6B6B',
          light: '#FF8E8E',
          dark: '#E55555'
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          light: '#7DD3CC',
          dark: '#45B7B8'
        },
        accent: '#FFE66D',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      border: {
        DEFAULT: '#e2e8f0',
        light: '#f1f5f9',
        dark: '#cbd5e1'
      },
      background: {
        DEFAULT: '#ffffff',
        secondary: '#f8fafc'
      },
      foreground: {
        DEFAULT: '#0f172a',
        muted: '#64748b'
      },
      fontFamily: {
        sans: ['Fredoka', 'ui-sans-serif', 'system-ui'],
        heading: ['Comic Neue', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)',
        'playful': '0 8px 32px rgba(255, 107, 107, 0.2), 0 4px 16px rgba(78, 205, 196, 0.1)',
        'letter': '0 4px 12px rgba(255, 230, 109, 0.3), 0 2px 6px rgba(0, 0, 0, 0.1)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        'bubble': '2rem'
      },
animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pop': 'pop 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'star-pop': 'starPop 0.6s ease-out',
        'star-glow': 'starGlow 1s ease-in-out',
        'star-bounce': 'starBounce 0.8s ease-out',
        'star-rotate': 'starRotate 0.5s ease-out',
        'star-pulse': 'starPulse 0.4s ease-in-out'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        starPop: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        starGlow: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' }
        },
        starBounce: {
          '0%': { transform: 'translateY(0px)' },
          '30%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        starRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        starPulse: {
          '0%, 100%': { opacity: '1' },
'50%': { opacity: '0.7' }
        },
        overflow: {
          'hidden-mobile': 'hidden'
        },
        touchAction: {
          'none': 'none',
          'pan-x': 'pan-x',
          'pan-y': 'pan-y',
          'manipulation': 'manipulation'
        },
        height: {
          'screen-safe': '100vh',
          'screen-safe-small': '100svh'
        },
        maxHeight: {
          'screen-safe': '100vh',
          'screen-safe-small': '100svh'
        }
      }
    },
    gridTemplateColumns: {
      'dynamic-1': 'repeat(1, minmax(0, 1fr))',
      'dynamic-2': 'repeat(2, minmax(0, 1fr))',
      'dynamic-3': 'repeat(3, minmax(0, 1fr))',
      'dynamic-4': 'repeat(4, minmax(0, 1fr))'
    }
  },
  plugins: [],
  darkMode: 'class',
}