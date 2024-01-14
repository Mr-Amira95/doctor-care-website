import { Box, ImageList, ImageListItem, Stack,Typography,useMediaQuery, Container, Button } from '@mui/material'
import React from 'react'
import ServicesMainPageCards from './ServicesMainPageCards';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import ServicesMainPageMiniCards from './ServicesMainPageMiniCards';

const Products =({product,allproduct}) =>{
    const navigate = useNavigate()
    var element =[];
     element = product.find((item) => item.id === product[0].id);
     const { t  } = useTranslation();

     var data;
     data = product.filter((item) => item.id !== product[0].id);
    const matches = useMediaQuery('(min-width:1000px)');

    const style1 ={
        width : '400px',
        marginTop:'10px'
    }
    const style2 ={
      width : '324px'
    }
    const lang = localStorage.getItem('lang')

    const handleBtn =() =>{
      navigate('/ProductsPage',{state : { allproduct :allproduct }})
    }

    return (
    <div style={{marginBottom:'30px',direction:lang==='ar'?'ltr':'rtl'}} id={t('Products')}>
         <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <Typography sx={{fontSize:'25px',padding:'20px',fontWeight:'bold',color:'#0a97d1'}}>
        {t('Products')}
        </Typography></div>
        <Stack direction={matches ? 'row' : 'column' } gap={matches?2:3}
        sx={{display:matches?'flex':'',flexWrap:matches?'wrap':'',justifyContent:'center',alignItems:'center'}}>
        <Box sx={matches ? style1 : style2 }>
        <ServicesMainPageCards height={'445px'} width={matches ? style1 : style2} element={element}
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
        <Button sx={{color:'#0a97d1',padding:'10px'}} variant="outlined" onClick={()=>{handleBtn()}}
        >{t('Expand all Products')}</Button>
</div>
    </div>
  )
}
export default Products
