import * as React from 'react'
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
import {useNavigate} from 'react-router-dom'

const theme = createTheme()

export const SignUp = () => {
	
    const navigate = useNavigate()
	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		// eslint-disable-next-line no-console
		const user = {
			username: data.get('username'),
			password: data.get('password'),
		}
		try {
            if(data.get('terms') !== 'approved') {
                alert('Acceptera villkoren')
                return
            }
			const res = await APIService.register(user)
			if (res.status !== 201) alert('Something went wrong')
            navigate(RoutingPaths.loginView)
		} catch (e) {
			console.log(e)
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
						Sign up
					</Typography>
					<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField required fullWidth id='username' label='Användarnamn' name='username' autoComplete='username' />
							</Grid>
							<Grid item xs={12}>
								<TextField required fullWidth name='password' label='Lösenord' type='password' id='password' autoComplete='new-password' />
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value='approved' name="terms" color='primary' />}
									label={
										<div>
											Jag godkänner era <Link href={RoutingPaths.termsView}>villkor</Link>
										</div>
									}
								/>
							</Grid>
						</Grid>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Registrera
						</Button>
						<Grid container justifyContent='flex-end'>
							<Link href={RoutingPaths.loginView} variant='body2'>
								Har du redan ett konto? Logga in här
							</Link>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}
