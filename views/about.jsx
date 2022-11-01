
export class About extends React.Component {

 state={
    borisAnimation: false,
    nadavAnimation: false
 }
 componentDidUpdate(prevProps,prevState){
    if(prevState.borisAnimation || prevState.nadavAnimation)
    this.setState({borisAnimation:false,nadavAnimation:false})
 }
 handleClick = (ev) =>{
    if(ev.target.alt ==='nadav')
        this.setState({nadavAnimation : true})
    
    else
        this.setState({borisAnimation : true})
    
 }


    render(){
        const {nadavAnimation,borisAnimation} = this.state
    return <section className="about flex column main-layout full">
        <h1 className="about-title">Who are we?</h1>
        <div className="crew grid">
            <div className="boris flex column">
                <h1>Boris Rejkov</h1>
                <h2>"Come and see the future of programming"</h2>
                <img className={borisAnimation ? 'animate__animated animate__animated animate__heartBeat' : ''} onClick={this.handleClick}  src="./assets/img/icons/boris.svg" alt="boris" />
                <a target="_blank" href="https://github.com/BorisRy"><img src="./assets/img/icons/git.svg" alt="" /></a>
            </div>
            <div className="nadav flex column">
                <h1>Nadav Vazana</h1>
                <h2>"This is the power of React!"</h2>
                <img className={nadavAnimation ? 'animate__animated animate__heartBeat': ''} onClick={this.handleClick} src="./assets/img/icons/nadav.svg" alt="nadav" />
                <a  target="_blank" href="https://github.com/NadavVazana"><img src="./assets/img/icons/git.svg" alt="" /></a>
            </div>
        </div>
    </section>
}}
