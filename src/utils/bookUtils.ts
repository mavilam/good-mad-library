import fs from 'fs'

function composeLibraryLink(title: string, author: string) {
  const titleWoAccents : string = prepareText(title).replace(/\(.*/, "")
  const authorWoAccents : string = prepareText(author)
  return {
    paper:`https://gestiona3.madrid.org/biblio_publicas/cgi-bin/abnetopac?SUBC=OPP/BPZ&ACC=DOSEARCH&xsqf99=${titleWoAccents} ${authorWoAccents}`,
    ebiblio: `http://madrid.ebiblio.es/opac/?query=${titleWoAccents} ${authorWoAccents}`
  }
}

function writeBooks(books) : void {
  fs.writeFile('src/front/bookinfo/books.json', JSON.stringify(books), {
    flag: 'w'
  }, (err) => {
    if (err) console.log(`There was an error: ${err}`)
  })
}

function prepareText(str : string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(' ','+')
} 

export {composeLibraryLink, writeBooks}
