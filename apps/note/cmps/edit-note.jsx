export class  EditNote extends React.Component{
        state = {
            value:''
        }

        handleChange = ({target}) =>{
            this.setState({value:target.value})
        }
    render()
    {
        const{editFinished,note} = this.props
    return <section>
        <form onSubmit={(event)=>editFinished(event,note,this.state.value)}>
        <input onChange={this.handleChange} placeholder="Write your edit here:" className="animate__animated animate__fadeInUp edit-input" type="text " />
        </form>
    </section>
}}