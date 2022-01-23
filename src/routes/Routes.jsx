import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom'
import RoutingPath from './RoutingPaths'
import { HomeView } from '../views/homeview/HomeView'
import { SignIn } from '../views/loginview/SignIn'
import { SignUp } from '../views/loginview/SignUp'

export const Routes = (props) => {
	return (
		<BrowserRouter>
			{props.children}
			<Switch>
				<Route path={RoutingPath.loginView} element={<SignIn />} />
				<Route path={RoutingPath.signupView} element={<SignUp />} />
				<Route path={RoutingPath.homeView} element={<HomeView />} />
				<Route element={<Navigate to={RoutingPath.homeView} />} />
			</Switch>
		</BrowserRouter>
	)
}
