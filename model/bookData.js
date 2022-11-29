"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookData = void 0;
const bookUtils_1 = require("../utils/bookUtils");
class BookData {
    constructor(book) {
        this.title = book.title;
        this.image = book.image_url;
        this.author = book.authors.author.name;
        this.rating = Number(book.average_rating);
        this.pages = Number(book.num_pages);
        this.libraryLinks = (0, bookUtils_1.composeLibraryLink)(book.title, book.authors.author.name);
    }
}
exports.BookData = BookData;
