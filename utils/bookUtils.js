"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBooks = exports.composeLibraryLink = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("./logger"));
function composeLibraryLink(title, author) {
    const titleWoAccents = prepareText(title).replace(/\(.*/, "");
    const authorWoAccents = prepareText(author);
    return {
        paperDesktop: `https://gestiona3.madrid.org/biblio_publicas/cgi-bin/abnetopac?SUBC=OPP/BPZ&ACC=DOSEARCH&xsqf99=${titleWoAccents}+${authorWoAccents}`,
        paperMobile: `https://gestiona3.madrid.org/mopac/cgi-bin/abnetopac?SUBC=OPP/BPZ&ACC=DOSEARCH&xsqf99=${titleWoAccents}+${authorWoAccents}`,
        ebiblio: `http://madrid.ebiblio.es/opac/?query=${titleWoAccents} ${authorWoAccents}`
    };
}
exports.composeLibraryLink = composeLibraryLink;
function writeBooks(books) {
    fs_1.default.writeFile('src/front/bookinfo/books.json', JSON.stringify(books), {
        flag: 'w'
    }, (err) => {
        if (err)
            logger_1.default.error(`There was an error: ${err}`);
    });
}
exports.writeBooks = writeBooks;
function prepareText(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '+');
}
