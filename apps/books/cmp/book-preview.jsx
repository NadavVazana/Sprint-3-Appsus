const { Link } = ReactRouterDOM

export function BookPreview({ book }) {

    function getCurrencyIcon(currency) {
        switch (currency) {
            case 'ILS':
                return '₪'
            case 'USD':
                return '$'
            case 'EUR':
                return '€'
        }
    }

    return <article className="book-preview">
        <img src={book.thumbnail} />
        <h3>{book.title}</h3>
        <p>{book.listPrice.amount}
            <span>{getCurrencyIcon(book.listPrice.currencyCode)}</span>
        </p>
        <Link to={"/books/" + book.id}>
            <button className="btn btn-details">Details</button>
        </Link>

    </article>
}