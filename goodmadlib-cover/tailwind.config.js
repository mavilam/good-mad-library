module.exports = {
  theme: {
    colors: {
      'blue-text': '#47646f',
      'blue-back': '#007ace',
    },
    borderColor: theme => ({
    ...theme('colors'),
    })
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/**/*.html',
      './src/**/*.vue'
    ]
  }
}
