import axios from 'axios';

const api = axios.create({
    baseURL: 'https://bethehero-nicholasalves.herokuapp.com/'
});

export default api;