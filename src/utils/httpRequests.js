import axios from 'axios';

export const httpRequests = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});
