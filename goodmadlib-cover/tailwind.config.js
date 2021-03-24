module.exports = {
  theme: {
    colors: {
      'green-text': '#235c4d',
      'green-back': '#46b99a',
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
