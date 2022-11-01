
import { mailService } from '../../mail/services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    addNote,
    removeNote,
    pinNote,
    cloneNote,
    editNote,
    toggleTodo,
    sendNoteAsMail,
    getNoteById,
    addDemoData
}

const KEY = 'notesDB'

function query() {
    let pinnedNotes = _loadNotesFromStorage('pinnedDB')
    let notes = _loadNotesFromStorage(KEY)
    if (!notes) {
        notes = []
        _saveNotesToStorage(KEY, notes)
    }
    if (!pinnedNotes) {
        pinnedNotes = []
        _saveNotesToStorage('pinnedDB', pinnedNotes)
    }

    return Promise.resolve({ notes, pinnedNotes })
}
function getNoteById(id) {
    const notes = _loadNotesFromStorage(KEY)
    const pins = _loadNotesFromStorage('pinnedDB')
    const noteToCompose = notes.find(note => note.id === id)
    if (!noteToCompose) {
        const pin = pins.find(pin => pin.id === id)
        return Promise.resolve(pin)
    }
    else
        return Promise.resolve(noteToCompose)
}
function addNote(input, type = 'text', backgroundColor = '#DFDADA') {
    const note = _createNote(input, type, backgroundColor)
    const notes = _loadNotesFromStorage(KEY)
    notes.unshift(note)
    _saveNotesToStorage(KEY, notes)
    return Promise.resolve(notes)
}

function addDemoData() {
    let pins = _loadNotesFromStorage('pinnedDB')
    let demoNotes = _loadNotesFromStorage(KEY)

    if (!pins) {
        pins = [
            _createNote('I am pinned help me!', 'text', '#ffa500', [], true),
            _createNote('Sleep,Eat,React', 'todo', '#ffc0cb', [], true)
        ]
        _saveNotesToStorage('pinnedDB', pins)
    }
    if (!demoNotes) {
        demoNotes = [
            _createNote('This sprint is even better than my last breakup!', 'text', '#ffc0cb'),
            _createNote('React is the Powerrrr!!!', 'text', '#c81c1c'),
            _createNote('https://www.youtube.com/watch?v=VvU27gvAK40&ab_channel=%D7%A7%D7%95%D7%93%D7%99%D7%A0%D7%92%D7%90%D7%A7%D7%93%D7%9E%D7%99-CodingAcademy', 'video', '#008000'),
            _createNote('https://scontent.ftlv5-1.fna.fbcdn.net/v/t39.30808-6/278729307_5803246186358540_5487545274432165146_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_ohc=1q9zczkdlbwAX_K-sHv&_nc_ht=scontent.ftlv5-1.fna&oh=00_AT9bn3mahVcca47gnfcg7Lwm3NTtoNGFXcE9h0fPYRGCNg&oe=630D245C', 'image', '#2323c9'),
            _createNote('Finish sprint 3,Get ready for sprint 4,Learn Node js', 'todo', '#ffd700'),
            _createNote('https://i.pinimg.com/originals/81/d2/bf/81d2bffd2d12c8275ab2c708b3fd5297.gif', 'image', '#ffc0cb'),
            _createNote('https://pbs.twimg.com/media/FMReQUfWUAEWDIZ.jpg:large', 'image', '#800080'),
            _createNote('https://c.tenor.com/GfSX-u7VGM4AAAAC/coding.gif', 'image', '#a52a2a'),
            _createNote('https://www.youtube.com/watch?v=3sMflOp5kiQ&ab_channel=GoogleChromeDevelopers', 'video', '#d7d72e'),
        ]
        _saveNotesToStorage(KEY, demoNotes)
    }
    return Promise.resolve()
}

function pinNote(noteToPin) {
    let pinnedNotes = _loadNotesFromStorage('pinnedDB')
    const notes = _loadNotesFromStorage(KEY)
    if (!noteToPin.isPinned) {
        const noteIdx = notes.findIndex(note => note.id === noteToPin.id)
        const pinnedNote = notes.splice(noteIdx, 1)[0]

        pinnedNote.isPinned = true
        pinnedNotes.unshift(pinnedNote)


    }
    else {
        const pinIdx = pinnedNotes.findIndex(pin => pin.id === noteToPin.id)
        pinnedNotes[pinIdx].isPinned = false
        notes.push(pinnedNotes.splice(pinIdx, 1)[0])


    }


    _saveNotesToStorage('pinnedDB', pinnedNotes)
    _saveNotesToStorage(KEY, notes)
    return Promise.resolve({ notes, pinnedNotes })

}

function editNote(noteEdit, value) {
    const notes = _loadNotesFromStorage(KEY)
    const pins = _loadNotesFromStorage('pinnedDB')
    if (noteEdit.isPinned) {
        const pinIdx = pins.findIndex(pin => pin.id === noteEdit.id)
        if (noteEdit.type === 'todo') {
            pins[pinIdx].todos = _createTodos(value.split(','))
            pins[pinIdx].info.txt = value
        }
        else {
            pins[pinIdx].info.txt = value
        }
        _saveNotesToStorage('pinnedDB', pins)
    }
    else {
        const noteIdx = notes.findIndex(note => note.id === noteEdit.id)
        if (noteEdit.type === 'todo') {
            notes[noteIdx].todos = _createTodos(value.split(','))
            notes[noteIdx].info.txt = value
        }
        else {
            notes[noteIdx].info.txt = value
        }
        _saveNotesToStorage(KEY, notes)
    }
    return Promise.resolve({ notes, pins })
}

function cloneNote(note) {
    const newNote = _createNote(note.info.txt, note.type, note.style.backgroundColor, note.todos)
    const notes = _loadNotesFromStorage(KEY)
    notes.unshift(newNote)
    _saveNotesToStorage(KEY, notes)
    return Promise.resolve(notes)
}
function removeNote(noteToRemove) {
    const notes = _loadNotesFromStorage(KEY)
    const pins = _loadNotesFromStorage('pinnedDB')
    if (noteToRemove.isPinned) {
        const pinIdx = pins.findIndex(pin => pin.id === noteToRemove.id)
        pins.splice(pinIdx, 1)
        _saveNotesToStorage('pinnedDB', pins)

    }
    else {
        const noteIdx = notes.findIndex(note => note.id === noteToRemove.id)
        notes.splice(noteIdx, 1)
        _saveNotesToStorage(KEY, notes)
    }
    return Promise.resolve({ notes, pins })

}

function sendNoteAsMail({ info }) {



    return Promise.resolve()

}



function _createTodos(todos) {
    return todos.map(todo => {
        return {
            isDone: false,
            text: todo,
            id: utilService.makeId()
        }
    })


}

function toggleTodo(oldNote, todoToMark) {
    const notes = _loadNotesFromStorage(KEY)
    const pins = _loadNotesFromStorage('pinnedDB')
    let todos = oldNote.todos
    const todoIdx = todos.findIndex(todo => todo.id === todoToMark.id)
    todos[todoIdx].isDone = todos[todoIdx].isDone ? false : true
    if (oldNote.isPinned) {

        const pinIdx = pins.findIndex(pin => pin.id === oldNote.id)
        pins[pinIdx].todos = todos
        _saveNotesToStorage('pinnedDB', pins)
    }
    else {

        const noteIdx = notes.findIndex(note => note.id === oldNote.id)
        notes[noteIdx].todos = todos
        _saveNotesToStorage(KEY, notes)
    }

    return Promise.resolve({ notes, pins })

}

function _createNote(txt, type, backgroundColor, todos = [], isPinned = false) {
    if (type === 'todo' && !todos.length) {
        todos = _createTodos(txt.split(','))

    }

    return {
        id: utilService.makeId(),
        type,
        isPinned,
        info: {
            txt
        },
        todos,
        style: {
            backgroundColor
        }

    }
}




function _saveNotesToStorage(key, value) {
    storageService.saveToStorage(key, value)
}

function _loadNotesFromStorage(key) {
    return storageService.loadFromStorage(key)
}

