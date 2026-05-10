export async function sleep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, 2000)
    })
}