import axios from "axios";

const api = axios.create({
        baseURL: 'https://api-receitas-pi.vercel.app/receitas/tipo/'
    });

export default api;