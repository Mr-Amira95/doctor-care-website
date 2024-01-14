import { Container, Link, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import pic from './doctor_care_logo.png';
import { useNavigate } from 'react-router';

export default function Footer({nav}) {
    const matches = useMediaQuery('(min-width:960px)')
    const navigate = useNavigate();

  return (
    <>
    {nav && 
    <div style={{height:matches?'90px':'200px',borderTop:'0.001px solid #9292923D',position:'relative',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
      <div style={{position:"absolute",bottom:'0px',}}>
              <Container sx={{padding:'20px'}} >
      <Stack direction={matches?'row' : 'column'} gap={matches?20:2}>
      {/* <img alt='...loading' src={pic} style={{width:'90px',height:'60px',objectFit:'fill',cursor:'pointer'}} onClick={() => {
                navigate('/');
              }}/> */}
              <Typography sx={{color:'#0a97d1',fontSize:'16px'}}>CopyRight2023, All Rights Reserved</Typography>
              <Link onClick={()=>{navigate('/PrivacyPolicy')}} 
              style={{color:'#0a97d1' ,fontSize:'16px',cursor:'pointer'}}>Privacy Policy</Link>
              <Typography sx={{color:'#0a97d1 ' ,fontSize:'16px'}}>Powered By {" "}
                <Link href='https://smartedge.me' style={{color:'#0a97d1' ,fontSize:'16px'}} >SmartEdge</Link>
              </Typography>
      </Stack>
      </Container>
      </div>
    </div>}
    </>
  )
}
