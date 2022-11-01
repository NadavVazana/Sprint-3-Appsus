import { EmailItem } from "./email-item.jsx"
import { mailService } from "../services/mail.service.js"
import { SearchFilterBar } from "../cmps/search-filter-bar.jsx"


export class EmailList extends React.Component {

    state = {
        currSelected: null
    }

    onOpenMail = (emailId) => {
        mailService.getEmailById(emailId).then(res => {
            if (res.status === 'draft') {
                this.props.onComposeMessage()
            } else {
                this.setState({ currSelected: null }, () => {
                    this.setState({ currSelected: emailId })
                    mailService.setReadState(emailId)
                })
            }
            this.props.openMail(res)
        })

    }


    render() {
        let { currSelected } = this.state
        let { emails, onDelete, onToggleRead, onStarEmail, setFilter } = this.props
        let { onOpenMail } = this
        if (!emails) return <span>Loading...</span>

        let unreadEmails = emails.filter(email => !email.isRead).length


        return <section className="email-list">
            <SearchFilterBar setFilter={setFilter} unread={unreadEmails} total={emails.length} />

            {emails.map(email => {
                return <EmailItem email={email}
                    key={email.id}
                    onOpenMail={onOpenMail}
                    currSelected={currSelected}
                    onDelete={onDelete}
                    onToggleRead={onToggleRead}
                    onStarEmail={onStarEmail}
                />
            })}
        </section>
    }

}