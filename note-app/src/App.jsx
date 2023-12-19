import Note from './components/Note';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';
import { useState, useEffect, useRef } from "react";
import noteService from "./services/notes";
import loginService from "./services/login"
import React from 'react'



const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchData() {
      console.log('effect');
      const initialNotes = await noteService.getAll();
      console.log('promise fulffiled');
      setNotes(initialNotes);
    }

    fetchData().catch(console.error);
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
      </div>
    )
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important)

  // console.log(notesToShow);

  const toggleImportanceOf = (id) => {
    console.log('importance of ' + 'id' + ' needs to be toggled');
    const note = notes.find((note) => {return note.id === id});
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote));
      })
      .catch(() => {
        setErrorMessage(`the note ${note.content} was already deleted from server`);
        setTimeout(() => {setErrorMessage(null)}, 5000)
        setNotes(notes.filter(n => n.id !== id));
    })
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm                 
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => {setUsername(target.value)}}
          handlePasswordChange={({ target }) => {setPassword(target.value)}}  
        />
      </Togglable>
    )
  }

  const noteFormRef = useRef()

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm 
          createNote={addNote}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>

    {!user && loginForm()} 
    {user && 
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>log out</button>
        {noteForm()}
      </div>
    }
      <div style={{marginTop:"2rem"}}>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
            />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App