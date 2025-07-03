import axios from 'axios'
export const axiosInstance=axios.create({
    baseURL:'https://talkie-backend-production-4eb8.up.railway.app',
    withCredentials:true
})