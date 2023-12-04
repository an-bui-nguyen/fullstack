import Note from './components/Note';
import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  // useEffect(() => {
  //   console.log('effect');
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled');
  //       setNotes(response.data)
  //     })
  // }, [])

  useEffect(() => {
    async function fetchData() {
      console.log('effect');
      const initialNotes = await noteService.getAll();
      console.log('promise fulffiled');
      setNotes(initialNotes);
    }

    fetchData().catch(console.error);
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
      .catch(error => {
        setErrorMessage(`the note ${note.content} was already deleted from server`);
        setTimeout(() => {setErrorMessage(null)}, 5000)
        setNotes(notes.filter(n => n.id !== id));
    })
  }

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote("");
      })
  }

  const handleChange = (event) => {
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
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
      <form onSubmit={addNote}>
          <input onChange={handleChange} value={newNote}></input>
          <button type="submit">Add note</button>
      </form>
      <Footer />
    </div>
  )
}

export default App