import axios from 'axios';

<<<<<<< HEAD
// const baseURL = "http://127.0.0.1:8000";
const baseURL = "https://api-dot-cadcw2-teamg.appspot.com";
// const socketURL = "http://127.0.0.1:8080";
const socketURL = "https://socket-dot-cadcw2-teamg.appspot.com";
=======
const baseURL = "http://127.0.0.1:8000";
// const baseURL = "https://api-dot-cadcw2-teamg.appspot.com";
// const socketURL = "https://socket-dot-cadcw2-teamg.appspot.com";
const socketURL = "http://0.0.0.0:8080 ";
>>>>>>> 655fe649299e118946ae00e476c178252b34bd89

const axiosInstance = axios.create({ baseURL });

export { baseURL, socketURL, axiosInstance as axios };
