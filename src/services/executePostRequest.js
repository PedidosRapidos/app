export async function executePostRequest (form, endpoint) {
    const baseURL = 'https://pedidos-rapidos.herokuapp.com'    

    const response = await fetch(baseURL + endpoint, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })

    const json = await response.json();

    if (!response.ok){
        console.log("DEGUG: Respuesta de red OK pero HTTP no: " + json.detail);
        throw {code: json.detail};
    }

    return json;
}

