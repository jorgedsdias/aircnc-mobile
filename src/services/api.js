import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-aircnc.herokuapp.com'
});

export default api;