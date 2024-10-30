/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F5F7FA',
          DEFAULT: '#E4E7EB',
          dark: '#CBD2D9'
        },
        primary: {
          50: '#E6F6F4',
          100: '#CCECE9',
          200: '#99D9D3',
          300: '#66C5BD',
          400: '#33B2A6',
          500: '#009F90',
          600: '#007F73',
          700: '#005F56',
          800: '#00403A',
          900: '#00201D'
        },
        accent: {
          50: '#FFF0E6',
          100: '#FFE1CC',
          200: '#FFC399',
          300: '#FFA466',
          400: '#FF8533',
          500: '#FF6600',
          600: '#CC5200',
          700: '#993D00',
          800: '#662900',
          900: '#331400'
        }
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'sans-serif'],
        display: ['Noto Sans TC', 'sans-serif'],
      },
      boxShadow: {
        'smooth': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}