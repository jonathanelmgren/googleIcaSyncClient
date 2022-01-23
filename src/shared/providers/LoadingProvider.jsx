import React, { useState, createContext } from 'react'

export const LoadingContext = createContext(null)

export const LoadingProvider = (props) => {
	const [loading, setLoading] = useState(true)


	return <LoadingContext.Provider value={[loading, setLoading]}>{props.children}</LoadingContext.Provider>
}
