



export async function registerSubmission(newUserForm){
    const res = await fetch('/api/register/user', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newUserForm)
    })
       if(!res.ok){
        throw await res.json()
       }
    const data = res.json()
    return data 
    }
