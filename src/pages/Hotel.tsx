import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetHotelInfoQuery } from '../services/booking.api'
import Slider from '../components/Slider'
import Reserve from '../components/Reserve'

import { useAppSelector } from '../services/hooks'
import { useIsAuth } from '../services/hooks'

import { parceDate } from '../utils/parceDate'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { theme } from '../theme'
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'

const Hotel = () => {
  const navigate = useNavigate()
  const isAuth = useIsAuth()
  const [openSlider, setOpenSlider] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { id } = useParams()
  const { isLoading, data } = useGetHotelInfoQuery(`${id}`)
  const searchInfo = useAppSelector(state => state.search)

  const parcedDates = parceDate(
    searchInfo?.dates?.[0]?.startDate,
    searchInfo?.dates?.[0]?.endDate,
    searchInfo?.dates?.[0]?.key
  )

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function dayDifference(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays
  }

  const days = dayDifference(parcedDates[0].endDate, parcedDates[0].startDate)

  const handleClickModal = () => {
    isAuth ? setOpenModal(!openModal) : navigate('/login')
  }

  const handleClickSlider = () => {
    setOpenSlider(!openSlider)
  }

  const totalPrice =
    (days == 0 ? 1 : days) *
    searchInfo.options.room *
    (data?.cheapestPrice ?? 0)

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton
            sx={{ m: 1 }}
            variant='rounded'
            width={'100%'}
            height={100}
          />
          <Stack direction='row' spacing={1}>
            <Skeleton variant='rounded' width={'60%'} height={400} />
            <Skeleton variant='rounded' width={'40%'} height={400} />
          </Stack>
        </>
      ) : (
        <>
          <Typography component='h1' variant='h4' fontWeight='700'>
            {data?.name}
          </Typography>
          <Typography
            display='flex'
            alignItems='center'
            component='div'
            gap={1}
            color={`${theme.palette.grey[600]}`}
          >
            <LocationOnIcon />
            {data?.address}
          </Typography>
          <Typography
            component='div'
            fontWeight='700'
            color={`${theme.palette.success.main}`}
          >
            Book a stay over $150 at this property and get a free airport taxi
          </Typography>
          <Box
            display='flex'
            flexDirection={{ xs: 'column', md: 'row' }}
            alignItems='center'
            gap='50px'
          >
            <ImageList
              sx={{
                width: { xs: '100%', md: '50%' },
                height: 400,
                overflow: 'hidden',
              }}
              cols={3}
              rowHeight={200}
              onClick={handleClickSlider}
            >
              {''}
              {data?.photos?.map((img, i) => (
                <ImageListItem key={i} sx={{ cursor: 'pointer' }}>
                  <img
                    src={`${img}?w=200&h=200&fit=crop&auto=format`}
                    alt={img}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Box width={{ xs: '100%', md: '50%' }}>
              <Typography component='h2' variant='h5' fontWeight='700' my={2}>
                {data?.title}
              </Typography>
              <Typography component='p'>{data?.desc}</Typography>
              <Typography variant='h6'>
                Perfect for a {days == 0 ? 1 : days}-night stay
              </Typography>
              <Box
                my={2}
                p={2}
                borderRadius={3}
                sx={{
                  backgroundColor: `${theme.palette.grey[200]}`,
                }}
              >
                <Box
                  mb={2}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='h6'>
                    ${totalPrice} ({days == 0 ? 1 : days} nights in{' '}
                    {searchInfo.options.room} rooms)
                  </Typography>
                </Box>
                <Button
                  onClick={handleClickModal}
                  fullWidth
                  variant='contained'
                >
                  Reserve or Book Now
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
      {openSlider && (
        <Slider
          slides={data?.photos}
          isOpen={openSlider}
          setSlider={handleClickSlider}
        />
      )}
      {openModal && (
        <Reserve hotelId={id} isOpen={openModal} setModal={handleClickModal} />
      )}
    </>
  )
}

export default Hotel
