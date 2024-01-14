import React, { useEffect, useState } from 'react'
import pic from '../doctor_care_logo.png'
import { Typography } from '@mui/material'
import axios from 'axios'
import LoadingPage from '../Components/LoadingPage'

export default function PrivacyPolicy({setNav}) {
  const[privacy,setPrivacy]=useState()
  const lang = localStorage.getItem('lang')
  const [open, setOpen] = React.useState(true);

  useEffect(()=>{
    setNav(true)
    axios.get(`${process.env.REACT_APP_API_URL}privacy_policy`,{ headers: {
      lang: lang ,
    }}).then(res=>{
      setPrivacy(res.data.data.privacy_policy)
      setOpen(false)
    })
      window.scrollTo(0,0)
  },[])
  return (
    <div>
              <img
                        style={{
                            height: 400,
                            objectFit: 'fit',
                            display: 'block',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        alt='Loading ...'
                        src={pic}
                    />
                   <div style={{position:'absolute',top:'78px',width:'100%',backgroundColor:'rgba(0, 0, 0, 0.5)',height:400}}>
                    </div>
                    {open && <LoadingPage open={open}/>}
                    {!open &&
                    <>
                    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
                    <Typography sx={{color:'white',position:'absolute',top:'200px',fontWeight:'bold',fontSize:'40px'}}>Privacy Policy</Typography>
                    </div>
                    <div style={{marginTop:'50px',display:'flex',flexWrap:'wrap',marginBottom:'30px'
                    ,justifyContent:'center',alignItems:'center'}}>
                      <Typography sx={{fontSize:'20px'}}>
                        {privacy}
                      </Typography>
                    </div></>}
    </div>
  )
}
