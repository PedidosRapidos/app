export async function executePostRequest (form, endpoint) {
    const baseURL = 'http://httpbin.org/'    

    const response = await fetch(baseURL + endpoint, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })

    const json = await response.json();
    return json;
}

