import { LongTextDisplay } from '../cmps/long-text-display.jsx'
import { eventBusService } from '../../../services/event-bus.service.js';
export class MailPreview extends React.Component {

    convertToDate = (timestamp) => {
        var date = new Date(timestamp)
        const formtter = new Intl.DateTimeFormat('en-us', { day: 'numeric', month: 'short' });
        let formattedDate = formtter.format(date)
        return formattedDate
    }
    componentDidUpdate() {
        eventBusService.emit('updateUnread', '')
    }

    convertMailToName = (emailAddress) => {
        if (emailAddress) {
            let name = emailAddress.split('@')[0]
            name = name.charAt(0).toUpperCase() + name.slice(1)
            return name
        }
    }

    render() {
        let { email, onOpenMail, onDelete, onToggleRead, onStarEmail } = this.props
        let { convertToDate } = this
        let className = email.isRead ? 'read' : ''
        let envelopeType = email.isRead ? 'fa-envelope' : 'fa-envelope-open'
        let isEmailStarred = email.isStarred ? 'starred' : ''


        return <div className={`mail-preview ${className}`} key={email.id}>
            <span className="star">
                <i className={`fa-solid fa-star ${isEmailStarred}`} onClick={() => onStarEmail(email.id)}></i>
            </span>
            <span className="preview-mid-section" onClick={() => {
                onOpenMail(email.id)
            }
            }>
                <span className="from">{this.convertMailToName(email.from)}</span>
                <span className="text-container">
                    <span className="text subject">{email.subject}</span>
                    <span className="text body"> {email.body} </span>
                </span>
            </span>

            <div className="buttons-date">
                <span className="date">{convertToDate(email.sentAt)}</span>
                <span className="buttons">
                    <i className={`fa-solid ${envelopeType}`} onClick={() => onToggleRead(email.id)}></i>
                    <i className="fa-solid fa-trash" onClick={() => onDelete(email.id)}></i>
                </span>
            </div>
        </div>


    }
}