import { Link } from 'react-router-dom'
import { IHotel } from '../models'
import { theme } from '../theme'

import { Box, Button, Card, CardMedia, styled, Typography } from '@mui/material'

const StyledLink = styled(Link)({
  width: '100%',
  textDecoration: 'none',
  '&:active': {
    textDecoration: 'none',
  },
})

const SearchItem = ({ hotel }: { hotel: IHotel }) => {
  return (
    <Box my={3}>
      <Card
        sx={{
          minHeight: '200px',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'stretch',
          gap: '10px',
        }}
      >
        <StyledLink sx={{ width: '100%' }} to={`/hotels/${hotel._id}`}>
          <CardMedia
            component='img'
            image={hotel.photos[0]}
            alt='hotelImage'
            sx={{
              height: '200px',
              borderRadius: 1,
            }}
          />
        </StyledLink>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: { xs: '100%', sm: '50%' },
          }}
        >
          <Box>
            <StyledLink to={`/hotels/${hotel._id}`}>
              <Typography
                component='h5'
                fontSize='20px'
                fontWeight='700'
                color={`${theme.palette.primary.main}`}
              >
                {hotel.name}
              </Typography>
            </StyledLink>
            <Typography
              component='div'
              fontSize='12px'
              color={`${theme.palette.grey[600]}`}
            >
              {hotel.distance}m from center
            </Typography>
          </Box>
          <Typography component='div' fontSize='14px' fontWeight='700'>
            {hotel.title}
          </Typography>
          <Typography
            component='p'
            fontSize='14px'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            {hotel.desc}
          </Typography>
          <Box>
            <Typography
              component='div'
              fontSize='14px'
              fontWeight='700'
              color={`${theme.palette.success.main}`}
            >
              Free cancellation
            </Typography>
            <Typography
              component='div'
              fontSize='12px'
              color={`${theme.palette.success.main}`}
            >
              You can cancel later, so lock in this great price today!
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: { xs: '100%', sm: '20%' },
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            display={{ xs: 'none', sm: 'flex' }}
            position='relative'
            justifyContent='end'
            alignItems='center'
          >
            <Typography variant='body2' component='div'>
              Excellent
            </Typography>
            <Box
              sx={{
                padding: '4px',
                ml: '15px',
                color: 'white',
                backgroundColor: `${theme.palette.secondary.main}`,
                borderRadius: 1,
              }}
            >
              8.5
            </Box>
          </Box>
          <Box textAlign='center'>
            <Typography
              component='div'
              fontSize='20px'
              fontWeight='700'
              color='primary'
            >
              ${hotel.cheapestPrice}
            </Typography>
            <Typography
              component='div'
              fontSize='10px'
              textAlign='center'
              mx='5px'
              color={`${theme.palette.grey[600]}`}
            >
              Includes taxes
            </Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='space-between'
          >
            <StyledLink to={`/hotels/${hotel._id}`}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                sx={{
                  fontSize: '12px',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '15px 5px',
                }}
              >
                See availability
              </Button>
            </StyledLink>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default SearchItem
