import {http} from "../api/http-common";
import {Note} from "./notes";


/**
 * POST `/v1/notes`
 * Loads all saved notes.
 */
export const getNotes = (): Promise<Note[]> => http.post('/v1/notes')

/**
 * POST `/v1/notes/:noteId`
 * Loads note by id.
 *
 * @param noteId - Note ID.
 */
export const getNote = (noteId: string): Promise<Note> => http.post(`/v1/notes/${noteId}`)

/**
 * POST `/v1/notes/create`
 * Creates note.
 */
export const createNote = (): Promise<unknown> => http.post('/v1/notes/create')

/**
 * DELETE `/v1/notes/:noteId`
 * Removes note by id.
 *
 * @param noteId - Note ID.
 */
export const removeNote = (noteId: string): Promise<unknown> => http.delete(`/v1/notes/${noteId}`)