import { useContext } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import RoutingPaths from '../../routes/RoutingPaths'
import APIService from '../../shared/api/service/APIService'
import { UserContext } from '../../shared/providers/UserProvider'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

export const SignIn = () => {
	const [, setAuthenticatedUser] = useContext(UserContext)
  const navigate = useNavigate()
	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		// eslint-disable-next-line no-console
		console.log({
			username: data.get('username'),
			password: data.get('password'),
			remember: data.get('remember'),
		})
		const user = {
			username: data.get('username'),
			password: data.get('password'),
		}
		try {
			const res = await APIService.login(user)
			if (res.status !== 200) alert('Something went wrong')
			setAuthenticatedUser(res.data)
			if (data.get('remember') === 'checked') localStorage.setItem('token', res.data.token)
      navigate(RoutingPaths.homeView)
		} catch (e) {
			alert(e.message)
		}
	}

	return (
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
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Logga in
					</Typography>
					<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField margin='normal' required fullWidth id='username' label='Användarnamn' name='username' autoComplete='username' autoFocus />
						<TextField margin='normal' required fullWidth name='password' label='Lösenord' type='password' id='password' autoComplete='current-password' />
						<FormControlLabel control={<Checkbox name='remember' value='checked' color='primary' />} label='Kom ihåg mig' />
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Logga in
						</Button>
						<Grid container>
							<Grid item>
								<Link href={RoutingPaths.signupView} variant='body2'>
									{'Har du inget konto? Registrera dig här'}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}
