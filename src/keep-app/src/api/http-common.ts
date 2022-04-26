import axios from 'axios';
import {host} from "../environment";


export const http = axios.create({
    baseURL: `${host}`,
    headers: {
        'Content-type': 'application/json'
    }
})