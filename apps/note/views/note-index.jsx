
import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { noteService } from "../services/note.service.js"
import { PinnedNotes } from "../cmps/pinned-notes.jsx"
import { mailService } from "../../mail/services/mail.service.js"


export class NoteIndex extends React.Component {
    state = {
        notes: null,
        pinnedNotes: null,
        unfocus: true
    }
    // notes => this.setState({ notes: [...notes] })
    componentDidMount() {
        if (this.props.match.params.mailId) {
            mailService.getEmailById(this.props.match.params.mailId)
                .then(mail => noteService.addNote(mail.body)
                    .then(this.loadNotes()))
            this.props.history.push('/note')
        }
        else {
            noteService.addDemoData()
                .then(this.loadNotes())
        }
    }




    loadNotes = () => {
        noteService.query()
            .then(({ notes, pinnedNotes }) => {
                this.setState({ pinnedNotes: [...pinnedNotes], notes: [...notes] })
            })

    }

    onPinNote = (note) => {
        noteService.pinNote(note)
            .then(({ notes, pinnedNotes }) => {
                this.setState({ notes: [...notes], pinnedNotes: [...pinnedNotes] })
            })
    }

    onCloneNote = (note) => {
        noteService.cloneNote(note)
            .then(notes => this.setState({ notes: [...notes] }))
    }

    addNotes = (notes) => {
        this.setState({ notes })
    }

    onRemoveNote = (note) => {
        noteService.removeNote(note)
            .then(({ notes, pins }) => this.setState({ notes: [...notes], pinnedNotes: [...pins] }))


    }
    sendMail = (note) => {
    }
    onEditNote = (ev, note, value) => {
        ev.preventDefault()
        noteService.editNote(note, value)
            .then(({ notes, pins }) => {
                this.setState({ notes: [...notes], pinnedNotes: [...pins] })
            })


    }

    onToggleTodo = (event, note, todo) => {
        event.stopPropagation()
        noteService.toggleTodo(note, todo)
            .then(({ notes, pins }) => this.setState({ notes: [...notes], pinnedNotes: [...pins] }))


    }
    bodyClicked = ({ target }) => {
        const parentClass = target.parentElement.getAttribute('class')
        const parentName = target.parentElement.getAttribute('name')
        console.log(target.getAttribute('name'));
        const name = target.getAttribute('name')
        if (name !== 'input' && name !== 'settings' && parentName !== 'icon-container' && !parentClass.includes('color-picker') && target.getAttribute('name') !== 'note-icon') {
            if (parentClass.includes('todo')) {
                return

            }

            this.setState({ unfocus: true })

        }

        else {
            this.setState({ unfocus: false })
        }
    }

    render() {
        const { notes, unfocus, pinnedNotes } = this.state
        if (!notes && !pinnedNotes) return <span></span>
        return <section onMouseDown={this.bodyClicked} className="note-index main-layout full flex column">

            <NoteAdd unfocus={unfocus} addNotes={this.addNotes} />
            {pinnedNotes.length && <PinnedNotes sendMail={this.sendMail} onToggleTodo={this.onToggleTodo} onEditNote={this.onEditNote} onCloneNote={this.onCloneNote} onPinNote={this.onPinNote} onRemoveNote={this.onRemoveNote} pinnedNotes={pinnedNotes} />}

            <NoteList sendMail={this.sendMail} onToggleTodo={this.onToggleTodo} onEditNote={this.onEditNote} onCloneNote={this.onCloneNote} onPinNote={this.onPinNote} onRemoveNote={this.onRemoveNote} pinnedNotes={pinnedNotes} notes={notes} />

        </section>



    }
}
