export function toLocalDateString(date: string){
    return new Date(date).toLocaleDateString()
}

export function toISOString(date: string) {
    return new Date(date).toISOString().substring(0,10)
}