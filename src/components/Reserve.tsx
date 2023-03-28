import { FC, useState } from 'react'
import { enqueueSnackbar } from 'notistack'

import { useAppSelector } from '../services/hooks'
import {
  useGetRoomInfoQuery,
  useUpdateRoomMutation,
} from '../services/booking.api'
import { IRoomNumber } from '../models'

import {
  Modal,
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Divider,
  Button,
  LinearProgress,
} from '@mui/material'

interface IProps {
  isOpen: boolean
  hotelId?: string
  setModal: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '70%', md: '50%' },
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

const Reserve: FC<IProps> = ({ isOpen, setModal, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])

  const dates = useAppSelector(state => state.search.dates)
  const [updateRoom, {}] = useUpdateRoomMutation()
  const { isLoading, data, refetch } = useGetRoomInfoQuery(`${hotelId}`)

  const getDatesInRange = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const date = new Date(start.getTime())

    const dates = []

    while (date <= end) {
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }

    return dates
  }

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

  const isAvailable = (roomNumber: IRoomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime())
    )
    return !isFound
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked: boolean = e.target.checked
    const value: string = e.target.value
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter(item => item !== value)
    )
  }

  const handleReserve = async () => {
    if (!selectedRooms) {
      enqueueSnackbar(`Please choose room to reserve`, {
        variant: 'warning',
        autoHideDuration: 3000,
        preventDuplicate: true,
      })
    } else {
      selectedRooms.map(roomId => {
        updateRoom({ roomId, dates: allDates })
      })
      refetch()
      setModal()
      enqueueSnackbar(
        `You have booked a ${selectedRooms.length} ${
          selectedRooms.length == 1 ? 'room' : 'rooms'
        } in a hotel for a ${allDates.length} ${
          allDates.length == 1 ? 'night' : 'nights'
        }`,
        {
          variant: 'success',
          autoHideDuration: 7000,
          preventDuplicate: true,
        }
      )
    }
  }

  return (
    <>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Modal open={isOpen} onClose={setModal}>
          <Box sx={style}>
            <Typography component='div' variant='h5'>
              Select your rooms:
            </Typography>
            {data?.map(item => (
              <Box>
                <Box
                  key={item._id}
                  p={1}
                  display='flex'
                  justifyContent='space-between'
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                  >
                    <Typography
                      component='div'
                      fontSize='18px'
                      fontWeight='700'
                    >
                      {item.title}
                    </Typography>
                    <Box>{item.desc}</Box>
                    <Typography
                      component='div'
                      fontSize='14px'
                      fontWeight='700'
                    >
                      Max People: {item.maxPeople}
                    </Typography>
                    <Typography
                      mt={1}
                      component='div'
                      fontWeight='700'
                      fontSize='18px'
                      color='green'
                    >
                      ${item.price}
                    </Typography>
                  </Box>
                  <Box m='0, auto' width='30%'>
                    <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                      {item.roomNumbers.map(roomNumber => (
                        <FormControlLabel
                          key={roomNumber._id}
                          value={roomNumber._id}
                          control={
                            <Checkbox
                              color='secondary'
                              onChange={handleSelect}
                              disabled={!isAvailable(roomNumber)}
                            />
                          }
                          label={roomNumber.number}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
            <Box mt={3}>
              <Button onClick={handleReserve} variant='contained' fullWidth>
                Reserve Now
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default Reserve
