import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'

import { useActions } from '../services/hooks'
import { IOptions, IRangeWithKey } from '../models'

import HotelIcon from '@mui/icons-material/Hotel'
import PersonIcon from '@mui/icons-material/Person'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { InputBase, ButtonBase, styled, Box, Button } from '@mui/material'

import { theme } from '../theme'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const SearchContainer = {
  width: '100%',
  maxWidth: { md: '1024px', xs: '450px' },
  padding: '5px 10px 0',
  margin: '0 auto 20px',
  display: 'flex',
  flexDirection: { md: 'row', xs: 'column' },
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  border: `3px solid ${theme.palette.primary.light}`,
  borderRadius: '5px',
}

const ItemInSearch = {
  display: 'flex',
  alignItems: 'start',
  gap: '10px',
  padding: '10px ',
  width: { xs: '100%', md: 'auto' },
  borderBottom: {
    xs: `2px solid ${theme.palette.primary.light}`,
    md: 'none',
  },
}

const OptionItem = styled(Box)({
  width: '200px',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10px',
})

const OptionCounter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

const OptionCounterButton = styled(ButtonBase)({
  width: '30px',
  height: '30px',
  fontSize: '19px',
  border: '1px solid #3D91FF',
  borderRadius: '5px',
  backgroundColor: 'white',
})

const OptionCounterNumber = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

const Search = () => {
  const navigate = useNavigate()
  const { addSearchInfo } = useActions()
  const [destination, setDestination] = useState('')
  const [openDate, setOpenDate] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [dates, setDates] = useState<IRangeWithKey[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [options, setOptions] = useState<IOptions>({
    adult: 1,
    children: 0,
    room: 1,
  })

  const handleOption = (name: string, operation: string) => {
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

    destination && navigate('/hotels')
  }

  return (
    <Box sx={SearchContainer}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '5px 10px ',
          width: { xs: '100%', md: 'auto' },
          borderBottom: {
            xs: `2px solid ${theme.palette.primary.light}`,
            md: 'none',
          },
        }}
      >
        <HotelIcon color='primary' />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          type='text'
          value={destination}
          placeholder='Where are you going?'
          onChange={e => setDestination(e.target.value)}
        />
      </Box>
      <Box sx={ItemInSearch}>
        <CalendarMonthIcon color='primary' />
        <Box
          onClick={() => setOpenDate(!openDate)}
          sx={{ cursor: 'pointer', color: 'lightgray' }}
        >
          {`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
            dates[0].endDate,
            'MM/dd/yyyy'
          )}`}
        </Box>
        {openDate && (
          <Box
            sx={{
              position: 'absolute',
              top: { xs: '165px', md: '131px' },
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
      <Box sx={ItemInSearch}>
        <PersonIcon color='primary' />
        <Box
          onClick={() => setOpenOptions(!openOptions)}
          sx={{ cursor: 'pointer', color: 'lightgray' }}
        >
          {`${options.adult} adult · ${options.children} children · ${options.room} room`}
        </Box>
        {openOptions && (
          <Box
            sx={{
              position: 'absolute',
              top: { xs: '209px', md: '131px' },
              zIndex: 2,
              backgroundColor: '#EFF2F7',
              color: 'gray',
            }}
          >
            <OptionItem>
              <Box component='span'>Adult</Box>
              <OptionCounter>
                <OptionCounterButton
                  disabled={options.adult <= 1}
                  onClick={() => handleOption('adult', 'd')}
                >
                  -
                </OptionCounterButton>
                <OptionCounterNumber component='span'>
                  {options.adult}
                </OptionCounterNumber>
                <OptionCounterButton
                  disabled={options.adult >= 9}
                  onClick={() => handleOption('adult', 'i')}
                >
                  +
                </OptionCounterButton>
              </OptionCounter>
            </OptionItem>
            <OptionItem>
              <Box component='span'>Children</Box>
              <OptionCounter>
                <OptionCounterButton
                  disabled={options.children <= 0}
                  onClick={() => handleOption('children', 'd')}
                >
                  -
                </OptionCounterButton>
                <OptionCounterNumber component='span'>
                  {options.children}
                </OptionCounterNumber>
                <OptionCounterButton
                  disabled={options.children >= 9}
                  onClick={() => handleOption('children', 'i')}
                >
                  +
                </OptionCounterButton>
              </OptionCounter>
            </OptionItem>
            <OptionItem>
              <Box component='span'>Room</Box>
              <OptionCounter>
                <OptionCounterButton
                  disabled={options.room <= 1}
                  onClick={() => handleOption('room', 'd')}
                >
                  -
                </OptionCounterButton>
                <OptionCounterNumber component='span'>
                  {options.room}
                </OptionCounterNumber>
                <OptionCounterButton
                  disabled={options.room >= 9}
                  onClick={() => handleOption('room', 'i')}
                >
                  +
                </OptionCounterButton>
              </OptionCounter>
            </OptionItem>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: { xs: '100%', md: 'auto' },
          padding: { xs: '10px 0 10px', md: '5px 0 10px' },
        }}
      >
        <Button
          variant='contained'
          fullWidth
          size='medium'
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </Box>
  )
}

export default Search
