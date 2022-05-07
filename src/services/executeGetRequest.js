export async function executeGetRequest () {
    const baseURL = 'http://httpbin.org/'    

    const response = await fetch(baseURL + 'get', {
        method: 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })

    const json = await response.json();
    return json;
}

