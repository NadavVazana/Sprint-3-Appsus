import { LongTxt, longTxt } from '../cmp/long-txt.jsx'
import { bookService } from '../services/book.service.js'
import { ReviewAdd } from '../cmp/review-add.jsx'

export class BookDetails extends React.Component {

    state = {
        isLongTxtShown: false,
        book: null
    }

    componentDidMount() {
        this.loadBook()
    }

    loadBook = () => {
        let { bookId } = this.props.match.params
        bookService.getBookById(bookId).then(res => {
            this.setState({ book: res })
        })
    }

    getCurrencyIcon = (currency) => {
        switch (currency) {
            case 'ILS':
                return '₪'
            case 'USD':
                return '$'
            case 'EUR':
                return '€'
        }
    }

    getReadingLevel = (pgCount) => {
        if (pgCount > 500) return <span className="category long-reading">Long reading</span>
        if (pgCount > 200) return <span className="category decent-reading">Decent reading</span>
        if (pgCount < 100) return <span className="category ligth-reading">Light reading</span>
    }

    getBookAge = (publishedDate) => {
        let currYear = new Date().getFullYear()
        if (currYear - publishedDate >= 10) return <span className="category">Veteran Book</span>
        if (currYear - publishedDate <= 1) return <span className="category">New!</span>
    }

    getPricingClass = (price) => {
        if (price > 150) return 'price-red'
        if (price < 20) return 'price-green'
    }

    toggleText = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    onGoBack = () => {
        this.props.history.push('/books')
    }

    onRemove = (reviewId) => {
        let { bookId } = this.props.match.params
        bookService.removeReview(bookId, reviewId).then(this.loadBook())
    }



    render() {
        let { book, isLongTxtShown } = this.state

        if (!book) return <h1>Book loading...</h1>

        let bookAge = this.getBookAge(book.publishedDate)
        let readingLevel = this.getReadingLevel(book.pageCount)
        let currencyIcon = this.getCurrencyIcon(book.listPrice.currencyCode)
        let pricingClass = this.getPricingClass(book.listPrice.amount)
        let buttonTxt = this.state.isLongTxtShown ? 'Show less' : 'Show more'
        let isOnSale = book.listPrice.isOnSale

        return <section className="book-details">
            <div className="book-details-container">
                <div className="product-info">
                    <div className="img-container">
                        <img src={book.thumbnail} />
                        {isOnSale && <div className="sale">SALE</div>}
                    </div>
                    <div className="info">
                        <h2>{book.title}</h2>
                        <p>{book.subtitle}</p>
                        <p className="author">By (author) {book.authors[0]}</p>
                        <LongTxt txt={book.description} isLongTxtShown={this.state.isLongTxtShown} />
                        <button className="btn btn-txt" onClick={this.toggleText}>{buttonTxt}</button>
                    </div>
                </div>

                <div className="product-details">
                    <p><span className='info'>Publication date:</span> {book.publishedDate} {bookAge}</p>
                    <p><span className='info'>Categories:</span>  {book.categories.map((cat, idx) => {
                        return <span className="category" key={idx}>{cat}</span>
                    })}</p>
                    <p><span className='info'>Page count:</span> {book.pageCount} {readingLevel}</p>
                    <div className="product-pricing">
                        <span className={`price ${pricingClass}`}>{currencyIcon} {book.listPrice.amount}
                            {isOnSale && <span className="sale-sm">Sale</span>}</span>
                        <button>Order Now</button>
                    </div>
                </div>
            </div>

            <div className="addreview-container container">
                <ReviewAdd bookId={book.id} loadBook={this.loadBook} />
            </div>

            <div className="reviews-container">
                <h3>Community Reviews</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Reviewer</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Read at</th>
                            <th>Remove Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book.reviews && book.reviews.map(review => {
                            return <tr className='review' key={review.id}>
                                <td>{review.name}</td>
                                <td>{review.rating}/5</td>
                                <td>{review.reviewText}</td>
                                <td>{review.date}</td>
                                <td><button onClick={() => { this.onRemove(review.id) }}>X</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>

            </div>
            <button className="btn btn-back" onClick={this.onGoBack}>Back to shop</button>
        </section>
    }


}