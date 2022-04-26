import React, {useEffect, useState} from 'react';
import './App.scss';
import {environment} from "./environment";
import {bodyTextMock, notesMock} from "./notes/notes.mock";


function App() {
  const [notes, setNotes] = useState(notesMock)

  useEffect(() => {
    if (false)
      fetch(`${environment.host}/notes`, {
        method: 'POST',
        body: null
      })
        .then(res => res.json())
        .catch();
  }, [])

  const createNote = () => {
    setNotes([...notes, {id: '3', body: bodyTextMock}]);

    fetch(`${environment.host}/note`, {
      method: 'POST',
      body: 'New note text.'
    })
      .then(res => res.json())
      .then(res => notes.push({id: '3', body: res}))
      .catch()
  }

  const removeNote = (id: string) => {
    const noteId = notes.findIndex(v => v.id === id);
    let updatedNotes = [...notes];
    updatedNotes.splice(noteId, 1);
    setNotes(updatedNotes);

    fetch(`${environment.host}/note`, {
      method: 'DELETE',
      body: id
    })
      .then(res => res.json())
      .catch()
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
            onClick={() => createNote()}
          >
            Add
          </button>
        </div>
        {
          notes.map((v, i) => (
            <div key={i} className="note" data-cy="note">
              <span>{v.body}</span>
              <div className="delete-button" data-cy="delete-button" onClick={() => removeNote(v.id)}>X</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
