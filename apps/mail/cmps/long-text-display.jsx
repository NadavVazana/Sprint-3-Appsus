export function LongTextDisplay({ text }) {

    if (text.length > 100) {
        text = text.slice(0, 100) + '...'
    }

    return <span className="text body"> {text} </span>
}