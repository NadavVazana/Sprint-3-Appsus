import { NotePreview } from "./note-preview.jsx"


export function NoteList(props){

    const {onRemoveNote,notes,onPinNote,onCloneNote,onEditNote,onToggleTodo} = props
    return <section className="note-list full">
        {notes.map(note =><NotePreview
        key={note.id}
        note={note}
        onRemoveNote={onRemoveNote} 
        onPinNote={onPinNote}
        onCloneNote={onCloneNote}
        onEditNote={onEditNote}
        onToggleTodo={onToggleTodo}
        
        
        />)
}   
        
    </section>}
    