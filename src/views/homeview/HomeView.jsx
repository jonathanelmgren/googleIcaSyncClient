import { useContext } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import StarsSharp from '@mui/icons-material/StarsSharp'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import APIService from '../../shared/api/service/APIService'
import { UserContext } from '../../shared/providers/UserProvider'
import { Switch } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import RoutingPaths from '../../routes/RoutingPaths'

const theme = createTheme()

export const HomeView = () => {
	const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
	const navigate = useNavigate()
	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const settings = {
			auto: data.get('automatic'),
			ica_user: data.get('ica_user'),
			ica_pass: data.get('ica_pass'),
		}
		if (settings.auto === 'on') {
			setAuthenticatedUser((prev) => ({ ...prev, settings }))
			await APIService.changeUser(authenticatedUser._id, settings)
		} else {
			const token = await APIService.getToken(authenticatedUser._id, { ica_user: data.get('ica_user'), ica_pass: data.get('ica_pass') })
			await APIService.changeUser(authenticatedUser._id, { ica_token: token })
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		navigate(RoutingPaths.loginView)
	}

	const handleTrial = async () => {
		let now = new Date()
		now.setDate(now.getDate() + 1 * 7)
		await APIService.changeUser(authenticatedUser._id, { subscription_end_date: now })
		const stringDate = now.toDateString()
		setAuthenticatedUser({ ...authenticatedUser, subscription_end_date: stringDate })
	}

	const showTrialBtn = () => {
		if (!authenticatedUser.subscription_end_date) {
			return (
				<Button type='button' fullWidth variant='contained' onClick={() => handleTrial()}>
					Starta 7 dagars testperiod
				</Button>
			)
		}
	}

	if (authenticatedUser) {
		return (
			<>
				<ThemeProvider theme={theme}>
					<Container component='main' maxWidth='xs'>
						<CssBaseline />
						<Box
							sx={{
								marginTop: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								<StarsSharp />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Inställningar
							</Typography>
							<Typography component='h5' variant='h7'>
								Ditt id: {authenticatedUser._id}
							</Typography>
							<Typography component='h5' variant='h7'>
								Prenumeration till: {authenticatedUser.subscription_end_date ? authenticatedUser.subscription_end_date : 'Ingen prenumeration'}
							</Typography>
							<Typography component='h5' variant='h7'>
								ICA Användarnamn: {authenticatedUser.ica_user ? `${authenticatedUser.ica_user.content} (Krypterad)` : 'Not set'}
							</Typography>
							<Typography component='h5' variant='h7'>
								ICA Lösenord: {authenticatedUser.ica_pass ? `${authenticatedUser.ica_pass.content} (Krypterad)` : 'Not set'}
							</Typography>
							<br />
							<Typography component='h5' variant='h4'>
								Senaste sync: {authenticatedUser.latest_sync ? authenticatedUser.latest_sync : 'Never synced'}
							</Typography>
							<br />
							<Typography component='h5' variant='h7'>
								<bold>Tänk på att du ger nu mig eventuell tillgång till ditt konto, detta skes på egen risk.</bold><br />
								<bold>
									<Link to={RoutingPaths.guideView}>OBS! Läs guiden innan du går vidare</Link>
								</bold><br />
								<bold>
									<Link to={RoutingPaths.termsView}>OBS! Genom att använda tjänsten godkänner du våra villkor</Link>
								</bold>
							</Typography>

							<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
								<TextField margin='normal' required fullWidth id='ica_user' label='ICA Användarnamn (Personnummer)' name='ica_user' autoFocus />
								<TextField margin='normal' required fullWidth name='ica_pass' label='ICA Lösenord' type='password' id='ica_pass' autoComplete='current-pass' />
								<FormControlLabel control={<Switch defaultChecked name='automatic' />} label='Automatisk uppdatering' />
								<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
									Spara
								</Button>
							</Box>
						</Box>
					</Container>
				</ThemeProvider>
				{showTrialBtn()}
				<Button type='button' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} onClick={() => handleLogout()}>
					Logga ut
				</Button>
			</>
		)
	} else {
		return (
			<div>
				Not authenticated. <Link to={RoutingPaths.loginView}>Click here to login</Link>
			</div>
		)
	}
}
