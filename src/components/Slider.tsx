import { FC } from 'react'
import Carousel from 'react-material-ui-carousel'

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { Modal, Box } from '@mui/material'

interface IProps {
  slides: string[] | undefined
  isOpen: boolean
  setSlider: () => void
}

const Slider: FC<IProps> = ({ slides, isOpen, setSlider }) => {
  return (
    <Modal open={isOpen} onClose={setSlider}>
      <Carousel
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '100%', md: '120vh' },
        }}
        navButtonsAlwaysVisible
        duration={400}
        autoPlay={false}
        IndicatorIcon={slides?.map(ico => (
          <img style={{ margin: '0 5px' }} height={30} src={`${ico}`} />
        ))}
        fullHeightHover={false}
        navButtonsProps={{
          style: {
            fontSize: '50px',
            color: 'white',
          },
        }}
        NextIcon={<ArrowCircleRightIcon sx={{ fontSize: '35px' }} />}
        PrevIcon={<ArrowCircleLeftIcon sx={{ fontSize: '35px' }} />}
      >
        {slides?.map((slide, i) => (
          <Box
            sx={{ width: '100%', height: '100%' }}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <img key={i} height='auto' width='100%' src={`${slide}`} />
          </Box>
        ))}
      </Carousel>
    </Modal>
  )
}

export default Slider
