import { Link } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

import { useActions, useAppSelector, useIsAuth } from '../services/hooks'

import { styled } from '@mui/system'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'

const StyledLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  '&:active': {
    textDecoration: 'none',
  },
})

const Header = () => {
  const username = useAppSelector(state => state.auth.name)
  const isAuth = useIsAuth()
  const { logout } = useActions()

  const handleLogout = () => {
    logout()
    enqueueSnackbar(`You are logged out!`, {
      variant: 'info',
      autoHideDuration: 3000,
      preventDuplicate: true,
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar
          variant='dense'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Typography
            pr={2}
            variant='h6'
            component='div'
            whiteSpace='nowrap'
            sx={{ flexGrow: 1 }}
          >
            <StyledLink to={`/`}>MERN Booking</StyledLink>
          </Typography>
          {isAuth ? (
            <Box display='flex' alignItems='center'>
              <AccountCircleIcon />
              <Box maxWidth={70} overflow='hidden' mr={2} ml={1}>
                {username}
              </Box>
              <Button
                variant='text'
                onClick={handleLogout}
                color='inherit'
                endIcon={<ExitToAppIcon />}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box>
              <StyledLink to={'/login'}>
                <Button color='inherit'>Login</Button>
              </StyledLink>
              <StyledLink to={'/register'}>
                <Button color='inherit'>Register</Button>
              </StyledLink>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
