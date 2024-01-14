import { Container, Stack, Typography, Grid , TextField, Button, Alert } from '@mui/material';
import React, { useState } from 'react'
import { useLocation } from 'react-router';
import pic from '../doctor_care_logo.png';
import AdressesCards from '../Components/AdressesCards';
import axios from 'axios';

export default function Checkout({setNav}) {
    const[code,setCode] = useState('')
    const location = useLocation();
    const [taxes,setTaxes] =useState(false)
    const [finalTotal,setFinalTotal]=useState('')
    const [numdiscount,setNumDiscount]=useState('')
    const [percentagediscount,setPercentageDiscount]=useState(10)
    const [finaldiscount,setFinalDiscount] = useState('')
    const [alerting,setAlerting] = useState(false)
    const { state } = location;
    const { arr, details, price , total, p } = state;
    const token = localStorage.getItem('token')
    console.log(price , total, p)
    React.useEffect(()=>{
      setNav(true)
      window.scrollTo(0,0)
      axios.get(`${process.env.REACT_APP_API_URL}address/all_address`,{headers :{
        Authorization: `Bearer ${token}`
      }}).then(res=>{
        if(res.data.data.user_country === 'arabia'){
          setTaxes(true)
        }
      })

      if(price){
        if(!taxes){
          setFinalTotal(price + (price *(16/100) - 0))
        }
        else{
          setFinalTotal(price - 0)
        }
      }
      if(total){
      if(!taxes){
        setFinalTotal(total + (total *(16/100) - 0))
      }
      else{
        setFinalTotal(total - 0)
      }
    }
    if(p !== 0){
      if(!taxes){
        setFinalTotal(p + (p *(16/100) - 0))
      }
      else{
        setFinalTotal(p - 0)
      }
    }

    
  },[])

    
    const handleCode = () => {
      if (code) {
        const formData = new FormData();
        formData.append('code', code);
        formData.append('service_id', details.services.id);
        try {
          axios.post(`${process.env.REACT_APP_API_URL}check_copoun`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            if(res.data.data.type==='number'){
              setNumDiscount(res.data.data.value)
            if(price !== 'based on period'){
              if(!taxes){
                setFinalTotal(price + (price *(16/100) - (price - res.data.data.value)))
              }
              else{
                setFinalTotal(price - (price - res.data.data.value))
              }
            setFinalDiscount(price - res.data.data.value)}
          if(total !== 'based on period'){
            if(!taxes){
              setFinalTotal(total + (total *(16/100) - (total - res.data.data.value)))
            }
            else{
              setFinalTotal(total - (total - res.data.data.value))
            }
            setFinalDiscount(total - res.data.data.value)}
          if(p !== 0){
            if(!taxes){
              setFinalTotal(p + (p *(16/100) - (p - res.data.data.value)))
            }
            else{
              setFinalTotal(p - (p - res.data.data.value))
            }
            setFinalDiscount(p - res.data.data.value)}
          }
            if(res.data.data.type==='percentage'){
              setPercentageDiscount(res.data.data.value)
              if(price !=='based on period'){
                if(!taxes){
                  setFinalTotal(price + (price *(16/100)) - (price - (price - res.data.data.value)/ 100))
                }
                else{
                  setFinalTotal(price - (price - (price - res.data.data.value)/ 100))
                }
                setFinalDiscount(price - ((price * res.data.data.value )/ 100))}
              if(total !== 'based on period'){
                if(!taxes){
                  setFinalTotal(total + (total *(16/100)) - (total - (total - res.data.data.value)/ 100))
                }
                else{
                  setFinalTotal(total - (total - (total - res.data.data.value)/ 100))
                }
                setFinalDiscount(total - ((total * res.data.data.value) / 100))}
              if(p !== 0){
                if(!taxes){
                  setFinalTotal(p + (p *(16/100)) - (p - (p - res.data.data.value)/ 100))
                }
                else{
                  setFinalTotal(p - (p - (p - res.data.data.value)/ 100))
                }
                setFinalDiscount(p - ((p * res.data.data.value) / 100))}
            }
          })
          .catch(error => {
            if (error.response.data.message === 'tr.Coupon not found or not valid for this date') {
              setAlerting(true);
            } 
          });
        } catch (error) {
          setAlerting(true);
        }
      }
    };
    const fallbackImageUrl = pic;
    return (
    <div>
        <Container>
      <Stack sx={{padding:'20px'}}>
        <Typography sx={{fontSize:'25px',color:'#0a97d1',fontWeight:'bold'}}>
            Service Details
        </Typography>
        <Stack direction='row' sx={{marginTop:'20px'}} gap={3}>
            <img src={`${process.env.REACT_APP_API_URL_IMAGE_SERVICE}${details.services.images[0]}`} 
         onError={(e) => {
          e.target.src = fallbackImageUrl
        }} alt='...loading' style={{width:'100px',height:'100px',objectFit:'contain',borderRadius:'20px'}}/>
            <Stack>
                {arr.map((arr)=>
                <Typography sx={{color:'gray',fontSize:'16px'}}>
                    Description : {arr.description} <br />
                    Period : {arr.period} <br />
                    Start Date : {arr.startDate}<bt/>
                    {total ? <>
       <Typography sx={{textDecoration: 'line-through 1px',fontSize:'16px'}}>
       parice : {price} 
     </Typography>
     <Typography sx={{fontSize:'16px'}}>
     total : {total} 
      </Typography>
      </> :
      <Typography sx={{fontSize:'16px'}}>
        {price} 
      </Typography>}
                    {arr.forMe === 1 ? <Typography sx={{color:'gray',fontSize:'16px'}}>
                        For My Own</Typography> : <Typography sx={{color:'gray',fontSize:'16px'}}>
                        Patient Name : {arr.pname} <br />
                        Patient Age : {arr.page} <br />
                        Patient Gender : {arr.pGender} 
                        </Typography>}
                </Typography>
                )}
            </Stack>
        </Stack>
        <Typography sx={{fontSize:'25px',color:'#0a97d1',fontWeight:'bold',marginTop:'60px'}}>
            Promo Code
        </Typography>
        <Grid>
            <TextField
              label='PromoCode'
              value={code}
              onChange={(e) => { setCode(e.target.value);setAlerting(false) }}
              sx={{ width: '300px', border: '1px solid white',marginTop:'20px','.MuiInputBase-root':{      
                borderRadius:'100px',border:'1px solid #0a97d1'
         }}}
            />
            <Button sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1', marginTop: '25px',marginLeft:'20px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} }}
        onClick={handleCode}>Apply</Button>
          </Grid>
         {alerting && <Alert severity='error' sx={{  width: '350px',marginTop:'10px' }}
         >Coupon not found or not valid for this date</Alert>}
          <Typography sx={{fontSize:'25px',color:'#0a97d1',fontWeight:'bold',marginTop:'60px'}}>
            Addresses
        </Typography>
        <AdressesCards />

        <Typography sx={{fontSize:'25px',color:'#0a97d1',fontWeight:'bold',marginTop:'60px'}}>
            Payment Details
        </Typography>
        <Stack>
        <Stack direction='row' gap={5} sx={{marginTop:'20px'}}>
        <Typography sx={{fontSize:'16px'}}>
            SubTotal
         </Typography>         
         <Typography sx={{fontSize:'16px'}}>
          {p !== 0 ? p :
            total ? total : price}
         </Typography>
        </Stack>

        <Stack direction='row' gap={9.6} sx={{marginTop:'5px'}}>
        <Typography sx={{fontSize:'16px'}}>
            Tax
         </Typography>        
         {taxes ?
         <Typography sx={{fontSize:'16px'}}>
            0 SAR
         </Typography> :
          <Typography sx={{fontSize:'16px'}}>
            {total !== 'based on period' ? total * (16 / 100) : price !== 'based on period' ? price * (16 / 100) : p * (16 / 100)}
          </Typography>}
        </Stack>
        <Stack direction='row' gap={5} sx={{marginTop:'5px'}}>
        <Typography sx={{fontSize:'16px'}}>
            Discount
         </Typography>         
         <Typography sx={{fontSize:'16px'}}>
            {!code ? 0 : finaldiscount }
         </Typography>
        </Stack>

        <Stack direction='row' gap={7.6} sx={{marginTop:'20px'}}>
        <Typography sx={{fontSize:'18px',fontWeight:'bold'}}>
           Total
         </Typography>         
         <Typography sx={{fontSize:'18px',fontWeight:'bold'}}>
         {/* {p ? p + (p * (16 / 100)) - finaldiscount :
            total ? total + (total * (16 / 100)) - finaldiscount : price + (price * (16 / 100)) - finaldiscount } */}
            {finalTotal}
         </Typography>
        </Stack>
        </Stack>

        <Button 
        sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1', marginTop: '20px', width: '280px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} }}>
        Proceeed</Button>
      </Stack>
      </Container>
    </div>
  )
}
