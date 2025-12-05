/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'slide-up-fade': 'slideUpFade 650ms cubic-bezier(.2,.9,.2,1) both',
        'slide-up-fade-lg': 'slideUpFade 850ms cubic-bezier(.2,.9,.2,1) both',
        'slide-up-fade-xl': 'slideUpFade 1050ms cubic-bezier(.2,.9,.2,1) both',
        'pill-in-1': 'pillIn 600ms cubic-bezier(.2,.9,.2,1) 1200ms both',
        'pill-in-2': 'pillIn 600ms cubic-bezier(.2,.9,.2,1) 1350ms both',
        'pill-in-3': 'pillIn 600ms cubic-bezier(.2,.9,.2,1) 1500ms both',
        'float-in': 'floatIn 700ms cubic-bezier(.2,.9,.2,1) 1 both',
        'pulse-ring': 'pulseRing 3.2s ease-in-out infinite',
        'reveal': 'reveal 600ms cubic-bezier(.2,.9,.2,1) both',
      },
      keyframes: {
        slideUpFade: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        pillIn: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        floatIn: {
          from: { transform: 'translateY(18px) scale(0.98)', opacity: '0' },
          to: { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        pulseRing: {
          '0%': { transform: 'translate(-50%, -50%) scale(0.96)', opacity: '0.6' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.06)', opacity: '1' },
          '100%': { transform: 'translate(-50%, -50%) scale(0.96)', opacity: '0.6' },
        },
        reveal: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
