import {composeBiblioLink} from '../utils/bookUtils'

export class BookData {
  title : string
  image : string
  author : string
  biblioLink : string

  constructor (book) {
    this.title = book.title
    this.image = book.image_url
    this.author = book.authors.author.name
    this.biblioLink = composeBiblioLink(book.title, book.authors.author.name)
  }
}