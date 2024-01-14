import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Typography, useMediaQuery } from '@mui/material';
import pic from '../doctor_care_logo.png'
import { useTranslation } from 'react-i18next';

export default function Sliders({images}) {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
      const [activeStep, setActiveStep] = React.useState(0);
      const maxSteps = images.length;
      const matches = useMediaQuery('(min-width:1300px)');

      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStepChange = (step) => {
        setActiveStep(step);
      };
      const { t  } = useTranslation();
      const fallbackImageUrl = pic;

      return (
    <div id={t('Home')}>
      <Box sx={{ maxWidth: '100%' }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 10,
          pl: 2,
          bgcolor: 'background.default'
        }}
      >
      </Paper>


<AutoPlaySwipeableViews
  index={activeStep}
  onChangeIndex={handleStepChange}
  enableMouseEvents
>
  {images &&
    images.map((step, index) => (
      <div key={step.id}>
        {Math.abs(activeStep - index) <= 2 ? (
          <div style={{ position: 'relative' }}>
            <img
              style={{
                height: 450,
                objectFit: 'contain',
                display: 'block',
                maxWidth: '100%',
                overflow: 'hidden',
                width: '100%',
              }}
              alt="Loading ..."
              src={`${process.env.REACT_APP_API_URL_IMAGE_SLIDERS}${step.images}`}
              onError={(e) => {
                e.target.src = fallbackImageUrl
              }}
            />
            <div
              className="overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></div>
            <Box
              sx={{
                position: 'absolute',
                top: '45%',
                left: '0',
                transform: 'translate(50%,-50%)',
                textAlign: 'left',
                color: 'white',
                p: '1rem',
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontSize: '30px', fontWeight: 'bold', mb: 2 }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: '15px', mb: 2 }}
              >
                {step.description}
              </Typography>
              <Button
                sx={{
                  bgcolor: '#0a97d1',
                  color: 'white',
                  padding: '10px',
                  '&:hover': {
                    color: 'white',
                    bgcolor: '#0a97d1',
                  },
                }}
                href={step.action}
              >
                {t('Request Now')}
              </Button>
            </Box>
          </div>
        ) : null}
      </div>
    ))}
</AutoPlaySwipeableViews>


      <Button sx={{ position:'absolute',
      top:matches?'550px':'500px',left:matches?'20%':'50px',height:'30px',color:'white' }}
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                            <ArrowBackIosIcon />
                        </Button>
                        <Button 
                        sx={{ 
                        position:'absolute',top:matches?'550px':'500px',right:matches?'20%':'50px',color:'white',height:'30px'  }} 
                        size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <ArrowForwardIosIcon />
                        </Button>
    </Box>
    </div>
  )
}
