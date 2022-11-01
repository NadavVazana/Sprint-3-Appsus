import { mailService } from "../services/mail.service.js"
import { EmailList } from "../cmps/mail-list.jsx"
import { FilterSideBar } from '../cmps/filter-side-bar.jsx'
import { ComposeMessage } from '../cmps/compose-msg.jsx'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { UserMsg } from "../cmps/user-msg.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export class MailIndex extends React.Component {

    state = {
        emails: null,
        currentMailOpen: null,
        isComposeMode: false,
        filterBy: {
            status: 'inbox',
            txt: '',
            isRead: null,
            isStarred: null
        },
    }

    componentDidMount() {
        this.loadEmailList()
        if (this.props.match.params.noteId) {
            this.onComposeMessage()
        }
    }

    onDelete = (emailId) => {
        mailService.deleteEmail(emailId).then((res) => {
            let emailList = this.state.emails.filter(email => email.id !== emailId)
            this.setState({ emails: emailList })
        })
    }

    onToggleRead = (emailId) => {
        mailService.toggleReadState(emailId).then((res) => {
            this.loadEmailList()
        })
    }

    onStarEmail = (emailId) => {
        mailService.toggleStarredEmail(emailId).then(res => {
            this.loadEmailList()
        })
    }

    loadEmailList = () => {
        let { filterBy } = this.state
        mailService.getEmails(filterBy).then(res => this.setState({ emails: res }))
    }

    onComposeMessage = (email = null) => {
        this.setState({ isComposeMode: true })
    }

    closeComposeMessage = () => {
        this.setState({ isComposeMode: false })
    }

    sendMail = (draftId, emailInfo) => {
        mailService.sendEmail(draftId, emailInfo).then(newEmail => {
            this.loadEmailList()
        })
    }

    setFilterByStatus = (status) => {
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, status: status, isStarred: null } }), () => {
            this.loadEmailList()
        })
    }

    setIsStarred = () => {
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, isStarred: true } }), () => {
            this.loadEmailList()
        })
    }

    setFilter = (field, value) => {
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.loadEmailList()
        })
    }

    openMail = (email) => {
        this.setState({ currentMailOpen: email })
    }

    render() {
        let { emails, isComposeMode, currentMailOpen } = this.state
        let { onDelete,
            onToggleRead,
            onStarEmail,
            onComposeMessage,
            sendMail,
            closeComposeMessage,
            setFilterByStatus,
            setIsStarred,
            setFilter } = this

        return <section className="mail-index ">
            <FilterSideBar onComposeMessage={onComposeMessage} onSetFilter={setFilterByStatus} onSetStarred={setIsStarred} />


            <EmailList emails={emails}
                onDelete={onDelete}
                onToggleRead={onToggleRead}
                onStarEmail={onStarEmail}
                setFilter={setFilter}
                closeComposeMessage={closeComposeMessage}
                onComposeMessage={onComposeMessage}
                openMail={this.openMail}
            />
            {isComposeMode && <ComposeMessage
                sendMail={sendMail}
                closeComposeMessage={closeComposeMessage}
                showSuccessMsg={showSuccessMsg}
                createDraft={mailService.createDraft}
                updateDraft={mailService.updateDraft}
                currMailSelected={currentMailOpen}
            />}


            < UserMsg />
        </section>
    }
}
