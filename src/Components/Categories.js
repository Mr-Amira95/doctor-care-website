import React, { useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import CategoryCards from './CategoryCards'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export default function Categories({cat}) {
  const lang = localStorage.getItem('lang')
  const { t  } = useTranslation();
  const[handling,setHandling]=useState(true)

  const handleCat =(e) =>{
    setHandling(false)
  }
  return (
    <div style={{position:'relative',marginTop:'-5px',direction:lang==='ar'?'rtl':'ltr',}} id={t('Categories')}>
      <Box sx={{height:' ' , bgcolor:''}}>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <Typography sx={{fontSize:'25px',padding:'20px',fontWeight:'bold',color:'#0a97d1'}}>
            {t('Categories')}
        </Typography></div>
      </Box>
      {/* <Box sx={{height:'200px' , bgcolor:'white'}}>
        </Box> */}
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
            <Container sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',
            alignItems:'center',gap:'100px' , marginBottom:'40px'}}>
      {handling &&
        <CategoryCards cat={cat.slice(0, 4)}/>
      }
      {!handling &&
        <CategoryCards cat={cat} />
      }
        </Container>
        </div>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',}}>
            <Button sx={{color:'#0a97d1',padding:'10px'}} variant="outlined"
            onClick={(e)=>{handleCat(e)}}>{t('Expand all Categories')}</Button>
        </div>
    </div>
  )
}
