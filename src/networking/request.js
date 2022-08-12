import Helper from "../utils/Helper";

const debug = true


export function GetRequest(api) {
    try{
        if (debug) {
            console.log('API => ' + api)
        }
        
        return fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                if (debug) {
                    console.log('Response => ' + JSON.stringify(responseJson));
                }
                return responseJson
            })
            .catch(error => {
                return error;
            })
    }
    catch(e){
        console.log(e)
    }   
}
export function PostRequest(api,payloads) {
    try{
        if (debug) {
            console.log('API => ' + api)
            console.log('Payloads => ' + payloads)
        }
        return fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: payloads,
        })
            .then(response => response.json())
            .then(responseJson => {
                if (debug) {
                    console.log('Response => ' + JSON.stringify(responseJson));
                }
                return responseJson
            })
            .catch(error => {
                return error;
            })
    }
    catch(e){
        console.log(e)
    }
    
}

export async function PostRequestWithAuthentication(api,payloads) {
    if (debug) {
        console.log('API => ' + api);
        console.log('Payloads => ' + JSON.stringify(payloads));
    }
    var token = await Helper.getToken();
    return fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: payloads,
    })
        .then(response => response.json())
        .then(responseJson => {
            if (debug) {
                console.log('Response => ' + JSON.stringify(responseJson));
            }
            return responseJson;
        })
        .catch(error => {
            return error;
        });
}
export async function PutRequestWithAuthentication(api,payloads) {
    if (debug) {
        console.log('API => ' + api);
        console.log('Payloads => ' + payloads);
    }
    var token = await Helper.getToken();
    console.log(token)
    return fetch(api, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: payloads,
    })
        .then(response => response.json())
        .then(responseJson => {
            if (debug) {
                console.log('Response => ' + JSON.stringify(responseJson));
            }
            return responseJson;
        })
        .catch(error => {
            return error;
        });
}
export async function DeleteRequestWithAuthentication(api) {
    if (debug) {
        console.log('API => ' + api);
    }
    var token = await Helper.getToken();
    console.log(token)
    return fetch(api, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            if (debug) {
                console.log('Response => ' + JSON.stringify(responseJson));
            }
            return responseJson;
        })
        .catch(error => {
            return error;
        });
}

export async function GetRequestWithAuthentication(api) {
    if (debug) {
        console.log('API => ' + api);
    }
    var token = await Helper.getToken();
    return fetch(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (debug) {
                console.log('Response => ' + JSON.stringify(responseJson));
            }
            return responseJson;
        })
        .catch(error => {
            return error;
        });
}

export async function PostRequestWithAuthentication_Image(api, payload) {
        if (debug) {
            console.log('API => ' + api);
            console.log('Payload => ' + payload);
        }
        var token = await Helper.getToken();
        console.log(token)
        return fetch(api, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
            method: 'POST',
            
            body: payload,
        })
        .then(response => response.json())
        .then(responseJson => {
            if (debug) {
                console.log('Response => ' + JSON.stringify(responseJson));
            }
            return responseJson;
        })
        .catch(error => {
            return error;
        });
}