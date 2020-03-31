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

var userId : string = ""
const siteURL : string = process.env['URL']

app.get('/', function(req, res) {
  gr.initOAuth(`${siteURL}/goodreads_oauth_callback`)
  return gr.getRequestToken()
    .then(url => { 
      return res.redirect(url)
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
      userId = userInfo.user.id
      console.log(`${userId} - Callback`)
      return res.redirect('/to-read')
    })
    .catch(err => {
      console.log(err)
      res.status(500).sendFile(path.join(__dirname, '../front/500.html'))
    })
   });
})

app.get('/to-read', async (req, res) => {
  try{
      let bookArr : string[] = await getToReadBooks(gr, userId)
      if (bookArr.length < 1) return res.status(200).sendFile(path.join(__dirname, '../front/noBooks.html'))
      const bookData : BookData[] = bookArr.map(book => new BookData(book))
      const htmlbase : string = readHtml()
      const bookListDivs : string = composeHtml(bookData)
      writeHtml(htmlbase.replace('<!--body-->', bookListDivs))
      return res.sendFile(path.join(__dirname, 'index.html'))
  } catch(err) {
    console.log(err)
    res.status(500).sendFile(path.join(__dirname, '../front/500.html'))
  }
})

app.listen(Number(process.env['PORT']), function () {
  console.log("I'm running")
})
