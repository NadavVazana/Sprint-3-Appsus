import { ProgressBar } from "./progress-bar.jsx"

export class SearchFilterBar extends React.Component {

    state = {
        txt: '',
        isRead: null
    }

    handleChange = ({ target }) => {
        let { setFilter } = this.props
        let value
        let field = target.name
        if (field === 'isRead') {
            if (target.value === 'read') value = true
            else if (target.value === 'unread') value = false
            else value = null
        } else if (field === 'txt') {
            value = target.value
        }

        setFilter(field, value)
    }

    render() {
        let { unread, total } = this.props
        let { txt } = this.state
        let { handleChange } = this
        return <section className="search-bar">
            <div className="search-input">
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
                <input type="text" name="txt" placeholder="Search mail" onChange={handleChange} />
                <select name="isRead" onChange={handleChange}>
                    <option value="">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </div>

            <ProgressBar unread={unread} total={total} />
            {/* <span className="right email-count">Unread: {unread}</span> */}
        </section>
    }
}