export class BookFilter extends React.Component {
    state = {
        filterBy: {
            title: '',
            maxPrice: 250
        }
    }

    handleChange = ({ target }) => {
        let field = target.name
        const value = target.type === 'range' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        let { title, maxPrice } = this.state.filterBy
        return <section className="book-filter">
            <div className="form-control">
                <label htmlFor="by-title">Book Title: </label>
                <input type="text"
                    id="by-title"
                    name="title"
                    value={title}
                    onChange={this.handleChange} />
            </div>

            <div className="form-control">
                <label htmlFor="by-max-price">Max Price</label>
                <input type="range"
                    min="1"
                    max="250"
                    value={maxPrice}
                    id="by-max-price"
                    name="maxPrice"
                    onChange={this.handleChange} />
                <span>{maxPrice}</span>
            </div>

        </section>
    }
}