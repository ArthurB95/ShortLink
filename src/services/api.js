import axios from 'axios';

// key ad77e6db66f74647bc9e288ebb58e5d0ab6a55ce

// base url: https://api-ssl.bitly.com/v4/

export const key ='ad77e6db66f74647bc9e288ebb58e5d0ab6a55ce';

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4/',
    headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
    }
})

export default api;

