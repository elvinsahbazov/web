/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        satoshi: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#007BFF',
          dark: '#0062CC',
          light: '#3399FF',
          softer: '#E8F2FF',
        },
        cubix: {
          blue: '#0066FF',
          black: '#000000',
          white: '#FFFFFF',
          muted: 'rgba(0,0,0,0.55)',
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)',
        'card-hover': '0 20px 60px rgba(0,102,255,0.12)',
        blue: '0 12px 32px rgba(0,102,255,0.25)',
        'blue-glow': '0 0 0 1px rgba(0,123,255,0.2), 0 16px 48px rgba(0,123,255,0.22)',
        executive: '0 24px 64px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '28px',
      },
    },
  },
  plugins: [],
};
