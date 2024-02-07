import axios from "axios";

axios.interceptors.request.use(config => { config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`; return config; }, error => { return Promise.reject(error); });
console.log(localStorage.getItem)
export default axios
