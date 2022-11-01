const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {

    return <header className="container">
        <div className="app-header">
            <div className="logo">Miss Book</div>

            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/books">Our Books</NavLink>
            </nav>
        </div>
    </header>
}

export const AppHeader = withRouter(_AppHeader)