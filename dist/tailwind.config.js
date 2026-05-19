module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        navy: '#27336a',
        red: '#9b2a27',
        white: '#ffffff',
        offwhite: '#fcfcfc',
        graylight: '#f3f4f6'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      spacing: {
        '128': '32rem'
      }
    }
  },
  safelist: [
    'py-4', 'py-6', 'shadow-md', 'opacity-0', 'pointer-events-none',
    'translate-y-full', 'hidden', 'flex', 'input-error'
  ]
};
