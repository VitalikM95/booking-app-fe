import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import MuiPhoneNumber from 'material-ui-phone-number-2'

import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from 'react-hook-form'
import {
  usernameValidation,
  cityValidation,
  countryValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
} from '../utils/validate'
import { IRegisterForm } from '../models'
import { useRegisterUserMutation } from '../services/booking.api'
import { useActions, useIsAuth } from '../services/hooks'

import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material'

const Register = () => {
  const isAuth = useIsAuth()
  const navigate = useNavigate()
  const { setUser } = useActions()

  const [registerUser, { data: userData, isSuccess, isLoading }] =
    useRegisterUserMutation()

  const { handleSubmit, control } = useForm<IRegisterForm>({ mode: 'all' })
  const { errors } = useFormState({
    control,
  })
  const onSubmit: SubmitHandler<IRegisterForm> = data => registerUser(data)

  useEffect(() => {
    isAuth && navigate('/')
  }, [isSuccess])

  if (isSuccess) {
    setUser({
      name: userData?.username || null,
      token: userData?.token || null,
    })
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: userData?.username,
        token: userData?.token,
      })
    )
    enqueueSnackbar(`You are logged in, Welcome!`, {
      variant: 'success',
      autoHideDuration: 3000,
      preventDuplicate: true,
    })
    navigate('/')
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          position: 'relative',
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Link to='/'>
          <Box
            position='absolute'
            color='primary.main'
            textAlign='center'
            left={0}
          >
            <ReplyAllIcon fontSize='large' />
          </Box>
        </Link>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name='username'
                rules={usernameValidation}
                render={({ field }) => (
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    label='Username'
                    onChange={e => field.onChange(e)}
                    error={!!errors.username?.message}
                    helperText={errors?.username?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name='email'
                rules={emailValidation}
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    label='Email Address'
                    type='email'
                    onChange={e => field.onChange(e)}
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name='password'
                rules={passwordValidation}
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    label='Password'
                    type='password'
                    autoComplete='new-password'
                    onChange={e => field.onChange(e)}
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name='country'
                rules={countryValidation}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    required
                    label='Country'
                    variant='standard'
                    onChange={e => field.onChange(e)}
                    error={!!errors?.country?.message}
                    helperText={errors?.country?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name='city'
                rules={cityValidation}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    required
                    label='City'
                    variant='standard'
                    onChange={e => field.onChange(e)}
                    error={!!errors?.city?.message}
                    helperText={errors?.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name='phone'
                rules={phoneValidation}
                render={({ field }) => (
                  <MuiPhoneNumber
                    disableDropdown
                    required
                    fullWidth
                    defaultCountry={'ua'}
                    label='Phone'
                    onChange={e => field.onChange(e)}
                    error={!!errors?.phone?.message}
                    helperText={errors?.phone?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            disabled={isLoading}
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link to='/login'>
                <Typography variant='subtitle2' color='primary.main'>
                  Already have an account? Login
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
