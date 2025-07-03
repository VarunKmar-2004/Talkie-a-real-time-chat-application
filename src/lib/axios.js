import axios from 'axios'
export const axiosInstance=axios.create({
    baseURL:'https://talkie-backend-git-main-varuns-projects-5d61da24.vercel.app',
    withCredentials:true
})