/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        subtitle: '#d1d5db',
      },
      borderColor: {
        'default-border': '#404040',
      },
      fontFamily: {
        'poppins-light': ['Poppins Light', 'sans-serif'],
        'poppins-regular': ['Poppins Regular', 'sans-serif'],
        'poppins-medium': ['Poppins Medium', 'sans-serif'],
        'poppins-semibold': ['Poppins Semibold', 'sans-serif'],
        'poppins-bold': ['Poppins Bold', 'sans-serif'],
      },
      boxShadow: {
        'custom-black': '4px 4px 0px black', // Customize the shadow here
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        marquee2: 'marquee2 60s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};
