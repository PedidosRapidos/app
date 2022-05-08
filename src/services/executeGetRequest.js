export async function executeGetRequest (endpoint) {
    const baseURL = 'http://httpbin.org/'    

    const response = await fetch(baseURL + endpoint, {
        method: 'GET',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })

    if (!response.ok){
        console.log("DEGUG: Respuesta de red OK pero HTTP no:" + json.detail);
        throw {code:json.detail};
    }

    const json = await response.json();
    return json;
}

