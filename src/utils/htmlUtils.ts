import { BookData } from '../model/bookData'
import fs from 'fs'
import path from 'path'

function composeHtml(books : BookData[]) : string{
  return books.map(book => composeBookElement(book)).reduce((prev, curr) => `${prev}${curr}`)
}

function composeBookElement(book) : string {
  return `<div class=\"book\"><img src=\"${book.image}\" alt=\"Book cover\"><p>${book.title} de ${book.author}</p><a href=\"${book.libraryLinks.paper}\">Biblioteca</a><br><a href=\"${book.libraryLinks.ebiblio}\">eBiblio</a></div>`
}

function readHtml(name) : string {
  return fs.readFileSync(path.join(__dirname, `../../front/_${name}`), 'utf-8')
}

function writeHtml(html, name) : void {
  fs.writeFileSync(path.join(__dirname, `../${name}`), html, {
    flag: 'w'
  })
}

export {composeHtml, readHtml, writeHtml}
