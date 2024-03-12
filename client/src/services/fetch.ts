export const fetchUrl = async (url:string, body , token: string) =>{
    return await fetch(url,{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Autorization': `Bearer ${token}`
        }
    })
}