import axios from "axios"

const api = axios.create({
    baseURL: "https://api-agro-decide.vercel.app/api"
    // baseURL:"http://localhost:5000"
});

export default api;
