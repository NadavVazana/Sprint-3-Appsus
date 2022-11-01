export function ColorPicker({onPickColor}){


    return <section className="color-picker flex  animate__animated animate__flipInX">
        <div onClick={()=>{onPickColor('#c81c1c')}} className="red"></div>
        <div onClick={()=>{onPickColor('#008000')}} className="green"></div>
        <div onClick={()=>{onPickColor('#2323c9')}} className="blue"></div>
        <div onClick={()=>{onPickColor('#ffd700')}} className="gold"></div>
        <div onClick={()=>{onPickColor('#c0c0c0')}} className="silver"></div>
        <div onClick={()=>{onPickColor('#800080')}} className="purple"></div>
        <div onClick={()=>{onPickColor('#a52a2a')}} className="brown"></div>
        <div onClick={()=>{onPickColor('#d7d72e')}} className="yellow"></div>
        <div onClick={()=>{onPickColor('#ffa500')}} className="orange"></div>
        <div onClick={()=>{onPickColor('#808080')}} className="grey"></div>
        <div onClick={()=>{onPickColor('#ffc0cb')}} className="pink"></div>
    </section>
}