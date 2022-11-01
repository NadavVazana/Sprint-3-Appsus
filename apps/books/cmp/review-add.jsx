import { bookService } from '../services/book.service.js'

export class ReviewAdd extends React.Component {
    state = {
        review: {
            name: 'Book Bookerson',
            rating: '3',
            date: '',
            reviewText: '',
        }
    }

    handleChange = ({ target }) => {
        let field = target.name
        let value = target.value
        this.setState((prevState) => ({
            review: { ...prevState.review, [field]: value }
        }), () => { })
    }

    onAddReview = (ev) => {
        ev.preventDefault()
        let { bookId } = this.props
        let { review } = this.state
        bookService.addReview(bookId, review).then(this.setState({
            review: { name: '', rating: '3', date: '', reviewText: '' }
        }, this.props.loadBook()))
    }


    render() {
        let { name, rating, date, reviewText } = this.state.review
        return <section className="review-add">
            <form>
                <div className="form-control">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Your name" value={name} onChange={this.handleChange} />
                </div>

                <div className="form-control">
                    <label htmlFor="date">Read at:</label>
                    <input type="date" id="date" value={date} name="date" onChange={this.handleChange} />
                </div>

                <div className="form-control">
                    <label htmlFor="review">Review:</label>
                    <textarea name="reviewText" id="review" cols="100" rows="5" value={reviewText} onChange={this.handleChange}></textarea>
                </div>

                <div className="form-control">
                    <label className="rating-label">Rating</label>
                    <input
                        max="5"
                        step="0.5"
                        type="range"
                        name="rating"
                        value={rating}
                        onChange={this.handleChange} />
                    <span>{rating}</span>
                </div>
                <button onClick={this.onAddReview}>Submit Review</button>
            </form>
        </section>
    }
}