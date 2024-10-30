import { client } from "../../utils/url";
import { setToken } from "../../utils/token";



export async function login(credentials) {
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
    #listeners = []
    #user = JSON.parse(localStorage.getItem('user'));
    async login(credentials) {
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

    addAuthListener(listener) {
        this.#listeners.push(listener)
    }

    unsubscribe(listener) {
        this.#listeners = this.#listeners.filter(l => l !== listener)
    }

    isLoggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }
    isTokenExpired(token) {
        try {
            const payload =  JSON.parse(atob(token.split('.')[1]))
            const exp = payload.exp * 1000
            return Date.now() > exp 
        } catch (e) {
            return true
        }
    }

    getToken() {
        return localStorage.getItem('token')
    }

    setToken(token) {
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

