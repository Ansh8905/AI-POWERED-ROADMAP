/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        shell: '#f5f7fb',
        mist: '#dbe4f0',
        panel: '#ffffff',
        tealdeep: '#0f766e',
        cobalt: '#2563eb',
        coral: '#f97316',
        aurora: '#7c3aed'
      },
      fontFamily: {
        sans: ['Aptos', '"Segoe UI"', 'ui-sans-serif', 'system-ui'],
        display: ['"Space Grotesk"', 'Aptos', '"Segoe UI"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        panel: '0 18px 40px rgba(15, 23, 42, 0.08)',
        glow: '0 0 0 1px rgba(255,255,255,0.4), 0 24px 60px rgba(37, 99, 235, 0.12)'
      },
      animation: {
        floatin: 'floatin 0.7s ease-out forwards',
        'pulse-soft': 'pulseSoft 2.2s ease-in-out infinite'
      },
      keyframes: {
        floatin: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.65' },
          '50%': { opacity: '1' }
        }
      }
    }
  },
  plugins: []
};
