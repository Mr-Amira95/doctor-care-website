import { Button, Stack, Typography } from '@mui/material'
import React,{useState} from 'react'
import { useTranslation } from 'react-i18next';
import LoginDialog from './LoginDialog';
import Cart from './Cart';

export default function ProductSideDetails({details}) {
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = React.useState(false);

  const { t } = useTranslation();
  const handleClick =() =>{
    const token = localStorage.getItem('token')
    if(!token){
      setOpen(true)
    }
    else{    
      setOpening(true)
    }
  }
  return (
    <div style={{marginTop:'30px'}}>
      <Stack sx={{display:'flex',flexWrap:'wrap',alignItems:'start',justifyContent:'start'}} gap={3}>
        {/* <Typography sx={{ fontSize:'18px',fontWeight:'bold' }}>  Product : </Typography> */}
         <Typography sx={{ fontSize:'20px',color:'#0a97d1'}}>
          {details.product.title}
        </Typography>
       {/* <Typography sx={{ fontSize:'18px',fontWeight:'bold' }}>  Description : </Typography> */}
         <Typography sx={{ fontSize:'18px' }}>
          {details.product.description}
        </Typography>
        <Stack direction='row' gap={3}>
       {/* <Typography sx={{ fontSize:'18px',fontWeight:'bold' }}>  Price : </Typography> */}
         <Typography sx={{ fontSize:'18px',textDecoration:details.product.price_after_discount?'line-through 1px':'' }}>
          {details.product.price}
        </Typography>
       {/* <Typography sx={{ fontSize:'18px',fontWeight:'bold' }}>  Price after discount : </Typography> */}
         <Typography sx={{ fontSize:'18px' }}>
          {details.product.price_after_discount}
        </Typography>
        </Stack>
        <Button onClick={()=>{handleClick()}}
        sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1', marginTop: '50px', width: '300px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} }}>
            {t('Add To Cart')}</Button>
      </Stack>
      <LoginDialog open={open} setOpen={setOpen}/>
      <Cart opening={opening} setOpening={setOpening} details={details}/>
    </div>
  )
}
