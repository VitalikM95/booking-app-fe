import { Link } from 'react-router-dom'

import { useGetFeaturedHotelsQuery } from '../services/booking.api'
import { theme } from '../theme'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  styled,
  Stack,
  Skeleton,
  Typography,
} from '@mui/material'

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  '&:active': {
    textDecoration: 'none',
  },
})

const Favoritelist = () => {
  const { isLoading, data } = useGetFeaturedHotelsQuery({})
  return (
    <Box sx={{ margin: '40px auto' }}>
      {isLoading ? (
        <Stack direction='row' spacing={1}>
          <Skeleton variant='rounded' width={'100%'} height={350} />
          <Skeleton variant='rounded' width={'100%'} height={350} />
          <Skeleton variant='rounded' width={'100%'} height={350} />
          <Skeleton variant='rounded' width={'100%'} height={350} />
        </Stack>
      ) : (
        <Grid container justifyContent='center' flexWrap='wrap' spacing={2}>
          {data?.map(item => (
            <Grid key={item?._id} minWidth={320} item xs={3}>
              <Card>
                <CardActionArea
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'start',
                    height: '450px',
                  }}
                >
                  <StyledLink
                    sx={{ width: '100%' }}
                    to={`/hotels/${item?._id}`}
                  >
                    <CardMedia
                      component='img'
                      height='240'
                      image={item?.photos[0]}
                      alt='Rome'
                    />
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        <Typography variant='h5' component='div'>
                          {item?.name}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{
                            '&:first-letter': {
                              textTransform: 'uppercase',
                            },
                          }}
                        >
                          {item?.city}
                        </Typography>
                      </Box>
                      <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                        alignItems='start'
                        my={2}
                        sx={{ position: 'absolute', bottom: 0 }}
                      >
                        <Typography
                          fontSize='15px'
                          variant='h6'
                          component='div'
                        >
                          Starting from {item?.cheapestPrice} $
                        </Typography>
                        <Box display='flex' my={1}>
                          <Box
                            sx={{
                              padding: '3px',
                              margin: '0 10px 5px 0px',
                              color: 'white',
                              backgroundColor: `${theme.palette.secondary.main}`,
                              borderRadius: 1,
                            }}
                          >
                            8.5
                          </Box>
                          <Typography variant='body1' component='div'>
                            Excellent
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </StyledLink>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default Favoritelist
