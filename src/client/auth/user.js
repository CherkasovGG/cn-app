import { config } from "../../config"
import { getToken } from "../auth"

const baseURL = config.baseURL + '/auth/user/'

const getUser = async () => {
    if (localStorage.getItem('user')) {
        return Promise.resolve(JSON.parse(localStorage.getItem('user')));
    }

    const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
    })
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log(data);
    
    localStorage.setItem('user', JSON.stringify(data));
    return data;
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
