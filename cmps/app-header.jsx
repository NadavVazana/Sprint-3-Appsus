const { Link, NavLink, withRouter } = ReactRouterDOM

import { mailService } from "../apps/mail/services/mail.service.js"
import { eventBusService } from "../services/event-bus.service.js"
export class AppHeader extends React.Component {
    state = {
        isSquareMenu: false,
        unreadMails: 0
    }

    componentDidMount() {

        this.setState({ unreadMails: mailService.getUnreadCount() })
    }
    openMenu = () => {
        this.setState({ isSquareMenu: !this.state.isSquareMenu })
    }

    renderUnread = () => {
        eventBusService.on('updateUnread', () => {
            this.setState({ unreadMails: mailService.getUnreadCount() })
        })
    };


    render() {
        this.renderUnread()
        const { isSquareMenu, unreadMails } = this.state
        const { openMenu } = this
        return <header className="app-header">
            <Link to="/">
                <h3 className="logo">Appsus <img className="logo-icon" src="./assets/img/icons/horse.svg" /></h3>
            </Link>
            <img onClick={openMenu} className="square-menu" src="./assets/img/icons/square-menu.svg" alt="" />
            <nav className={isSquareMenu ? `menu-open animate__animated animate__fadeIn animate__faster ` : 'menu-close'}>
                <NavLink exact to="/">{isSquareMenu ? <img className="home-icon" src="./assets/img/icons/home.svg" /> : 'Home'}</NavLink>
                <NavLink to="/mail/inbox">{isSquareMenu ? <img className="mail-icon" src="./assets/img/icons/mail.svg" /> : 'Mail'} <span className="header-mail-count"> {unreadMails}</span></NavLink>
                <NavLink to="/note">{isSquareMenu ? <img className="note-icon" src="./assets/img/icons/note.svg" /> : 'Notes'}</NavLink>
                <NavLink to="/books">{isSquareMenu ? <img className="book-icon" src="./assets/img/icons/book.svg" /> : 'Books'}</NavLink>
                <NavLink to="/about">{isSquareMenu ? <img className="about-icon" src="./assets/img/icons/about.svg" /> : 'About'}</NavLink>
            </nav>
        </header>
    }
}
