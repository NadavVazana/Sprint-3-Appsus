import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { BookApp } from "./apps/books/pages/book-app.jsx"
import { BookDetails } from "./apps/books/pages/book-details.jsx"
import { AddBook } from "./apps/books/pages/add-book.jsx"


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Switch>
                <Route path="/mail/inbox" component={MailIndex} />
                <Route path="/mail/:noteId" component={MailIndex} />
                <Route path="/note/:mailId" component={NoteIndex} />
                <Route path="/books/add" component={AddBook} />
                <Route path="/books/:bookId" component={BookDetails} />
                <Route path="/books" component={BookApp} />
                <Route path="/note" component={NoteIndex} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
