import express from 'express'
import goodreads from 'goodreads-api-node'
import bodyParser from 'body-parser'
import path from 'path'
import { BookData } from './model/bookData'
import { composeHtml, readHtml, writeHtml } from './utils/htmlUtils'
import { getToReadBooks } from './utils/goodreadsUtils'

const myCredentials = {
  key: process.env['KEY'],
  secret: process.env['SECRET']
}
const gr = goodreads(myCredentials)
const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

const siteURL : string = process.env['URL']
const sitePort : Number = Number(process.env['PORT'])

app.get('/', function(req, res) {
  gr.initOAuth(`${siteURL}/goodreads_oauth_callback`)
  return gr.getRequestToken()
    .then(url => {
      const htmlbase : string = readHtml('gotoread.html')
      writeHtml(htmlbase.replace('<!--link-->', url), 'gotoread.html')
      return res.sendFile(path.join(__dirname, 'gotoread.html'))
    })
    .catch(err => {
      console.log(err)
      res.status(500).sendFile(path.join(__dirname, '../front/500.html'))
    })
})

app.get('/goodreads_oauth_callback', (req, res) => {
  gr.getAccessToken()
  .then(() => {
    gr.getCurrentUserInfo()
    .then(userInfo => { 
      const userId = userInfo.user.id
      console.log(`${userId} - Callback`)
      return res.redirect(`/to-read?userid=${userId}`)
    })
    .catch(err => {
      console.log(err)
      res.status(500).sendFile(path.join(__dirname, '../front/500.html'))
    })
   });
})

app.get('/to-read', async (req, res) => {
  try{
    const userId = req.query.userid
    let bookArr : string[] = await getToReadBooks(gr, userId)
    if (!bookArr || bookArr.length < 1) return res.status(200).sendFile(path.join(__dirname, '../front/noBooks.html'))
    const bookData : BookData[] = bookArr.map(book => new BookData(book))
    const htmlbase : string = readHtml('index.html')
    const bookListDivs : string = composeHtml(bookData)
    writeHtml(htmlbase.replace('<!--body-->', bookListDivs), `index-${userId}.html`)
    return res.sendFile(path.join(__dirname, `index-${userId}.html`))
  } catch(err) {
    console.log(err)
    if (err.message.includes('need an oAuth')) return res.redirect(siteURL)
    res.status(500).sendFile(path.join(__dirname, '../front/500.html'))
  }
})

app.listen(sitePort, function () {
  console.log(`I'm running on ${siteURL}:${sitePort}`)
})
