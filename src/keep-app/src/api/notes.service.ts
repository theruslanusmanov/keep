import {http} from "./http-common";


/**
 * POST `/v1/notes`
 * Loads all saved notes.
 */
export const getNotes = () => http.post('/v1/notes')

/**
 * POST `/v1/notes/:noteId`
 * Loads note by id
 *
 * @param noteId - Note ID.
 */
export const getNote = (noteId: string) => http.post(`/v1/notes/${noteId}`)

/**
 * POST `/v1/notes/create`
 * Creates note
 */
export const createNote = () => http.post('/v1/notes/create')

/**
 * DELETE `/v1/notes/:noteId`
 * Removes note by id.
 *
 * @param noteId - Note ID.
 */
export const removeNote = (noteId: string) => http.delete(`/v1/notes/${noteId}`)