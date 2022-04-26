import axios from 'axios';
import {environment} from "../environment";


/**
 * Creates `axios` instance for creating http requests.
 *
 * @see `https://axios-http.com/docs/instance`
 */
export const http = axios.create({
    baseURL: `${environment.host}`,
    headers: {
        'Content-type': 'application/json'
    }
})