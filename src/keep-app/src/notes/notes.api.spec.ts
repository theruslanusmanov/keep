import {NotesAPI} from "./notes.api";
import {notesMock} from "./notes.mock";

describe('Notes API', function () {
  describe('#getNotes', function () {
    it('should load all saved notes', async function () {
      const responseMock = notesMock;
      jest.spyOn(NotesAPI, 'getNotes').mockReturnValue(Promise.resolve(responseMock));
      expect(await NotesAPI.getNotes()).toEqual(responseMock);
    });
  });

  describe('#getNote', function () {
    it('should load note by id', async function () {
      const responseMock = notesMock[0];
      const noteId = 'note_id'
      const getNoteSpy = jest.spyOn(NotesAPI, 'getNote').mockReturnValue(Promise.resolve(responseMock));
      const response = await NotesAPI.getNote(noteId);
      expect(getNoteSpy).toHaveBeenCalledWith(noteId);
      expect(response).toEqual(responseMock);
    });
  });

  describe('#createNote', function () {
    it('should create note', async function () {
      const responseMock = notesMock[0];
      jest.spyOn(NotesAPI, 'createNote').mockReturnValue(Promise.resolve(responseMock));
      const response = await NotesAPI.createNote();
      expect(response).toEqual(responseMock);
    });
  });

  describe('#removeNote', function () {
    it('should remove note by id', async function () {
      const responseMock = notesMock[0];
      const noteId = 'note_id'
      const removeNoteSpy = jest.spyOn(NotesAPI, 'removeNote').mockReturnValue(Promise.resolve(responseMock));
      const response = await NotesAPI.removeNote(noteId);
      expect(removeNoteSpy).toHaveBeenCalledWith(noteId);
      expect(response).toEqual(responseMock);
    });
  });
});