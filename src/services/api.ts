import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  // baseURL: 'http://172.22.112.1:3000/api',
})