import axios from "axios";


const fetcher = async (url: string, token: string) => axios.get(url,
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res);

export default fetcher;