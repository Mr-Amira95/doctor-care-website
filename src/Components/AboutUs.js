import React from 'react'
import pic from '../doctor_care_logo.png';
import { Typography, Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function AboutUs({about}) {
    const lang = localStorage.getItem('lang')
    const { t  } = useTranslation();
    const fallbackImageUrl = pic;
    return (
    <div style={{marginTop:'70px', direction:lang==='ar'?'rtl':'ltr'}} id={t('About Us')} >
       <div style={{position:'relative',
                           }}>
                <img
                        style={{
                            height: 400,
                            objectFit: 'contain',
                            display: 'block',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        alt='Loading ...'
                        src={`${process.env.REACT_APP_API_URL_IMAGE_ABOUT_US}${about.images}`}
                        onError={(e) => {
                          e.target.src = fallbackImageUrl
                        }}/>
                   <div className="overlay">
                    </div>

                    <Box sx={{position:'absolute',left:'50px',top:'100px'}}>
                    <Container>
                        <Typography sx={{color:'white',fontSize:'30px',fontWeight:'bold'}}>
                          {about.title}</Typography>
                          <br/>
                          <Typography sx={{color:'white',fontSize:'15px'}}>
                          {about.description}</Typography>
                          </Container>
                      </Box>
                    </div>
    </div>
  )
}
