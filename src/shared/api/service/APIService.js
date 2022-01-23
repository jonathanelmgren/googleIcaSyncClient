import http from '../API'

const register = (data) => {
	return http.post(`/user/register`, data)
}
const login = (data) => {
	return http.post(`/user/login`, data)
}
const validateToken = (token) => {
	return http.get('/user/', {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})
}
const changeUser = (userid, data) => {
	return http.put(`/user/${userid}`, data)
}
const getToken = (userid, data) => {
	return http.post(`/user/${userid}/icatoken`, data)
}

export default { register, login, validateToken, changeUser, getToken }
