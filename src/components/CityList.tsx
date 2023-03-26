import { useNavigate } from 'react-router-dom'

import { useCountByCityQuery } from '../services/booking.api'
import { useActions } from '../services/hooks'

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'

const CityList = () => {
  const navigate = useNavigate()
  const { addSearchInfo } = useActions()

  const { isLoading, data } = useCountByCityQuery({})

  const handleClickCity = (city: string) => {
    addSearchInfo({
      destination: city,
      dates: [{ startDate: new Date(), endDate: new Date(), key: 'selection' }],
      options: { adult: 1, children: 0, room: 1 },
    })
    navigate('/hotels')
  }

  return (
    <Box sx={{ margin: '40px auto' }}>
      {isLoading ? (
        <Stack direction='row' spacing={2}>
          <Skeleton variant='rounded' width={'100%'} height={300} />
          <Skeleton variant='rounded' width={'100%'} height={300} />
          <Skeleton variant='rounded' width={'100%'} height={300} />
        </Stack>
      ) : (
        <Grid container justifyContent='center' flexWrap='wrap' spacing={2}>
          <Grid item minWidth={250} xs={3}>
            <Card>
              <CardActionArea onClick={() => handleClickCity('rome')}>
                <CardMedia
                  component='img'
                  height='240'
                  image='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/morning-aerial-photo-taken-on-march-30-2020-shows-deserted-news-photo-1659951255.jpg?resize=640:*'
                  alt='Rome'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Rome
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ overflow: 'hidden' }}
                  >
                    {data[0]} properties
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid minWidth={250} item xs={3}>
            <Card>
              <CardActionArea onClick={() => handleClickCity('paris')}>
                <CardMedia
                  component='img'
                  height='240'
                  image='https://cdn.travelpulse.com/images/faa9edf4-a957-df11-b491-006073e71405/c0594e9a-dd27-41b9-b02b-0c0362deadce/600x400.jpg'
                  alt='Paris'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Paris
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {data[1]} properties
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid minWidth={250} item xs={3}>
            <Card>
              <CardActionArea onClick={() => handleClickCity('london')}>
                <CardMedia
                  component='img'
                  height='240'
                  image='https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE'
                  alt='London'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    London
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {data[2]} properties
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid minWidth={250} item xs={3}>
            <Card>
              <CardActionArea onClick={() => handleClickCity('prague')}>
                <CardMedia
                  component='img'
                  height='240'
                  image='https://a.cdn-hotels.com/gdcs/production76/d1135/21203dce-feeb-40f3-8c93-fc1a98f7549a.jpg?impolicy=fcrop&w=800&h=533&q=medium'
                  alt='Prague'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Prague
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {data[3]} properties
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default CityList
