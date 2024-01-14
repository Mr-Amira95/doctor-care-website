import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import pic from '../doctor_care_logo.png';
import {Box} from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function ServicesMainPageCards({height,width,element,imgheight,data}) {
  const navigate = useNavigate()
  const handleClicking =(id,price,total) =>{
    axios.get(`${process.env.REACT_APP_API_URL}${id}/show_details_service`).then(res=>{
      navigate('/ServiceDetails', {state : {details :res.data.data  ,price : price ,total:total}})
    })
  }
  const fallbackImageUrl = pic;

   return (
    <>
    {element && 
    <Card onClick={()=>{handleClicking(element.id,element.price,element.total)}}
    sx={{height:`${height}` , position:'relative',cursor:'pointer',
    bgcolor:'#bcdce5' , width:`${width}`,borderRadius:'10px',padding:'20px 20px 45px 20px'}}>
        <div style={{borderRadius:'10px',boxShadow:'2px 2px 2px 3px rgba(0, 0, 0, 0.2)',
        marginBottom:'5px'}}>
      <CardMedia
        component="img"
        image={`${process.env.REACT_APP_API_URL_IMAGE_SERVICE}${element.images[0]}`}
        sx={{objectFit:"fill",height:`${imgheight}`}}
        onError={(e) => {
          e.target.src = fallbackImageUrl
        }}
      />
         <Box sx={{bgcolor:'white',borderRadius:'50px',paddingRight:'10px',paddingLeft:'10px',
        justifyContent:'center',alignItems:'center',display:'flex',flexWrap:'wrap',
        position:'absolute',top:'2rem'}}>
           {element.total  ? <stack>
        <Typography  sx={{color:'#0a97d1',justifyContent:'center',fontSize:'10px',
        alignItems:'center',display:'flex',flexWrap:'wrap', textDecoration: 'line-through 1px'}}>
          {element.price}
        </Typography>
         <Typography  sx={{color:'#0a97d1',justifyContent:'center',fontSize:'10px',
         alignItems:'center',display:'flex',flexWrap:'wrap'}}>
           {element.total}
         </Typography>
         </stack> : 
         <Typography  sx={{color:'#0a97d1',justifyContent:'center',fontSize:'10px',
       alignItems:'center',display:'flex',flexWrap:'wrap',paddingTop:'5px',paddingBottom:'5px'}}>
          {element.price}
        </Typography> }
        </Box>
      </div>
      <CardContent >
        <Box sx={{ display:'flex',flexWrap:'wrap',justifyContent:'end',alignItems:'end' }}>
        <Typography sx={{fontWeight:'bold',fontSize:'12px'}}>
            {element.title}
        </Typography>
        </Box>
      </CardContent>
    </Card>}
    </>
  );
}