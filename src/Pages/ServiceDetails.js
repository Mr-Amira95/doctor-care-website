import { useMediaQuery, Stack } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router';
import ServiceSideDetails from '../Components/ServiceSideDetails';
import Reviews from '../Components/Reviews';
import ServicesImageList from '../Components/ServicesImageList';

export default function ServiceDetails({setNav}) {
    const matches = useMediaQuery('(min-width:1100px)');
    const lang = localStorage.getItem('lang')
    React.useEffect(()=>{
      setNav(true)
      window.scrollTo(0,0)
    },[])
    const location = useLocation();
    const { state } = location;
    const { details,price,total } = state;
  return (
    <div style={{overflowX: 'hidden',}}>
      <Stack direction={matches?'row':'column'} gap={15}>
        <div style={{backgroundColor:matches ?'#bcdce5':'',
        borderRadius:lang === 'en' ?'0px 50px 50px 0px' : '50px 0px 0px 50px',padding:'10px'}}>
        <ServicesImageList images={details.services.images}/>
        </div>
        <ServiceSideDetails details={details} price={price} total={total} /> 
      </Stack>
      <div style={{marginBottom:details.reviews_count > 5 ? '0px' :'50px'}}></div>
      {details.reviews_count > 5 &&
      <Reviews details={details}/>
      }

    </div>
  )
}
