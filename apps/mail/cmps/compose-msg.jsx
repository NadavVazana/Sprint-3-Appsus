import { noteService } from "../../note/services/note.service.js"
const { withRouter, Link } = ReactRouterDOM

class _ComposeMessage extends React.Component {

    state = {
        recepient: '',
        subject: '',
        messageBody: '',
        draftId: ''
    }

    saveDraftInterval

    componentDidMount() {
        let { currMailSelected } = this.props
        let { recepient, subject, messageBody, draftId } = this.state

        if (this.props.match.params.noteId) {
            noteService.getNoteById(this.props.match.params.noteId).then(note => {
                this.setState({ messageBody: note.info.txt })
            })
        }

        if (currMailSelected && currMailSelected.status === 'draft') {
            let { subject, body, to, id } = currMailSelected
            this.setState({ draftId: id, subject, messageBody: body, recepient: to })
        } else {
            this.props.createDraft({ recepient, subject, messageBody }).then(res => {
                this.setState({ draftId: res.id })
            })
        }


    }

    componentDidUpdate(prepProps, prevState) {
        clearTimeout(this.saveDraftInterval)
        let { recepient, subject, messageBody, draftId } = this.state
        this.saveDraftInterval = setTimeout(() => {
            this.props.updateDraft(this.state.draftId, { recepient, messageBody, subject })
            this.props.showSuccessMsg('Draft saved...')
            clearTimeout(this.saveDraftInterval)
        }, 5000)
    }

    componentWillUnmount() {
        clearTimeout(this.saveDraftInterval)
    }


    handleChange = ({ target }) => {
        let field = target.name
        let value = target.value
        this.setState({ [field]: value })
    }

    onSendMail = (ev) => {
        ev.preventDefault()
        let { recepient, subject, messageBody, draftId } = this.state
        let message = { recepient, subject, messageBody }
        this.props.sendMail(draftId, message)
        this.props.closeComposeMessage()
        this.props.showSuccessMsg('Email sent!')
    }


    render() {
        let { recepient, subject, messageBody } = this.state
        let { closeComposeMessage } = this.props
        let { handleChange } = this

        return <section className="compose-message">
            <div className="compose-header">
                <p>New Message</p>
                <span className="compose-buttons">
                    <Link to='/mail/inbox'><i className="fa-solid fa-xmark" onClick={closeComposeMessage}></i></Link>

                </span>
            </div>
            <form>
                <input type="email" required name="recepient" value={recepient} placeholder="To" onChange={handleChange} />
                <input type="text" required name="subject" value={subject} placeholder="Subject" onChange={handleChange} />
                <textarea name="messageBody" cols="30" rows="10" value={messageBody} placeholder="Your message here..." onChange={handleChange}></textarea>
                <button onClick={this.onSendMail}>Send</button>
            </form>
        </section>
    }
}

export const ComposeMessage = withRouter(_ComposeMessage)