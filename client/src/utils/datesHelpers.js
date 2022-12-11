export function toLocalDateString(date){
    return new Date(date).toLocaleDateString()
}

export function toISOString(date) {
    return new Date(date).toISOString().substring(0,10)
}