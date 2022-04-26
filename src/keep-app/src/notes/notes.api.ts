import {http} from "../api/http-common";
import {Note} from "./notes";


/**
 * Contains collection of Notes API methods.
 */
export class NotesAPI {

    /**
     * POST `/v1/notes`
     * Loads all saved notes.
     */
    static getNotes = (): Promise<Note[]> => http.post('/v1/notes')

    /**
     * POST `/v1/notes/:noteId`
     * Loads note by id.
     *
     * @param noteId - Note ID.
     */
    static getNote = (noteId: string): Promise<Note> => http.post(`/v1/notes/${noteId}`)

    /**
     * POST `/v1/notes/create`
     * Creates note.
     */
    static createNote = (): Promise<unknown> => http.post('/v1/notes/create')

    /**
     * DELETE `/v1/notes/:noteId`
     * Removes note by id.
     *
     * @param noteId - Note ID.
     */
    static removeNote = (noteId: string): Promise<unknown> => http.delete(`/v1/notes/${noteId}`)
}
