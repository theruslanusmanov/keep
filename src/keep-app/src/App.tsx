import React, {useState} from 'react';
import './App.css';

const bodyText = 'New note text.'
const initNotes = [
  {id: '1', body: 'Note'},
  {id: '2', body: 'Another Note'},
]

function App() {
  const [notes, setNotes] = useState(initNotes)

  const createButton = () => {
    setNotes([...notes, {id: '3', body: bodyText}]);

    fetch(
      'http://localhost:3001/note', {
        method: 'POST',
        body: 'New note text.'
      })
      .then(res => res.json())
      .then(res => notes.push({id: '3', body: res}));
  }

  return (
    <div className="App">
      <div className="create-note">
        <input type="text" data-cy="note-body"/>
        <button
          className="create-button"
          data-cy="create-button"
          onClick={() => createButton()}
        >
          Create note
        </button>
      </div>
      <div className="notes" data-cy="notes">
        {
          notes.map((v, i) => (
            <div key={i} className="note">{v.body}</div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
