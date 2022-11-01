import { ColorPicker } from "./color-picker.jsx";

export class AddNoteSettings extends React.Component {
    state = {
        paletteOpen:false
    }

    colorPicker = ()=>{
        if(this.state.paletteOpen){
            this.setState({paletteOpen : false})
        }
        else
        this.setState({paletteOpen: true})
    }
    render() {
        const { handleChange,onPickColor,backgroundColor} = this.props
        const {paletteOpen} = this.state
        const {colorPicker} = this
        return <section name="settings" className="add-settings">

            <div name="icon-container" className="input-icons flex">

                <i onClick={handleChange} name="text" className="fa-solid fa-a"></i>
                <i onClick={handleChange} name="image" className="fa-solid fa-image"></i>
                <i onClick={handleChange} name="video" className="fa-brands fa-youtube"></i>
                <i onClick={handleChange} name="todo" className="fa-solid fa-list"></i>
                <i style={{color : backgroundColor}} onClick={colorPicker} className="fa-solid fa-palette"></i>
            </div>
                {paletteOpen &&<ColorPicker onPickColor={onPickColor} />}
        </section>
    }
}