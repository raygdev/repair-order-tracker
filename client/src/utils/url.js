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
        'Content-Type': 'application/json'
    },
    validateStatus: function(status) {
        return status < 500
    }
})

client.interceptors.request.use(config => {
    const token = getToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        delete config.headers.Authorization
    }

    return config
})

export { url, client }