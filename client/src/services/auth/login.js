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
    #user;
    async login(credentials) {
        const res = await client.post('/api/login', credentials)

        if(res.status >= 400) {
            throw res.data
        }
        const token = res.data.token
        setToken(token)
        client.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${token}`
            return config
        })
        this.#user = res.data
        this.notifyListeners()
        return res.data
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
        const token = localStorage.getItem('token')

        if(!token) {
            this.logout()
            return false
        }

    }

    logout() {
        localStorage.removeItem('token')
        this.notifyListeners()
    }
}

export const authService = new AuthService()

