var gTrans = {
    title: {
        en: 'WELCOME TO MY BOOKSHOP',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    'btn-book-placeholder': {
        en: 'Book name',
        he: 'שם הספר'
    },
    'btn-book-price-placeholder': {
        en: 'price',
        he: 'מחיר'
    },
    'id-head': {
        en: 'id',
        he: 'מספר סידורי'
    },
    'title-head': {
        en: 'Title',
        he: 'שם הספר'
    },
    'title-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'title-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'btn-read': {
        en: 'Read',
        he: 'מידע'
    },
    'btn-update': {
        en: 'Update',
        he: 'עדכון'
    },
    'btn-delete': {
        en: 'Delete',
        he: 'ביטול'
    },
    add: {
        en: 'Add',
        he: 'הוסף'
    },
    'rate-me': {
        en: 'rate',
        he: 'דירוג'
    }
}

var gCurrLang = 'en'

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function(el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt)
        } else {
            el.innerText = txt
        }
    })
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    var txt = keyTrans[gCurrLang]


    if (!txt) txt = keyTrans['en']
    return txt
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('he')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    if (gCurrLang === 'en') {
        return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(num);
    } else {
        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);

    }
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}