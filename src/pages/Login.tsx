import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from 'react-hook-form'
import { useLoginUserMutation } from '../services/booking.api'
import { useIsAuth, useActions } from '../services/hooks'

import { ILoginForm } from '../models'
import { usernameValidation, passwordValidation } from '../utils/validate'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ReplyAllIcon from '@mui/icons-material/ReplyAll'
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material'

const Login = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const isAuth = useIsAuth()
  const { setUser } = useActions()

  const [loginUser, { data: userData, isError, isSuccess, isLoading }] =
    useLoginUserMutation({})

  const { handleSubmit, control } = useForm<ILoginForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const { errors, isSubmitSuccessful } = useFormState({
    control,
  })

  useEffect(() => {
    isAuth && navigate('/')
  }, [])

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    loginUser(data)
  }

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
      autoHideDuration: 1000,
      preventDuplicate: true,
    })
    navigate('/')
  }

  if (isSubmitSuccessful && isError) {
    enqueueSnackbar('Wrong password or username!', {
      variant: 'error',
      autoHideDuration: 3000,
      preventDuplicate: true,
    })
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
          Log In
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ my: 2 }}
        >
          <Controller
            control={control}
            name='username'
            rules={usernameValidation}
            render={({ field }) => (
              <TextField
                required
                autoFocus
                fullWidth
                margin='normal'
                label='Username'
                onChange={e => field.onChange(e)}
                error={!!errors.username?.message}
                helperText={errors?.username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            rules={passwordValidation}
            render={({ field }) => (
              <TextField
                required
                fullWidth
                margin='normal'
                label='Password'
                type='password'
                autoComplete='new-password'
                onChange={e => field.onChange(e)}
                error={!!errors?.password?.message}
                helperText={errors?.password?.message}
              />
            )}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link to='/register'>
                <Typography variant='subtitle2' color='primary.main'>
                  Don't have an account? Register
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
export default Login
