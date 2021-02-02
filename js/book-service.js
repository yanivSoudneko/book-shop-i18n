'use strict'
const KEY = 'books'
var gBooks;
var gBookTitles = ['Start with why ', 'The 5am club', 'How to Win Friends & Influence People', 'Zero to One']
var gNextId = 1;
var gSortBy = 'txt';

_createBooks()
const  PAGE_SIZE  =  5;
var  gPageIdx  =  0;


function getBooks() {
    var  startIdx  =  gPageIdx * PAGE_SIZE;    
    var books = gBooks.slice(startIdx,  startIdx  +  PAGE_SIZE)
    startIdx = getBooksSorted(gBooks)
    return books
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
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
        console.log('book.id', book.id);
        console.log('bookId', bookId);
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
        id: gNextId++,
        title: makeLorem(5),
        price: price,
        author: makeLorem(2),
        rate: rate
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


function getBooksSorted() {
    if (gSortBy === gBooks.title) return _sortByTxt(gBooks);
    else return _sortByNumber(gBooks);
}

function _sortByNumber() {
    return gBooks.sort(function(book1, book2) {
        return book1.price - book2.price;
    });
}

function _sortById() {
    return gBooks.sort(function(book1, book2) {
        return book1.id - book2.id;
    });
}


function _sortByTxt() {
    return gBooks.sort(function(book1, book2) {
        return book1.title.localeCompare(book2.title);
    });
}