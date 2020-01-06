import axios from 'axios';

const baseURL = "http://127.0.0.1:8000";
// const baseURL = "https://api-dot-cadcw2-teamg.appspot.com";

const axiosInstance = axios.create({ baseURL });

export { baseURL, axiosInstance as axios };
