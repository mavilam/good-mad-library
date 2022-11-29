"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.getToReadBooks = void 0;
const logger_1 = __importDefault(require("./logger"));
function getToReadBooks(goodreadsObj, userId) {
    return goodreadsObj.getBooksOnUserShelf(userId, "to-read").then(async (response) => {
        logger_1.default.info(`${userId} - To-read`);
        let currentPage = Number(response.books.currentpage);
        const totalPages = Number(response.books.numpages);
        let bookArr = response.books.book;
        for (let requestedPage = currentPage + 1; requestedPage <= totalPages; requestedPage++) {
            const res = await goodreadsObj.getBooksOnUserShelf(userId, "to-read", { page: requestedPage });
            bookArr = bookArr.concat(res.books.book);
        }
        return bookArr;
    })
        .catch(err => {
        logger_1.default.error(err);
        throw err;
    });
}
exports.getToReadBooks = getToReadBooks;
function getUserData(goodreadsObj) {
    return goodreadsObj.getCurrentUserInfo()
        .then(userInfo => {
        logger_1.default.info(`${userInfo.user.id} - UserData`);
        return userInfo.user;
    })
        .catch(err => {
        logger_1.default.error(err);
        throw err;
    });
}
exports.getUserData = getUserData;
