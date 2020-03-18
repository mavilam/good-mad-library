function getToReadBooks(goodreadsObj, userId : string) : string[] {
  return goodreadsObj.getBooksOnUserShelf(userId, "to-read").then(async response => { 
    console.log(`${userId} - To-read`)
    let currentPage : number = Number(response.books.currentpage)
    const totalPages : number = Number(response.books.numpages)
    let bookArr : string[] = response.books.book
    for(let requestedPage = currentPage + 1; requestedPage <= totalPages; requestedPage ++ ) {
      const res = await goodreadsObj.getBooksOnUserShelf(userId, "to-read", {page: requestedPage})
      bookArr = bookArr.concat(res.books.book)
    }
    return bookArr
  })
}

export {getToReadBooks}