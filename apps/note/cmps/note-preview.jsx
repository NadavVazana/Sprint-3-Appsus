import { utilService } from "../../../services/util.service.js"
import { EditNote } from "./edit-note.jsx"
import { noteService } from "../services/note.service.js"
const {withRouter,Link} = ReactRouterDOM
export class _NotePreview extends React.Component {

    state = {
        isPinned: false,
        editMode: false,

    }

    editFinished = (event, note, value) => {
        this.setState({ editMode: false })
        this.props.onEditNote(event, note, value)



    }






    GetNoteInfo = ({ note, onToggleTodo }) => {

        switch (note.type) {
            case 'text':
                return <TextNote note={note} />

            case 'image':
                return <ImageNote note={note} />

            case 'video':
                return <VideoNote note={note} />
            case 'todo':
                return <TodoNote handleBubbling={this.handleBubbling} onToggleTodo={onToggleTodo} note={note} />
        }
    }
    editNote = () => {
        this.setState({ editMode: true })

    }


    sendMail = (note) => {
        
    }

    render() {

        const { note, onRemoveNote, onPinNote, onCloneNote, onToggleTodo } = this.props
        const { editMode} = this.state
        const { GetNoteInfo} = this
        return <section  style={{ backgroundColor: note.style.backgroundColor }} className='note-preview flex column animate__animated animate__zoomIn'>


            { <div className="note-icons">

                <i name="note-icon" onClick={() => { onRemoveNote(note) }} className="fa-solid fa-trash-can"></i>
                <i name="note-icon" onClick={() => onPinNote(note)} className={`fa-solid fa-thumbtack ${note.isPinned ? 'pinned' : ''}`}></i>
                <i name="note-icon" onClick={() => onCloneNote(note)} className="fa-solid fa-clone"></i>
                <i name="note-icon" onClick={() => this.editNote(note)} className="fa-solid fa-pen-to-square"></i>
               <Link to={`/mail/${note.id}`}> <i onClick={() => this.sendMail(note)} className="fa-solid fa-envelope mail-logo"></i></Link>
            </div>}
            {editMode && <EditNote editFinished={this.editFinished} note={note} />}
            <GetNoteInfo onToggleTodo={onToggleTodo} note={note} />
        </section>

    }
}


function TextNote({ note }) {

    return <section className="text-note">
        <p>{note.info.txt}</p>
    </section>

}

function ImageNote({ note }) {
    return <section>
        <img src={note.info.txt} />
    </section>
}


function VideoNote({ note }) {
    const videoId = utilService.getId(note.info.txt)
    const videoLink = `https://www.youtube.com/embed/${videoId}`
    return <section>
        <iframe src={videoLink} ></iframe>
    </section>
}




function TodoNote({ note, onToggleTodo }) {
    const todos = note.todos
    return <ul>
        {todos.map(todo => {

            return <li  className="todo flex" key={utilService.makeId()}><label onClick={(event) => onToggleTodo(event,note, todo)} className={`todo flex ${todo.isDone ? 'complete' : ''}`} >{todo.text}<i className="fa-solid fa-check done"></i></label></li>
        })}
    </ul>
}

export const NotePreview = withRouter(_NotePreview) 

