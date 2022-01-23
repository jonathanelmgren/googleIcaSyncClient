import Axios from 'axios'

const API_URL = 'https://google-ica-sync.herokuapp.com/'

const API = Axios.create({
	baseURL: API_URL,
})

export default API
