import { Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import pic from '../doctor_care_logo.png';

export default function ServicesImageList({images}) {
    const matches = useMediaQuery('(min-width:482px)');
    const fallbackImageUrl = pic;
    const newArray = images.slice(1);
    return (
    <div >
      <Stack gap={2}>
        {/* src=images[0] */}
        <img src={`${process.env.REACT_APP_API_URL_IMAGE_SERVICE}${images[0]}`} 
         onError={(e) => {
          e.target.src = fallbackImageUrl
        }}alt='...loadding' style={{width:matches?'420px':'',height:'250px',objectFit:'contain'}}/>
        <Stack direction='row' gap={1}>
            {/* {images.shift().map((im)=>)} */}
            {newArray.map((n)=>
            <img src={`${process.env.REACT_APP_API_URL_IMAGE_PRODUCTS}${n}`} 
            onError={(e) => {
             e.target.src = fallbackImageUrl
           }}alt='...loadding' style={{width:matches?'100px':'50px',height:'175px',objectFit:'contain'}}/>
            )}
        </Stack>
      </Stack>
    </div>
  )
}
