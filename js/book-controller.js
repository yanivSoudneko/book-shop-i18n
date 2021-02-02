'use strict'

function init() {
    console.log('hey');
    doTrans()
    render()
}

function render() {
    renderBooks()
}



function renderBooks() {
    var books = getBooks()
    var strHTMLs = books.map(function(book) {
        return `
        <tr><td>${book.id}</td>
        <td>${book.name}</td>
        <td>${formatCurrency(book.price)}</td>
        <td><button data-trans="btn-read" class="mainRead"  onclick="onBookDetails('${book.id}')">Read</button>
        <button  data-trans="btn-update" class="mainUpdate"  onclick="onUpdateBook(${book.id})">Update</button>
        <button data-trans="btn-delete" class="mainDelete"  onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`
    })
    document.querySelector('.books-container').innerHTML = strHTMLs.join('')
    doTrans()
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
    var bookRate = updateBookRating(bookId, diff);
    // document.querySelector('.counter').innerText = bookRate;
    renderBooks()
}

function onSetPage(elPage) {
    var currPageIdx = +elPage.innerText - 1;
    updatePageIdx(currPageIdx);
    renderBooks()
    console.log(gPageIdx);

}

function onChangePage(diff) {
    changePage(diff);
    renderBooks();
}

function onSortList(sortBy) {
    setSort(sortBy);
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')

    }
    doTrans()
    render()
}