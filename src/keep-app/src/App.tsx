import React, {useEffect, useState} from 'react';
import './App.scss';
import {bodyTextMock, notesMock} from "./notes/notes.mock";
import {NotesAPI} from "./notes/notes.api";


function App() {
  const [notes, setNotes] = useState(notesMock)

  useEffect(() => {
    (async () => {
      loadNotes()
    })()
  }, [])

  const loadNotes = async () => {
    let response = await NotesAPI.getNotes()
    setNotes(response);
  }

  const createNote = async (text: string) => {
    let response = await NotesAPI.createNote(text)
    setNotes([...notes, response]);
  }

  const removeNote = async (id: string) => {
    await NotesAPI.removeNote(id)
    loadNotes()
  }

  return (
    <div className="App">
      <h1>keep</h1>
      <div className="notes" data-cy="notes">
        <div className="create-note note">
          <textarea data-cy="note-body" placeholder="New note..."/>
          <button
            className="create-button"
            data-cy="create-button"
            onClick={() => createNote(bodyTextMock)}
          >
            Add
          </button>
        </div>
        {
          notes.map((v, i) => (
            <div key={i} className="note" data-cy="note">
              <span>{v.text}</span>
              <div
                className="delete-button"
                data-cy="delete-button"
                onClick={() => removeNote(v.id)}
              >
                X
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
