import logger from './logger'

function getToReadBooks(goodreadsObj, userId : string) : string[] {
  return goodreadsObj.getBooksOnUserShelf(userId, "to-read").then(async response => { 
    logger.info(`${userId} - To-read`)
    let currentPage : number = Number(response.books.currentpage)
    const totalPages : number = Number(response.books.numpages)
    let bookArr : string[] = response.books.book
    for(let requestedPage = currentPage + 1; requestedPage <= totalPages; requestedPage ++ ) {
      const res = await goodreadsObj.getBooksOnUserShelf(userId, "to-read", {page: requestedPage})
      bookArr = bookArr.concat(res.books.book)
    }
    return bookArr
  })
  .catch(err => {
    logger.error(err)
    throw err
  })
}

function getUserData(goodreadsObj) {
  return  goodreadsObj.getCurrentUserInfo()
    .then(userInfo => { 
      logger.info(`${userInfo.user.id} - UserData`)
      return userInfo.user
    })
    .catch(err => {
      logger.error(err)
      throw err
    })
}

export {getToReadBooks, getUserData}
