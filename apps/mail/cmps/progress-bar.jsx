export function ProgressBar({ unread, total }) {

    let progress = ((unread / total) * 100)
    return <div className="progress-container">
        <span>{unread} of {total} mails unread ({progress.toFixed(1)}%)</span>
        <div className="progress-bar">
            <div className="progression" style={{ width: `${progress}%` }}></div>
        </div>
    </div>
}