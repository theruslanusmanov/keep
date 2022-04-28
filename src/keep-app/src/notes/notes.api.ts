import {http} from "../api/http-common";
import {Note} from "./notes";
import {AxiosResponse} from "axios";


/**
 * Contains collection of Notes API methods.
 */
export class NotesAPI {

    /**
     * GET `/v1/notes`
     * Loads all saved notes.
     */
    static getNotes = (): Promise<Note[]> => http.get('/v1/notes').then(response => response.data)

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
     *
     * @param text - Note text.
     */
    static createNote = (text: string): Promise<Note> => http.post('/v1/notes/create', text)

    /**
     * DELETE `/v1/notes/:noteId`
     * Removes note by id.
     *
     * @param noteId - Note ID.
     */
    static removeNote = (noteId: string): Promise<unknown> => http.delete(`/v1/notes/${noteId}`)
}
