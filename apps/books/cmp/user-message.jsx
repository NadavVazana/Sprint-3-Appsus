const { Link } = ReactRouterDOM
export class UserMsg extends React.Component {

    state = {
        isEntrance: true
    }

    componentDidMount() {
        this.setState({ isEntrance: true })
    }

    closeModal = () => {
        this.props.closeMsg()
        this.setState({ isEntrance: false })
    }

    render() {
        let { bookId } = this.props
        let { isEntrance } = this.state
        let animationClass = isEntrance ? "animate__fadeInRight" : "animate__fadeOutRight"
        return <div className={`user-msg animate__animated ${animationClass}`}>
            <span>Success!</span>
            <Link to={`/books/${bookId}`}>Go to book page</Link>
            <button onClick={this.closeModal}>x</button>
        </div>
    }

}