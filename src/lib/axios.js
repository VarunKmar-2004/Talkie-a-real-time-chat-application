import axios from 'axios'
export const axiosInstance=axios.create({
    baseURL:'https://talkie-backend-snowy.vercel.app',
    withCredentials:true
})