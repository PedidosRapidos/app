export async function requestService (_header, _body, _endpoint, callback) {
    const baseURL = 'http://httpbin.org/'    
 
    const response = await fetch(baseURL + 'get')
    const json = await response.json();
    console.log(json);
    return json;
}

