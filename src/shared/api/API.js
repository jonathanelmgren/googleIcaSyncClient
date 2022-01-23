import Axios from 'axios';

const API_URL = "http://localhost:3001"

const API = Axios.create({
    baseURL: API_URL
})

export default API