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

							<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
								<TextField margin='normal' required fullWidth id='ica_user' label='ICA Användarnamn (Personnummer)' name='ica_user' autoFocus />
								<TextField margin='normal' required fullWidth name='ica_pass' label='ICA Lösenord' type='password' id='ica_pass' autoComplete='current-pass' />
								<FormControlLabel control={<Switch defaultChecked name='automatic' />} label='Automatisk uppdatering' />
								<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
									Spara
								</Button>
							</Box>
							<br />
							<br />
							<Typography component='h4' variant='h4'>
								Steg 1:
							</Typography>
							<Typography component='p' variant='p'>
								1. Surfa in på <a href='https://shoppinglist.google.com/'>shoppinglist.google.com</a>
								<br />
								2. Ta din primära Google Shoppinglist (den inköpslistan som är kopplad till din Google Assistent) och döp om den till: {authenticatedUser._id}
								<br />
								3. Dela denna listan med: <span>googleicasync@elmgren.dev</span>
							</Typography>
							<br />
							<Typography component='h4' variant='h4'>
								Steg 2:
							</Typography>
							<Typography component='p' variant='p'>
								Skriv in ditt användarnamn och lösenord till ICA. Lösenordet till ICA hittar du på tidningen buffé som ICA skickar ut. Du kan också kontakta kundtjänst och be dem skicka ut ett lösenord. Du kan även byta lösenordet själv genom att surfa in på <a href='https://ica.se/'>ICAs hemsida</a>, klicka "Logga in", Välj sedan "Lösenord" och klicka i "Glömt lösenordet".
								<br />
								<br />
								För att verifiera att ditt användarnamn och lösenord är korrekt så kan du bara försöka logga in på ICA med dina uppgifter <br />
								<br />
								Skillnaden på automatisk och manuell är att den automatiska sparar dina ICA-uppgifter för att automatiskt uppdatera en så kallad Token (som då används för att göra API-anrop och hämta/lägga till data i din inköpslista hos ICA.). <br />
								Den manuella hämtar denna så kallade token och sparar ej dina inloggningsuppgifter. Denna token har ett utgångsdatum och du behöver göra om denna processen då och då om du väljer manuell approach.
							</Typography>
							<br />
							<Typography component='h4' variant='h4'>
								Steg 3:
							</Typography>
							<Typography component='p' variant='p'>
								För att denna sidan skall ligga uppe måste både kod och servrar underhållas och bekostas, därför har jag ett "Pay what you want"-system. Ni swishar valfri summa till mig så får ni en månad av denna tjänsten :). Glöm ej att skriva ditt ID eller användarnamn i meddelande-fältet. Men glöm inte av att ni får en 7-dagars provperiod.
								<br />
								<br />
								Swishnummer: 0706943349
								<br />
								<br />
								Om ni ej vill betala så kan ni även ladda ned källkoden och köra den lokalt hos er:
								<br />
								<a href='https://github.com/'>Github - Server</a>
								<br />
								<a href='https://github.com/'>Github - Client</a>
							</Typography>
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
