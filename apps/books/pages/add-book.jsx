import { bookService } from '../services/book.service.js'
import { UserMsg } from '../cmp/user-message.jsx'

export class AddBook extends React.Component {
    state = {
        searchTerm: '',
        bookRes: [],
        bookAdded: null
    }

    onSearch = (ev) => {
        ev.preventDefault()
        let searchTerm = this.state.searchTerm
        bookService.searchBooks(searchTerm).then(res => this.setState({ bookRes: res }))
        this.setState({ searchTerm: '' })
    }

    handleChange = ({ target }) => {
        let value = target.value
        this.setState({ searchTerm: value })
    }

    onAddBook = (bookId) => {
        let googleBook = this.state.bookRes.find(book => book.id === bookId)
        bookService.addGoogleBook(googleBook)
        this.setState({ bookAdded: bookId })
    }

    closeMsg = () => {
        this.setState({ bookAdded: null })
    }

    render() {
        const { onSearch, handleChange, onAddBook, closeMsg } = this
        const { searchTerm, bookRes, bookAdded } = this.state
        return <section className="add-book">
            <h1>Search for books!</h1>
            <form onSubmit={onSearch}>
                <input type="search" value={searchTerm} onChange={handleChange} />
                <button>Search</button>
            </form>

            <ul className="serch-res-container">
                {bookRes && bookRes.map(book => {
                    return <li className="book-card" key={book.id}>
                        <span>{book.volumeInfo.title}</span>
                        <button onClick={() => { onAddBook(book.id) }}>+</button>
                    </li>
                })}
            </ul>

            {bookAdded && <UserMsg bookId={bookAdded} closeMsg={closeMsg} />}
        </section>
    }

}