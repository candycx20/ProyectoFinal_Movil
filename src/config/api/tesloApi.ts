import axios from "axios";
import { API_URL } from "@env";
import { StorageAdapter } from "../adapters/storage-adapter";

const tesloApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

tesloApi.interceptors.request.use(
    async (config) => {
        const token = await StorageAdapter.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    }
)

export {tesloApi}