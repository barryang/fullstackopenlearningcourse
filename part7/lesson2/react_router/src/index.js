import { useState } from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Routes, Route, Link, useNavigate, Navigate, useMatch
} from "react-router-dom"



const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Notes = ({ notes }) => {
    return (
        <div>
        <h2>Notes</h2>
        <ul>
        {notes.map(note =>
            <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </li>
        )}
        </ul>
    </div>
    )
}
    
const Note = ({ note }) => {
    return (
      <div>
        <h2>{note.content}</h2>
        <div>{note.user}</div>
        <div><strong>{note.important ? 'important' : ''}</strong></div>
      </div>
    )
}

const Login = (props) => {
    const navigate = useNavigate()
  
    const onSubmit = (event) => {
      event.preventDefault()
      props.onLogin('mluukkai')
      navigate('/')
    }
  
    return (
      <div>
        <h2>login</h2>
        <form onSubmit={onSubmit}>
          <div>
            username: <input />
          </div>
          <div>
            password: <input type='password' />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
}

const Users = () => (
  <div> <h2>Users</h2> </div>
)

const App = () => {
  const [notes, setNotes] = useState([
    { 
        id: 1,
        content: "asdkljfkldsjfk",
        user: 'maomao',
        important: true
    },
    { 
        id: 2,
        content: "hello",
        user: 'mini',
        important: false,
    },
    {
        id: 3,
        content: "three",
        user: 'barry',
        important: false,
    },
  ])

  const [user, setUser] = useState(null)

  const login = (user) => {
      setUser(user)
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <div> 
        <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/notes">notes</Link>
            <Link style={padding} to="/users">users</Link>
            {user
                ? <em>{user} logged in</em>
                : <Link style={padding} to="/login">login</Link>
            }
        </div>
        <Routes>
            <Route path='/notes/:id' element={<Note note={note} />} />
            <Route path='/notes' element={<Notes notes={notes} />} />
            <Route path='/users' element={user ? <Users /> : <Navigate replace to="/login" />} />
            <Route path='/login' element={<Login onLogin={login} />} />
            <Route path='/' element={<Home />} />
        </Routes>
        <div>
            <i>Note app, Department of Computer Science 2022</i>
        </div>
    </div>
    
  )
}

ReactDOM.render(
    <Router>
      <App />
    </Router>, 
    document.getElementById('root')
)