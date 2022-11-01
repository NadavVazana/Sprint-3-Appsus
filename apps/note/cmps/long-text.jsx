

export class LongText extends React.Component {
    state = {
        more: null,
        text: ''
    }
    componentDidMount() {
        
        this.getText()
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.text !== prevProps.text && prevProps.text !== ''){
            this.getText()
        }
    }
    getText() {
        let text = this.props.text
        
        if (text.length < 15) {
            this.setState({ more: null, text})
        }
        else {
            this.setState({ more: text.substring(16),text: `${text.substring(0, 16)}...`})

            

        }
    }

    onReadMore = () => {
        this.setState({ more: null, text: this.props.text })
    }


    render() {
        const { more } = this.state
        return <section className="long-text flex column align-center">
            <p>{this.state.text}</p>
            {more &&  <button onClick={this.onReadMore}>Read more...</button>}
        </section>

    }
}