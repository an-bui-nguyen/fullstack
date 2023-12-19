import React from "react";
import { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleChange = (event) => {
    setNewNote(event.target.value);
  }

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })
    setNewNote('')
  }

  return (
    <div className="formDiv">
      <form onSubmit={addNote}>
        <input onChange={handleChange} value={newNote} placeholder="write note content here"></input>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm