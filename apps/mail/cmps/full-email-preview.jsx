const { Link } = ReactRouterDOM

export function FullEmailPreview({ email, onDelete }) {

    return <section className="full-email-preview">
        <div className="email-header">
            <h3>{email.subject}</h3>
        </div>
        <div className="actions-container">
            <p>From: &lt;{email.from}&gt;</p>
            <div className="buttons">
                <Link to={`/note/${email.id}`}>
                    <i className="fa-solid fa-share"></i>
                </Link>
                <i className="fa-solid fa-trash" onClick={() => onDelete(email.id)}></i>
            </div>

        </div>
        <p className="body">{email.body}</p>
    </section>
}