module.exports = {
  "outputDir": "dist",
  "assetsDir": "static",
  "devServer": {
    "proxy": {
      "/tasks": {
        "target": "http://localhost:8082/"
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/good-mad-library/'
    : '/'
}
