let url;
if(import.meta.env.PROD) {
    url = 'https://repair-order-tracker-production.up.railway.app'
} else {
    url = 'http://localhost:8080'
}

export { url }