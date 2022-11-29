declare function composeLibraryLink(title: string, author: string): {
    paperDesktop: string;
    paperMobile: string;
    ebiblio: string;
};
declare function writeBooks(books: any): void;
export { composeLibraryLink, writeBooks };
