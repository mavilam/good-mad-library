import express from 'express'
import goodreads from 'goodreads-api-node'
import bodyParser from 'body-parser'
import path from 'path'
import { BookData } from './model/bookData'
import { composeHtml, readHtml, writeHtml } from './utils/htmlUtils'

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
      res.status(500).sendFile(path.join(__dirname, '500.html'))
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
      res.status(500).sendFile(path.join(__dirname, '500.html'))
    })
   });
})

app.get('/to-read', (req, res) => {
    return gr.getBooksOnUserShelf(userId, "to-read").then(response => { 
      console.log(`${userId} - To-read`)
      const bookData: BookData[] = response.books.book.map(book => new BookData(book))
      const htmlbase : string = readHtml()
      const bookListDivs : string = composeHtml(bookData)
      writeHtml(htmlbase.replace('<!--body-->', bookListDivs))
      return res.sendFile(path.join(__dirname, 'index.html'))
    })
    .catch(err => {
      console.log(err)
      res.status(500).sendFile(path.join(__dirname, '500.html'))
  })
})

app.listen(8081, function () {
  console.log("I'm running")
})
