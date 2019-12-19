import axios from 'axios';

const axiosInstance = axios.create({
//   baseURL: 'https://googleappenginelinkhere',
  baseURL: 'http://127.0.0.1:8080',
});

export default axiosInstance;
