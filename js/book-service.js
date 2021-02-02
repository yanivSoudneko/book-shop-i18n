'use strict'
const KEY = 'books'
var gBooks;
var gBookTitles = ['Start with why ', 'The 5am club', 'How to Win Friends & Influence People', 'Zero to One']
var gNextId = 1;
var gSortBy = '';
var  gPageIdx  =  0;
const  PAGE_SIZE  = 8;

_createBooks()

function changePage(diff) {
    if (!gPageIdx) return;
    gPageIdx += diff;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function getBooks() {
    var books = gBooks
    var  startIdx  =  gPageIdx * PAGE_SIZE;    
    if (gSortBy) {
        books = sortBooks()
    }
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function setSort(sortBy) {
    gSortBy = sortBy;
}


function getBookTitles() {
    return gBookTitles;
}

function getBookById(bookId) {
    var book = gBooks.find(function(book) {
        return book.id === bookId
    })
    return book
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id
    })
    if (bookIdx === -1) return
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function updateRate(bookId, rate) {
    var book = gBooks.find(function(book) {
        return book.id === bookId
    })
    book.rate = rate
    _saveBooksToStorage()
}

function updateBook(bookId, bookPrice) {
    var book = gBooks.find(function(book) {

        return book.id === bookId
    })
    if (!book.price) return

    book.price = bookPrice
    _saveBooksToStorage()
}

function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
}


function _createBook(name = gBookTitles, price = getRandomIntInclusive(1, 30), rate = 0) {
    return {
        id: makeId(),
        name: makeLorem(5),
        price: price,
        author: makeLorem(2),
        rate: 0
    }
}


function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 21; i++) {
            var book = gBookTitles[getRandomIntInclusive(0, gBookTitles.length - 1)]
            books.push(_createBook(book))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function updateBookRating(bookId, diff) {
    var book = getBookById(bookId);
    if (!book.rate && diff < 0 || book.rate === 5 && diff > 0) return book.rate;
    book.rate += diff;
    _saveBooksToStorage();
    return book.rate;
}

function sortBooks() {
    return gBooks.sort(function(book1, book2) {
        if (gSortBy === 'title' || gSortBy === 'id') {
            console.log('book1', book1);
            console.log('book2', book1);
            return book1.name.localeCompare(book2.name)
        }
        return book1.price - book2.price
    })
}

function updatePageIdx(currPageIdx) {
    gPageIdx = currPageIdx
}