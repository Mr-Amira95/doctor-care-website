import * as React from 'react';
import Typography from '@mui/material/Typography';
import pic from '../doctor_care_logo.png'
import { Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router';


export default function CategoryCards({cat, expanded}) {
 const navigate = useNavigate()
 const handleDetails =(id, name) =>{
  axios.get(`${process.env.REACT_APP_API_URL}${id}/all_services`).then(res=>{
    navigate('/CategoryPage' , {state : {id : id , name : name }})
  })
 }
 const fallbackImageUrl = pic;

 return (
    <>
    {!expanded && cat.map((cat)=>
    <Stack direction='column' gap={3} onClick={()=>{handleDetails(cat.id,cat.name)}}
    sx={{cursor:'pointer'}}>
      <img src={`${process.env.REACT_APP_API_URL_IMAGE_CATEGORIES}${cat.images}`}
       alt='...loading' style={{width:'200px',height:'200px',objectFit:'cover'}}
       onError={(e) => {
        e.target.src = fallbackImageUrl
      }}/>
      <Typography sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
        {cat.name}
      </Typography>
    </Stack>
    )}
      {expanded && cat.map((cat)=>
    <Stack direction='column' gap={3} onClick={()=>{handleDetails(cat.id,cat.name)}}
    sx={{cursor:'pointer'}}>
      <img src={`${process.env.REACT_APP_API_URL_IMAGE_CATEGORIES}${cat.images}`} onError={(e) => {
        e.target.src = fallbackImageUrl
      }}
      alt='...loading' style={{width:'200px',height:'200px',objectFit:'contain'}}/>
      <Typography sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
        {cat.name}
      </Typography>
    </Stack>
    )}
    </>
  );
}