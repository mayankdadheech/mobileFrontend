import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://172.20.10.3:3000/',
  responseType: 'json',
  // withCredentials: true,
});

export default ApiManager;
