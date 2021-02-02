'use strict'

function init() {
    console.log('hey');
    renderBooks()
        // renderPages()
}


// function renderPages() {
//     var pages = getBookTitles()
//     var strHtmls = pages.map(function(page) {
//         return `<button onclick="onNextPage()">${page}</button>`
//     })
//     document.querySelector('.pageList').innerHTML = strHtmls.join('')
// }

function renderBooks() {
    var books = getBooks()
    var strHTMLs = books.map(function(book) {
        return `<tr><td>${book.id}</td>
        <td>${book.title}</td><td>$${book.price}</td>
        <td><button class="mainRead" onclick="onBookDetails('${book.id}')">Read</button>
        <button class="mainUpdate" onclick="onUpdateBook(${book.id})">Update</button>
        <button class="mainDelete" onclick="onRemoveBook(${book.id})">Delete</button></td>
        </tr>`
    })

    document.querySelector('.books-container').innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    var bookPrice = +prompt('Price ?')
    updateBook(bookId, bookPrice)
    renderBooks()
}

function onCheckRate() {
    var elRate = document.querySelector('.rate').value
    console.log(elRate);
    if (elRate.innerText === 0 || elRate.innerText === 10) return
}


function onAddBook() {
    var name = document.querySelector('input[name=BookName]').value
    var price = document.querySelector('input[name=bookPrice]').value
    if (!name || !price) return
    if (price < 0) return
    addBook(name, +price)
    renderBooks()
}

function onSetSort(sortBy) {
    setSort(sortBy);
    renderBooks()
}

function onBookDetails() {
    var elModal = document.querySelector('.modal')
    var elH3 = document.querySelector('.popup__text h3')
    elModal.querySelector('p').innerText = makeLorem(50)
    elModal.style.display = 'block'
    elH3.innerText = makeLorem(getRandomIntInclusive(1, 6))
}

function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function onUpdateRate(bookId) {
    updateRate(bookId, rate)
    renderBooks()
}

function addRate() {
    var elRate = document.querySelector('.rate')
    if (elRate.innerText === '10') return
    elRate.innerText++

}

function lowerRate() {
    var elRate = document.querySelector('.rate')
    if (elRate.innerText === '0') return
    elRate.innerText--
}

function onNextPage() {
    nextPage();
    renderBooks();
}