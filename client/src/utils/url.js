let url;
if(import.meta.env.PROD) {
    url = 'https://repair-tracker-api.vercel.app'
} else {
    url = 'http://localhost:8080'
}

//'https://repair-order-tracker-production.up.railway.app'

export { url }