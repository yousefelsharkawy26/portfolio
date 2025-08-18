module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { light: '#3b82f6', dark: '#60a5fa' },
        background: { light: '#ffffff', dark: '#0f172a' },
      },
    },
  },
  plugins: [],
}