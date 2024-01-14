import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import pic from '../doctor_care_logo.png';
import {Box, Container, Stack} from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function ServicesCards({cat}) {
  const navigate = useNavigate()

  const handleClicking =(id,price,total) =>{
    axios.get(`${process.env.REACT_APP_API_URL}${id}/show_details_service`).then(res=>{
      navigate('/ServiceDetails', {state : {details :res.data.data  ,price : price ,total:total}})
    })
  }
  const fallbackImageUrl = pic;

  return (
    <div style={{marginBottom:'100px'}}>
        <Container sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',gap:'20px'}}>
      {cat && cat.map((el)=>
    <Card onClick={()=>{handleClicking(el.id,el.price,el.total)}}
    sx={{height:`200px` , bgcolor:'#bcdce5' , width:`210px`,borderRadius:'10px'
    ,padding:'20px 20px 90px 20px',cursor:'pointer',position:'relative'}}>
        <div style={{padding:'10px',borderRadius:'10px',boxShadow:'2px 2px 2px 3px rgba(0, 0, 0, 0.2)'}}>
      <CardMedia
        component="img"
        image={`${process.env.REACT_APP_API_URL_IMAGE_SERVICE}${el.images[0]}`}
        onError={(e) => {
          e.target.src = fallbackImageUrl
        }}
        sx={{objectFit:"fill",height:`150px`}}
      />
         <Box sx={{bgcolor:'white',borderRadius:'50px',paddingRight:'10px',paddingLeft:'10px',
        justifyContent:'center',alignItems:'center',display:'flex',flexWrap:'wrap',
        position:'absolute',top:'2rem',right:'2rem'}}>
        {el.total  ? <stack>
        <Typography  sx={{color:'#0a97d1',justifyContent:'center',fontSize:'10px',
        alignItems:'center',display:'flex',flexWrap:'wrap', textDecoration: 'line-through 1px'}}>
          {el.price} 
        </Typography>
         <Typography  sx={{color:'#0a97d1',justifyContent:'center',fontSize:'10px',
         alignItems:'center',display:'flex',flexWrap:'wrap'}}>
           {el.total} 
         </Typography>
         </stack> : 
         <Typography  sx={{color:'#0a97d1',justifyContent:'center',fontSize:'10px',
       alignItems:'center',display:'flex',flexWrap:'wrap',paddingTop:'5px',paddingBottom:'5px'}}>
          {el.price} 
        </Typography> }
        </Box>
      </div>
      <CardContent>
        <Typography sx={{fontWeight:'bold',fontSize:'12px'}}>
            {el.title}
        </Typography>
      </CardContent>
    </Card>
    )}
    </Container>
    </div>
  )
}
