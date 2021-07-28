import express from 'express'
import goodreads from 'goodreads-api-node'
import bodyParser from 'body-parser'
import path from 'path'
import { BookData } from './model/bookData'
import { getToReadBooks, getUserData } from './utils/goodreadsUtils'
import logger from './utils/logger'

const myCredentials = {
  key: process.env['KEY'],
  secret: process.env['SECRET']
}
const gr = goodreads(myCredentials)
const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

const serverURL : string = process.env['URL']
const sitePort : Number = Number(process.env['PORT'])
const frontURL : string = 'https://mavilam.github.io/good-mad-library'

app.use((req, res, next)  => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
});

app.get('/', (req, res)  => {
  return res.redirect(frontURL)
})

app.get('/init_oauth', (req, res)  => {
  gr.initOAuth(`${serverURL}/goodreads_oauth_callback`)
  return gr.getRequestToken()
    .then(url => {
      res.status(200).json({oAuthUrl: url})
    })
    .catch(err => {
      logger.error(err)
      res.status(500).json({error: err})
    })
})

app.get('/goodreads_oauth_callback', (req, res) => {
  gr.getAccessToken()
  .then(() => {
    res.status(200).redirect(`${frontURL}#/callback`)
   });
})

app.get('/user-data', (req, res) => {
  return getUserData(gr).then(data => {
    return res.status(200).json(data)
   })
   .catch(err => {
     logger.error(err)
     res.status(500).json({error: err})
   })
})

app.get('/to-read', async (req, res) => {
  try{
    const userId = req.query.userid
    let bookArr : string[] = await getToReadBooks(gr, userId)
    if (!bookArr || bookArr.length < 1) return res.status(200).json([])
    const bookData : BookData[] = bookArr.map(book => new BookData(book))
    return res.status(200).json(bookData)
  } catch(err) {
    logger.error(err)
    if (err.message.includes('need an oAuth')) return res.redirect(frontURL)
    res.status(500).json({error: err})
  }
})

app.listen(sitePort, function () {
  logger.info(`I'm running on ${serverURL}:${sitePort}`)
})
