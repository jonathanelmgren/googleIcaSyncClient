import Axios from 'axios'

const API_URL = process.env.API_URL

const API = Axios.create({
	baseURL: API_URL,
})

export default API
