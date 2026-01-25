import { client } from "../../utils/url.js";
import { setToken } from "../../utils/token.js";

export interface Creds {
    email: string,
    password: string
}

type Token = `${string}.${string}.${string}`

type Listener = () => void

export async function login(credentials: Creds) {
    const res = await client.post('/api/login', credentials)
    if(res.status >= 400) {
        throw res.data
    }
    const token = res.data.token
    setToken(token)
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
    client.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    return res.data
}

class AuthService {
    #listeners: Listener[] = []
    #user = JSON.parse(localStorage.getItem('user') || 'null');
    async login(credentials: Creds) {
        const res = await client.post('/api/login', credentials)

        if(res.status >= 400) {
            throw res.data
        }
        const token = res.data.token
        this.setToken(token)
        client.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${token}`
            return config
        })
        localStorage.setItem('user', JSON.stringify(res.data))
        this.#user = res.data
        this.notifyListeners()
        return res.data
    }

    get user() {
        return this.#user
    }

    notifyListeners() {
        this.#listeners.forEach(l => l())
    }

    addAuthListener(listener: Listener) {
        this.#listeners.push(listener)
    }

    unsubscribe(listener: Listener) {
        this.#listeners = this.#listeners.filter(l => l !== listener)
    }

    isLoggedIn() {
        const token: Token | null = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }
    isTokenExpired(token: Token) {
        try {
            const parsed = token.split('.')[1]
            if(!parsed) {
                throw new Error('No payload')
            }
            const payload =  JSON.parse(atob(parsed))
            const exp = payload.exp * 1000
            return Date.now() > exp 
        } catch (e) {
            return true
        }
    }

    getToken(): Token | null {
        return localStorage.getItem('token') as Token 
    }

    setToken(token: Token) {
        localStorage.setItem('token', token)
    }

    removeToken() {
        localStorage.removeItem('token')
    }

    logout() {
        this.removeToken()
        localStorage.removeItem('user')
        this.#user = null
        this.notifyListeners()
    }
}

export const authService = new AuthService()

