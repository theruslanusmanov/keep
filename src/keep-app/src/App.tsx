import React, {useEffect, useState} from 'react';
import './App.css';


const host = 'http://localhost:3001'
const bodyText = 'New note text.'
const initNotes = [
  {id: '1', body: 'Note'},
  {id: '2', body: 'Another Note'},
]

function App() {
  const [notes, setNotes] = useState(initNotes)

  useEffect(() => {
    if (false)
      fetch(`${host}/notes`, {
        method: 'POST',
        body: null
      })
        .then(res => res.json())
        .catch();
  }, [])

  const createNote = () => {
    setNotes([...notes, {id: '3', body: bodyText}]);

    fetch(`${host}/note`, {
      method: 'POST',
      body: 'New note text.'
    })
      .then(res => res.json())
      .then(res => notes.push({id: '3', body: res}))
      .catch()
  }

  const removeNote = (id: string) => {
    fetch(`${host}/note`, {
      method: 'DELETE',
      body: id
    })
      .then(res => res.json())
      .catch()
  }

  return (
    <div className="App">
      <div className="create-note">
        <input type="text" data-cy="note-body"/>
        <button
          className="create-button"
          data-cy="create-button"
          onClick={() => createNote()}
        >
          Create note
        </button>
      </div>
      <div className="notes" data-cy="notes">
        {
          notes.map((v, i) => (
            <div key={i} className="note" data-cy="note">
              <h1>{v.body}</h1>
              <div data-cy="delete-button" onClick={() => removeNote(v.id)}>X</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
