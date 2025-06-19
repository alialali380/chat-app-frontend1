/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // يمكنك إضافة ألوان مخصصة هنا إذا أردت
        primary: '#1C64F2',   // لون زر الإرسال
        secondary: '#6C757D', // لون ثانوي للمستخدمين الآخرين
        success: '#10B981',   // لون النقطة الخضراء للمستخدمين المتصلين
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
}