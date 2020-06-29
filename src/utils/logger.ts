import bunyan from 'bunyan'

var logger = bunyan.createLogger({
  name: 'goodreads-api',
  stream: process.stdout,
  level: 'info'
})

export = logger