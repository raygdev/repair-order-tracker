import axios from 'axios'
import { getToken } from './token';

let url;
if(import.meta.env.PROD) {
    url = 'https://repair-tracker-api.vercel.app'
} else {
    url = 'http://localhost:8080'
}

const client = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${getToken()}`
    },
    validateStatus: function(status) {
        return status < 500
    }
})

export { url, client }