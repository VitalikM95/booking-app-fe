import { useCountByTypeQuery } from '../services/booking.api'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'

const images = [
  'https://dec1osz9a7g7e.cloudfront.net/o-hotel-pune-new-o-hotel-pune-new-oandhotelandpuneandnewandoandhotelandpuneandnewanddeluxandroommainpage01.jpg',
  'https://thumbs.cityrealty.com/assets/smart/736x/webp/1/16/1655f4e3904fb79cb987ab7755d2b3f4b8f37f88/1-city-point.jpg',
  'https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/cover-resorts-near-Calicut.jpg',
  'https://dykhzttck504m.cloudfront.net/collections/backgrounds/large_groups_optimised.jpg',
  'https://www.brokenbowvacationcabins.com/wp-content/uploads/2012/08/foreveryoung_front1_940.jpg',
]

const HousingTypeList = () => {
  const { isLoading, data } = useCountByTypeQuery({})

  return (
    <Box sx={{ margin: '40px auto' }}>
      {isLoading ? (
        <Stack direction='row' spacing={1}>
          <Skeleton variant='rounded' width={'100%'} height={240} />
          <Skeleton variant='rounded' width={'100%'} height={240} />
          <Skeleton variant='rounded' width={'100%'} height={240} />
          <Skeleton variant='rounded' width={'100%'} height={240} />
          <Skeleton variant='rounded' width={'100%'} height={240} />
        </Stack>
      ) : (
        <Grid container justifyContent='center' flexWrap='wrap' spacing={2}>
          {images.map((img, i) => (
            <Grid key={i} item minWidth={200} xs={2.4}>
              <Card sx={{ maxWidth: 230, maxHeight: 300 }}>
                <Box>
                  <CardMedia component='img' height='200' image={img} alt='#' />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {data[i].type}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {data[i].count} {data[i].type}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default HousingTypeList
