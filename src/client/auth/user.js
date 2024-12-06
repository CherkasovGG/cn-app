import { config } from "../../config"
import { getToken } from "../auth"

const baseURL = config.baseURL + '/auth/user/'

const getUser = () => {
    return fetch(baseURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
    })
        .then(res => res.json())
}


const createUser = (data) => {
    return fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
}

export {
    getUser,
    createUser,
}
