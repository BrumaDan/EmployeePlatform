import axios from "./AxiosConfig";

const fetcher = async (url: string) => axios.get(url).then(res => res.data);

export default fetcher;