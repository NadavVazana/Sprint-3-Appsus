const { Link, NavLink, withRouter } = ReactRouterDOM
import { eventBusService } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"
export class FilterSideBar extends React.Component {
    state={
        unreadMails : null
    }

    componentDidMount(){
        this.setState({unreadMails: mailService.getUnreadCount()})
    }

    renderUnread = () =>{
        eventBusService.on('updateUnread',()=>{
            this.setState({unreadMails:mailService.getUnreadCount()})
        })
    };

    render(){
        this.renderUnread()
        const {onComposeMessage, onSetFilter, onSetStarred} = this.props
        const {unreadMails} = this.state
    return <section className="filter-side-bar" >
        <button className="btn compose-btn" onClick={onComposeMessage}>
            <i className="fa-solid fa-pen"></i>
            <span> Compose </span>
        </button>
        <NavLink to="/mail/inbox" activeClassName="active-tab" className="btn inbox" onClick={() => onSetFilter('inbox')}>
            <i className="fa-solid fa-inbox"><span className="unread-inbox">{unreadMails}</span> </i>
          <div className="inbox"> <span className="inbox-word"> Inbox  </span></div>
        </NavLink>
        <NavLink to="/mail/starred" activeClassName="active-tab" className="btn starred-filter" onClick={onSetStarred}>
            <i className="fa-solid fa-star"></i>
           <span> Starred </span>
        </NavLink>
        <NavLink to="/mail/sent" activeClassName="active-tab" className="btn sent" onClick={() => onSetFilter('sent')}>
            <i className="fa-solid fa-paper-plane"></i>
           <span> Sent </span>
        </NavLink>
        <NavLink to="/mail/draft" activeClassName="active-tab" className="btn draft" onClick={() => onSetFilter('draft')}>
            <i className="fa-solid fa-file-lines"></i>
          <span>  Drafts </span>
        </NavLink>
        <NavLink to="/mail/trash" activeClassName="active-tab" className="btn trash" onClick={() => onSetFilter('trash')}>
            <i className="fa-solid fa-trash-can"></i>
           <span> Trash </span>
        </NavLink>
    </section>
}}