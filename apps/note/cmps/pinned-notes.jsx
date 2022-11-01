import { NotePreview } from "./note-preview.jsx"
export function PinnedNotes(props){

    const {onPinNote,onCloneNote,onEditNote,onToggleTodo,pinnedNotes,onRemoveNote} = props
    return <section className=" full" > <div className="pinned-notes" >
    { pinnedNotes.map(note=><NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} 
    onPinNote={onPinNote}
    onCloneNote={onCloneNote}
    onEditNote={onEditNote}
    onToggleTodo={onToggleTodo}
    />)}</div>
    <hr />
</section>
}