import axios from 'axios';

const baseURL = "http://127.0.0.1:8000";
// const baseURL = "https://api-dot-cadcw2-teamg.appspot.com";
const socketURL = "http://127.0.0.1:8080";
// const socketURL = "https://socket-dot-cadcw2-teamg.appspot.com";

const axiosInstance = axios.create({ baseURL });

export { baseURL, socketURL, axiosInstance as axios };
