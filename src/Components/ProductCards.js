import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import pic from '../doctor_care_logo.png';
import {Box, Container, Stack} from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function ProductsCards({product}) {
  const navigate = useNavigate()
  const handleClicking =(id) =>{
    axios.get(`${process.env.REACT_APP_API_URL}product/${id}`).then(res=>{
      navigate('/ProductsDetails', {state : {details :res.data.data}})
    })
  }
  const fallbackImageUrl = pic;

  return (
    <div style={{marginBottom:'100px'}}>
        <Container sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',gap:'20px'}}>
      {product && product.map((el)=>
    <Card onClick={()=>{handleClicking(el.id)}}
    sx={{height:`150px` , bgcolor:'#bcdce5' ,
     width:`200px`,borderRadius:'10px',padding:'20px 20px 90px 20px',cursor:'pointer',position:"relative"}}>
        <div style={{padding:'10px',borderRadius:'10px',boxShadow:'2px 2px 2px 3px rgba(0, 0, 0, 0.2)'}}>
      <CardMedia
        component="img"
        image={`${process.env.REACT_APP_API_URL_IMAGE_PRODUCTS}${el.images[0]}`}
        sx={{objectFit:"contain",height:`150px`}}
        onError={(e) => {
          e.target.src = fallbackImageUrl
        }}
      />
          <Box sx={{bgcolor:'white',borderRadius:'50px',paddingRight:'10px',paddingLeft:'10px',
        justifyContent:'center',alignItems:'center',display:'flex',flexWrap:'wrap',
        position:'absolute',top:'2rem',right:'2rem'}}>
          {el.price_after_discount  ? <stack>
        <Typography  sx={{color:'#0a97d1',justifyContent:'center',fontSize:'10px',
        alignItems:'center',display:'flex',flexWrap:'wrap', textDecoration: 'line-through 1px'}}>
          {el.price}
        </Typography>
         <Typography  sx={{color:'#0a97d1',justifyContent:'center',fontSize:'10px',
         alignItems:'center',display:'flex',flexWrap:'wrap'}}>
           {el.price_after_discount}
         </Typography></stack> :  <Typography  sx={{color:'#0a97d1',justifyContent:'center',fontSize:'10px',
       alignItems:'center',display:'flex',flexWrap:'wrap',paddingTop:'5px',paddingBottom:'5px'}}>
          {el.price}
        </Typography>}
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
