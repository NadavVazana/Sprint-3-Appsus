import { MailPreview } from "./mail-preview.jsx"
import { FullEmailPreview } from "./full-email-preview.jsx"

export class EmailItem extends React.Component {

    state = {
        isOpen: false
    }

    componentDidUpdate(prevProps, prevState) {
        let { email, currSelected } = this.props
        if (email.id === currSelected
            && prevState.isOpen === this.state.isOpen
            && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.setState({ isOpen: !this.state.isOpen })
        } else if (email.id !== currSelected && prevState.isOpen) {
            this.setState({ isOpen: false })
        }
    }

    render() {
        let { email, onOpenMail, onDelete, onToggleRead, onStarEmail } = this.props
        let { isOpen } = this.state

        return <section>
            <MailPreview email={email}
                onOpenMail={onOpenMail}
                onDelete={onDelete}
                onToggleRead={onToggleRead}
                onStarEmail={onStarEmail}
            />
            {isOpen && <FullEmailPreview email={email}
                onDelete={onDelete}
                onToggleRead={onToggleRead} />}
        </section>
    }
}