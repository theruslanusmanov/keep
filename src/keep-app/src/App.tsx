import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="create-note">
        <input type="text" data-cy="note-body" />
        <button className="create-button" data-cy="create-button"/>
      </div>
      <div className="notes" data-cy="notes">
        <div className="note"/>
        <div className="note"/>
      </div>
    </div>
  );
}

export default App;
