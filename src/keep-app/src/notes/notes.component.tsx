import React, {useEffect, useState} from 'react';
import {bodyTextMock, notesMock} from "./notes.mock";
import {Note} from "./notes";
import {NotesAPI} from "./notes.api";


export const NEW_NOTE_PLACEHOLDER = 'New note...'

export const NotesComponent = (): JSX.Element => {
  const [notes, setNotes] = useState(notesMock)

  useEffect(() => {
    (async () => {
      await loadNotes()
    })()
  }, [])

  const loadNotes = async () => {
    let response = await NotesAPI.getNotes()
    setNotes(response);
  }

  const createNote = async (text: string) => {
    await NotesAPI.createNote(text)
    await loadNotes()
  }

  const removeNote = async (id: string) => {
    await NotesAPI.removeNote(id)
    await loadNotes()
  }

  return (
    <>
      <div className="notes" data-cy="notes">
        <div className="create-note note">
          <textarea data-cy="note-body" placeholder={NEW_NOTE_PLACEHOLDER}/>
          <button
            className="create-button"
            data-cy="create-button"
            onClick={() => createNote(bodyTextMock)}
          >
            Add
          </button>
        </div>
        {
          notes.map((v: Note, i: number) => (
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
    </>
  )
}