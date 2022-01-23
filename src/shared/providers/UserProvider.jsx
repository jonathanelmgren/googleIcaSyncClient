import React, { useState, createContext, useEffect } from 'react'
import APIService from '../api/service/APIService'

export const UserContext = createContext(null)

export const UserProvider = (props) => {
	const [authenticatedUser, setAuthenticatedUser] = useState(undefined)

	useEffect(() => {
		console.log('run')
		if (!localStorage.getItem('token')) return
		const validateToken = async () => {
			const { data } = await APIService.validateToken(localStorage.getItem('token'))
			setAuthenticatedUser(data)
		}
		validateToken()
	}, [])

	return <UserContext.Provider value={[authenticatedUser, setAuthenticatedUser]}>{props.children}</UserContext.Provider>
}
