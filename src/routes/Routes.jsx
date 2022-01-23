import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom'
import RoutingPath from './RoutingPaths'
import { HomeView } from '../views/homeview/HomeView'
import { SignIn } from '../views/loginview/SignIn'
import { SignUp } from '../views/loginview/SignUp'
import { Terms } from '../views/termsview/Terms'
import { GuideView } from '../views/guideview/GuideView'

export const Routes = (props) => {
	return (
		<BrowserRouter>
			{props.children}
			<Switch>
				<Route path={RoutingPath.loginView} element={<SignIn />} />
				<Route path={RoutingPath.signupView} element={<SignUp />} />
				<Route path={RoutingPath.homeView} element={<HomeView />} />
				<Route path={RoutingPath.termsView} element={<Terms />} />
				<Route path={RoutingPath.guideView} element={<GuideView />} />
				<Route element={<Navigate to={RoutingPath.homeView} />} />
			</Switch>
		</BrowserRouter>
	)
}
