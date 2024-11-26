import axios from 'axios';
import Cookies from 'js-cookie';
export const api = axios.create({
    baseURL: 'http://localhost:8080', // Adjust based on your backend's URL
});
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Add a request interceptor to include JWT token
// api.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// });
