import {  noteService } from "../services/note.service.js"
import { AddNoteSettings } from "./add-note-settings.jsx"
export class NoteAdd extends React.Component{
    state={
        input:'',
        type:'text',
        placeholder:{
            text:'What\'s in your mind?',
            video:'Enter a url for a youtube video:',
            image:'Enter a url for an image:',
            todo:'Enter some todos (make sure to seperate them with ,):'
        },
        backgroundColor:'#DFDADA',
    }

    inputRef = React.createRef()



    handleChange = ({target}) =>{
        this.inputRef.current.focus()
            const change = target.name || target.getAttribute("name")
            //2 way data binding : on input 
            if(change === 'input'){
                const value = target.value
                this.setState({input:value})
            }
            else{
                this.setState({type:change,input:''})
                this.inputRef.current.focus()
            }
    
        }

   

    

    onAddNote = (ev)=>{
        ev.preventDefault()
        const {input,type,backgroundColor} = this.state
        noteService.addNote(input,type,backgroundColor)
        
        .then(notes=> {
            this.props.addNotes(notes)
            this.setState({input:''})})


    }

    onPickColor = (backgroundColor) =>{
        this.setState({backgroundColor})
    }



    render(){
        const {input,placeholder,backgroundColor} = this.state
        const {unfocus} = this.props
        const {handleChange,onPickColor} = this
        return<React.Fragment> <section className="note-add">
            <label >
            <form onSubmit={this.onAddNote} className=" flex">
            <div className="input-txt">
            <input autoComplete="off"  ref={this.inputRef} value={input} name="input" onChange={this.handleChange} type="text" placeholder={placeholder[this.state.type]} /></div>

            </form>
            { !unfocus && <AddNoteSettings backgroundColor={backgroundColor} onPickColor={onPickColor}   handleChange={handleChange} />}</label>
        </section>

            </React.Fragment>
    }
}