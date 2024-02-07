import axios from "axios";

if (localStorage.getItem('authStore') != null)
{
    axios.interceptors.request.use(config => { config.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.authStore).state.token}`; return config; }, error => { return Promise.reject(error); });
}
export default axios
