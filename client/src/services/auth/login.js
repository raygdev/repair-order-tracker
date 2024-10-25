import { client } from "../../utils/url";
import { setToken } from "../../utils/token";



export async function login(credentials) {
    const res = await client.post('/api/login', credentials)
    console.log('[STATUSTEXT]', res.statusText)
    if(res.statusText !== 'OK') {
        console.log('[RES NOT OK]')
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
    async login(credentials) {
        const res = await client.post('/api/login', credentials)

        if(res.statusText !== 'OK') {
            throw res.data
        }
        const token = res.data.token
        setToken(token)
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
        }

    }

    logout() {
        localStorage.removeItem('token')
        this.notifyListeners()
    }
}

export const authService = new AuthService()

