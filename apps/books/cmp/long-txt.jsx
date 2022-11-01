export function LongTxt({ txt, isLongTxtShown }) {
    let lenOfTxt = txt.length < 100 ? txt.length : 100
    let text = isLongTxtShown ? txt : txt.slice(0, lenOfTxt) + '...'

    return <p>{text}</p>
}