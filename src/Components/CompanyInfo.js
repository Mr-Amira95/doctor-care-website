import { Box, Container, Link, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function CompanyInfo({t,matches}) {
  const[about,setAbout]=useState({})
  const lang = localStorage.getItem('lang')

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}about_company`,{ headers: {
      lang: lang ,
    }}).then(res=>{
      setAbout(res.data.data.about_company[0])
    })
  },[])

  const handleMailClick = () => {
    window.open(`mailto:${about.email}`);
  };
  return (
    <div >
      <Stack sx={{display:'flex',flexWrap:'wrap',justifyContent:'end',alignItems:'end',marginTop:matches?'90px':'10px'}} gap={3}>
          <Stack direction='row' gap={1}> 
        <Stack sx={{display:'flex',flexWrap:'wrap',justifyContent:'end',alignItems:'end'}}>
        <Typography sx={{fontSize:'20px',fontWeight:'bold',color:'#0a97d1'}} gap={2}>
          {t('Phone Number')}
        </Typography>
        <Typography sx={{fontSize:'16px',color:'white'}}>
          {about.phone}
        </Typography>
        </Stack>
        <PhoneIcon sx={{bgcolor:'#0a97d1' , color:'white' , borderRadius:'30px',padding:'10px'}}/>
        </Stack>


        <Stack direction='row' gap={1} onClick={handleMailClick} sx={{cursor:'pointer'}}> 
        <Stack sx={{display:'flex',flexWrap:'wrap',justifyContent:'end',alignItems:'end'}}>
        <Typography sx={{fontSize:'20px',fontWeight:'bold',color:'#0a97d1'}}>
          {t('Email')}
        </Typography>
        <Typography sx={{fontSize:'16px',color:'white'}}>
          {about.email}
        </Typography>
        </Stack>
        <a>
        <MailOutlineIcon sx={{bgcolor:'#0a97d1' , color:'white' , borderRadius:'30px',padding:'10px'}}/>
        </a>
        </Stack>


        <Stack direction='row' gap={1}> 
        <Stack sx={{display:'flex',flexWrap:'wrap',justifyContent:'end',alignItems:'end'}}>
        <Typography sx={{fontSize:'20px',fontWeight:'bold',color:'#0a97d1'}}>
          {t('Location')}
        </Typography>
        <Typography sx={{fontSize:'16px',color:'white'}}>
          {about.location}
        </Typography>
        </Stack>
        <LocationOnIcon sx={{bgcolor:'#0a97d1' , color:'white' , borderRadius:'30px',padding:'10px'}}/>
        </Stack>

        {/* <Stack direction='row' gap={1}>  */}
        {/* <Typography sx={{fontSize:'20px',fontWeight:'bold',color:'#0a97d1'}}>
        {t('Instagram')}
        </Typography> */}
        {/* </Stack> */}
        {/* <Typography sx={{fontSize:'16px',color:'white'}}>
          {about.instagram}
        </Typography> */}

        <Box sx={{justifyContent:'end',alignItems:'end',display:'flex',flexWrap:'wrap'}}>
         <Stack direction='row' gap={1}> 
        {/* <Typography sx={{fontSize:'20px',fontWeight:'bold',color:'#0a97d1'}}>
         {t('Facebook')}
        </Typography> */}
        <Link href='https://www.google.com'>
        <InstagramIcon sx={{bgcolor:'#0a97d1' , color:'white' , borderRadius:'30px',padding:'10px', cursor:'pointer'}}/>
        </Link>

        <Link href='https://www.google.com'>
        <FacebookIcon sx={{bgcolor:'#0a97d1' , color:'white' , borderRadius:'30px',padding:'10px', cursor:'pointer'}}/>
        </Link>
        </Stack>
        </Box>
        {/* <Typography sx={{fontSize:'16px',color:'white'}}>
          {about.facebook}
        </Typography> */}
      </Stack>
    </div>
  )
}
