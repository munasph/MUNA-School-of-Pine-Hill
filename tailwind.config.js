/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ngess: {
          primary:   '#00864B',
          dark:      '#005C35',
          light:     '#00A85F',
          accentMed: '#66B693',
          accentSoft:'#B4DBCA',
          bgLight:   '#E1F1EA'
        },
        clay: {
          primary:   '#4F46E5',
          secondary: '#818CF8',
          cta:       '#F97316',
          success:   '#10B981',
          warning:   '#F59E0B',
          error:     '#EF4444'
        }
      },
      fontFamily: {
        sans:  ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif']
      }
    }
  },
  plugins: []
};
