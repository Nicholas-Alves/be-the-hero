import axios from 'axios';
import { API_URL, API_LOCAL } from 'react-native-dotenv'

const api = axios.create({
    baseURL: API_URL,
});

export default api;