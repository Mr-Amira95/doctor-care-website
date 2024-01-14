import { Box, ImageList, ImageListItem, Stack,Typography,useMediaQuery, Container, Button } from '@mui/material'
import React from 'react'
import ServicesMainPageCards from './ServicesMainPageCards';
import { useTranslation } from 'react-i18next';
import ServicesMainPageMiniCards from './ServicesMainPageMiniCards';

const Services =({services}) =>{
  const { t  } = useTranslation();
  
  var element =[];
     element = services.find((item) => item.id === services[0].id)

     var data;
     data = services.filter((item) => item.id !== services[0].id)

     const matches = useMediaQuery('(min-width:1000px)');
    const style1 ={
        width : '400px',
        marginBottom:'5px',  
    }
    const style2 ={
        width : '324px'
    }
    const lang = localStorage.getItem('lang')

  return (
    <div style={{marginBottom:'30px',direction:lang==='ar'?'ltr':'rtl'}} id={t('Features Services')}>
         <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <Typography sx={{fontSize:'25px',padding:'20px',fontWeight:'bold',color:'#0a97d1'}}>
            {t('Services')}
        </Typography></div>
        <Stack direction={matches ? 'row' : 'column' } gap={matches?2:3}
        sx={{display:matches?'flex':'',flexWrap:matches?'wrap':'',justifyContent:'center',alignItems:'center'}}>
        <Box sx={matches ? style1 : style2 }>
        <ServicesMainPageCards height={'450px'} width={matches ? style1 : style2} element={element}
        imgheight={'350px'}/>
        </Box>
        <ImageList cols={matches?2:1} gap={15} sx={{padding:'10px'}}>
        {data && data.map((el)=>
                <ImageListItem >
               <ServicesMainPageMiniCards height={'140px'} width={'200px'} el={el} imgheight={'130px'}/>
                </ImageListItem>
        )}
                </ImageList>   
        </Stack>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',marginTop:'30px'}}>
</div>
    </div>
  )
}
export default Services
