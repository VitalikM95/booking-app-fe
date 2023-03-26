import Search from '../components/Search'
import CityList from '../components/CityList'
import HousingTypeList from '../components/HousingTypeList'
import Favoritelist from '../components/FavoriteList'
import { Box, Typography } from '@mui/material'

const Home = () => {
  return (
    <>
      <Box>
        <Search />
        <Typography sx={{ fontWeight: 'bold' }} variant='h5' component='h4'>
          City list
        </Typography>
        <CityList />
        <Typography sx={{ fontWeight: 'bold' }} variant='h5' component='h4'>
          Count by type of housing
        </Typography>
        <HousingTypeList />
        <Typography sx={{ fontWeight: 'bold' }} variant='h5' component='h4'>
          Our favorite
        </Typography>
        <Favoritelist />
      </Box>
    </>
  )
}

export default Home
