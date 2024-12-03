import axios from 'axios';
import { authClient } from './client';

const setAuthToken = token => {
    if (token) {
        console.log(`Bearer ${token}`);
        authClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

// const verifyToken = (token) => {
//     const response = authClient
//         .get('/auth/verify', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//         .then((response) => {
//             return true;
//         })
//         .catch((error) => {
//             return false;
//         })

//     console.log(response);
            
//     return response;
// }

const verifyToken = async (token) => {
    return await authClient.get('/auth/verify', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        return true; 
    })
    .catch(error => {
        return false;
    });
};

export {
    setAuthToken,
    verifyToken,
}
