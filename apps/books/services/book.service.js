import { utilService } from "./util.service.js";
import { storageService } from "./storage.service.js";
import { booksDB } from "./booksDB.js"

export const bookService = {
    query,
    getBookById,
    addReview,
    removeReview,
    searchBooks,
    addGoogleBook
}

const KEY = 'booksDB'
const SEARCH_RES_KEY = 'searchDB'

function query(filter) {
    let books = _loadFromStorage()
    if (!books) {
        books = booksDB
        _saveToStorage(books)
    }

    if (filter) {
        let { title, maxPrice } = filter
        let regEx = new RegExp(title.toLowerCase())
        books = books.filter(book => (
            book.listPrice.amount < maxPrice &&
            regEx.test(book.title.toLowerCase())
        ))
    }
    return Promise.resolve(books)
}

function getBookById(bookId) {
    let books = _loadFromStorage()
    let book = books.find(book => book.id === bookId)
    return Promise.resolve(book)
}

function searchBooks(searchTerm) {
    let searchResults = storageService.loadFromStorage(SEARCH_RES_KEY)

    if (!searchResults)
        axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`)
            .then(res => {
                storageService.saveToStorage(SEARCH_RES_KEY, res.data.items)
                searchResults = res.data.items
                return Promise.resolve(searchResults)
            })
    return Promise.resolve(searchResults)
}

function addReview(bookId, review) {
    review.id = utilService.makeId()
    let books = _loadFromStorage()
    let bookToUpdate = books.find(book => book.id === bookId)
    if (!bookToUpdate.reviews) bookToUpdate.reviews = [review]
    else bookToUpdate.reviews.push(review)

    books = books.map(book => book.id === bookId ? bookToUpdate : book)
    _saveToStorage(books)

    return Promise.resolve()
}

function removeReview(bookId, reviewId) {
    let books = _loadFromStorage()
    let bookToUpdate = books.find(book => book.id === bookId)
    let reviewIdx = bookToUpdate.reviews.findIndex(review => review === reviewId)
    bookToUpdate.reviews.splice(reviewIdx, 1)
    books = books.map(book => book.id === bookId ? bookToUpdate : book)
    _saveToStorage(books)
    return Promise.resolve()
}

function addGoogleBook(googleBook) {
    let { id, volumeInfo } = googleBook
    let { title, subtitle, authors, publishedDate, description, pageCount, categories, imageLinks, language } = volumeInfo

    let newBook = {
        id,
        title,
        subtitle,
        authors,
        publishedDate,
        description, pageCount, categories, thumbnail: imageLinks.thumbnail, language,
        listPrice: {
            amount: utilService.getRandomIntInclusive(10, 170),
            currencyCode: "ILS",
            isOnSale: Math.random() > 0.5 ? true : false
        }
    }

    let books = _loadFromStorage()
    books.push(newBook)
    _saveToStorage(books)
}



function _saveToStorage(data) {
    storageService.saveToStorage(KEY, data)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}