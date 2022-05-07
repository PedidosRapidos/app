export async function executeGetRequest (endpoint) {
    const baseURL = 'http://httpbin.org/'    

    const response = await fetch(baseURL + endpoint, {
        method: 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })

    const json = await response.json();
    return json;
}

