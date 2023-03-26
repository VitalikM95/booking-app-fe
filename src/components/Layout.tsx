import { Outlet } from 'react-router-dom'
import Header from './Header'
import { Box } from '@mui/material'

const Layout = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          width: '100%',
          maxWidth: 1340,
          margin: '70px auto 0',
          padding: '0 20px',
        }}
      >
        <Outlet />
      </Box>
    </>
  )
}

export default Layout
