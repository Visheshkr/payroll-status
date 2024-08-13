import Cookies from "js-cookie";
import axios from "axios";


const axiosClient = axios.create();


axiosClient.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
})

export default axiosClient;
