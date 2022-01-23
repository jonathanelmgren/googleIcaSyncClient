import { Routes } from './routes/Routes'
import { LoadingProvider } from './shared/providers/LoadingProvider'
import { UserProvider } from './shared/providers/UserProvider'

export const App = () => {
	return (
		<LoadingProvider>
			<UserProvider>
				<Routes />
			</UserProvider>
		</LoadingProvider>
	)
}
