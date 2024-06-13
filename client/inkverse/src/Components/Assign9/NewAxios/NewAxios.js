import axios from "axios";
let token = localStorage.getItem('token')
export const NewAxios = axios.create({
    headers:{Authorization:`Bearer ${token}`}
})