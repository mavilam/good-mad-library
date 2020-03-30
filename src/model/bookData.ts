import {composeLibraryLink} from '../utils/bookUtils'

export class BookData {
  title : string
  image : string
  author : string
  libraryLinks

  constructor (book) {
    this.title = book.title
    this.image = book.image_url
    this.author = book.authors.author.name
    this.libraryLinks = composeLibraryLink(book.title, book.authors.author.name)
  }
}