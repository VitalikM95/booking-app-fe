import { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { HandySvg } from 'handy-svg'

import SearchItem from '../components/SearchItem'

import { useGetHotelsQuery } from '../services/booking.api'
import { useActions, useAppSelector } from '../services/hooks'
import { useDebounce } from '../utils/debounce'
import { parceDate } from '../utils/parceDate'

import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { theme } from '../theme'
import {
  Box,
  Grid,
  styled,
  InputBase,
  Button,
  Typography,
  IconButton,
  Stack,
  Skeleton,
} from '@mui/material'

const SearchContainer = {
  width: '100%',
  height: '500px',
  padding: '12px',
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: `${theme.palette.primary.light}`,
  borderRadius: '10px',
}

const OptionItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const List = () => {
  const { addSearchInfo } = useActions()
  const searchState = useAppSelector(state => state.search)

  const [destination, setDestination] = useState(searchState?.destination)
  const [dates, setDates] = useState(searchState?.dates)
  const [options, setOptions] = useState(searchState?.options)

  const [min, setMin] = useState('')
  const minDebounced = useDebounce(min)

  const [max, setMax] = useState('')
  const maxDebounced = useDebounce(max)

  const [openDate, setOpenDate] = useState(false)

  const { isLoading, data, refetch } = useGetHotelsQuery({
    destination: searchState?.destination,
    min: minDebounced,
    max: maxDebounced,
  })

  useEffect(() => {
    const parcedDates = parceDate(
      searchState?.dates?.[0]?.startDate,
      searchState?.dates?.[0]?.endDate,
      searchState?.dates?.[0]?.key
    )
    setDestination(searchState?.destination)
    setDates(parcedDates)
  }, [isLoading])

  const onChangeOption = (name: string, operation: string) => {
    setOptions(prev => {
      return {
        ...prev,
        [name]:
          operation === 'i'
            ? options[name as keyof typeof options] + 1
            : options[name as keyof typeof options] - 1,
      }
    })
  }

  const handleSearch = () => {
    addSearchInfo({ destination: destination.toLowerCase(), dates, options })
    refetch()
  }

  return (
    <>
      {isLoading ? (
        <Grid container spacing={2}>
          <Grid item xs={3.4}>
            <Skeleton variant='rounded' width={'100%'} height={500} />
          </Grid>
          <Grid item xs={8.6}>
            <Stack direction='column' spacing={1}>
              <Skeleton variant='rounded' width={'100%'} height={250} />
              <Skeleton variant='rounded' width={'100%'} height={250} />
              <Skeleton variant='rounded' width={'100%'} height={250} />
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Grid
          sx={{
            alignItems: { xs: 'center', md: 'start' },
            flexDirection: { xs: 'column', md: 'row' },
          }}
          container
          spacing={2}
        >
          <Grid item width='100%' maxWidth='450px' md={3.4}>
            <Box sx={SearchContainer}>
              <Typography color='white' variant='h6' component='div'>
                Search
              </Typography>
              <Box width='100%'>
                <Typography
                  fontSize={20}
                  color='white'
                  variant='body1'
                  component='div'
                >
                  Destination
                </Typography>
                <InputBase
                  sx={{
                    background: 'white',
                    width: '100%',
                    borderRadius: '5px',
                    padding: '5px',
                  }}
                  type='text'
                  name='destination'
                  value={destination}
                  placeholder='Where are you going?'
                  onChange={e => setDestination(e.target.value)}
                />
              </Box>
              <Box width='100%'>
                <Typography
                  fontSize={20}
                  color='white'
                  variant='body1'
                  component='div'
                >
                  Check-in-date
                </Typography>
                <Box
                  onClick={() => {
                    setOpenDate(!openDate)
                    addSearchInfo({ destination, dates, options })
                  }}
                  sx={{
                    background: 'white',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    padding: '9px',
                  }}
                >
                  {dates?.[0]?.key
                    ? `${format(
                        dates?.[0]?.startDate,
                        'MM/dd/yyyy'
                      )} to ${format(dates?.[0]?.endDate, 'MM/dd/yyyy')}`
                    : 'Loading'}
                </Box>
                {openDate && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '292px',
                      zIndex: '2',
                    }}
                  >
                    <DateRange
                      editableDateInputs={true}
                      key='selection'
                      onChange={(item: any) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      minDate={new Date()}
                    />
                  </Box>
                )}
              </Box>
              <Box width='100%'>
                <Typography
                  color='white'
                  fontSize={20}
                  variant='body1'
                  component='div'
                >
                  Option
                </Typography>
                <Box color='white'>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '7px',
                    }}
                  >
                    <Typography variant='body2'>
                      Min price (per night)
                    </Typography>
                    <InputBase
                      sx={{
                        background: 'white',
                        width: '20%',
                        borderRadius: '5px',
                        px: '5px',
                      }}
                      value={min}
                      type='number'
                      onChange={e => setMin(e.target.value)}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '7px',
                    }}
                  >
                    <Typography variant='body2'>
                      Max price (per night)
                    </Typography>
                    <InputBase
                      sx={{
                        background: 'white',
                        width: '20%',
                        borderRadius: '5px',
                        px: '5px',
                      }}
                      value={max}
                      type='number'
                      onChange={e => setMax(e.target.value)}
                    />
                  </Box>
                  <OptionItem>
                    <Typography variant='body2'>Adult</Typography>

                    <Box display='flex' alignItems='center'>
                      <IconButton
                        disabled={options?.adult <= 1}
                        onClick={() => onChangeOption('adult', 'd')}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Box component='span' mx={1}>
                        {options.adult}
                      </Box>
                      <IconButton
                        disabled={options.adult >= 9}
                        onClick={() => onChangeOption('adult', 'i')}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </OptionItem>
                  <OptionItem>
                    <Typography variant='body2'>Children</Typography>
                    <Box display='flex' alignItems='center'>
                      <IconButton
                        disabled={options.children <= 0}
                        onClick={() => onChangeOption('children', 'd')}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Box component='span' mx={1}>
                        {options.children}
                      </Box>
                      <IconButton
                        disabled={options.children >= 9}
                        onClick={() => onChangeOption('children', 'i')}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </OptionItem>
                  <OptionItem>
                    <Typography variant='body2'>Room</Typography>
                    <Box display='flex' alignItems='center'>
                      <IconButton
                        disabled={options.room <= 1}
                        onClick={() => onChangeOption('room', 'd')}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Box component='span' mx={1}>
                        {options.room}
                      </Box>
                      <IconButton
                        disabled={options.room >= 9}
                        onClick={() => onChangeOption('room', 'i')}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </OptionItem>
                </Box>
              </Box>
              <Box width='100%'>
                <Button
                  fullWidth
                  variant='contained'
                  size='medium'
                  color='primary'
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8.6}>
            {data?.length === 0 ? (
              <Box
                m='20% 0'
                display='flex'
                flexDirection='column'
                alignItems='center'
              >
                <HandySvg src='/2085169131622471207.svg' />
                <Typography mt={4} variant='h5' color='orangered'>
                  Nothing found...
                </Typography>
              </Box>
            ) : (
              data?.map(hotel => <SearchItem key={hotel._id} hotel={hotel} />)
            )}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default List
