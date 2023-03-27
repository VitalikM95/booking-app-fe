import { Link } from 'react-router-dom'
import { Box, Button, Typography, styled } from '@mui/material'
import { theme } from '../theme'

const StyledLink = styled(Link)({
  color: `${theme.palette.primary.main}`,
  fontSize: '16px',
  textDecoration: 'none',
  '&:active': {
    textDecoration: 'none',
  },
})

const NotFound = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Typography component='div' variant='h4' color='secondary' my={5}>
        THIS PAGE DOESN'T EXIST!
      </Typography>
      <Button variant='outlined'>
        <StyledLink to='/'>Go Home</StyledLink>
      </Button>
    </Box>
  )
}

export default NotFound
