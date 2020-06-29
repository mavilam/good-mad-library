import {composeLibraryLink} from '../utils/bookUtils'

export class BookData {
  title : string
  image : string
  author : string
  rating : number
  pages : number
  libraryLinks

  constructor (book) {
    this.title = book.title
    this.image = book.image_url
    this.author = book.authors.author.name
    this.rating = Number(book.average_rating)
    this.pages = Number(book.num_pages)
    this.libraryLinks = composeLibraryLink(book.title, book.authors.author.name)
  }
}