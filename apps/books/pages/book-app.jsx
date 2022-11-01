import { bookService } from '../services/book.service.js'
import { BookList } from '../cmp/book-list.jsx'
import { BookFilter } from '../cmp/book-filter.jsx'

const { Link } = ReactRouterDOM

export class BookApp extends React.Component {

    state = {
        books: [],
        filter: null,
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filter).then(books => this.setState({ books }))
    }

    setFilter = (filter) => {
        this.setState({ filter }, () => {
            this.loadBooks()
        })
    }

    render() {
        let { books } = this.state
        return <section className="book-app container">
            <BookFilter onSetFilter={this.setFilter} />
            <Link className="add-book-btn" to="/books/add">Add Book</Link>
            <BookList books={books} />
        </section>
    }
}