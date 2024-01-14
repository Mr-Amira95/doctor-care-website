import React from 'react'
import { Typography, Stack, Box, Grid, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import pic from '../doctor_care_logo.png';
import DashAddress from './DashAddress';
import DashBoardNav from './DashBoardNav';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
export default function DashProductDetails({details}) {
    const windowHeight = React.useRef(window.innerHeight);
    const matches = useMediaQuery('(min-width:940px)');
    const formatDate = (dateTimeString) => {
      const dateObj = new Date(dateTimeString);
      const date = dateObj.toLocaleDateString();
      const time = dateObj.toLocaleTimeString();
      return { date, time };
    };
    const fallbackImageUrl = pic;
  return (
    <>
    <DashBoardNav />
    <div style={{ backgroundColor: matches?'#D3D3D370':'', height: windowHeight.current, width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: matches?'center':'', justifyContent: matches?'center':'' }}>
        <Box sx={{ bgcolor: 'white', position: 'absolute', bottom: '0px',overflowY: 'scroll',
        width:'55%', height: '33rem', padding: '50px',right:'9rem' }}>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{'.MuiPaper-root':{boxShadow:'none',textAlign:'left'}}}>
          <Item>
            <Stack gap={0.5}>
              <Typography sx={{color:'#0a97d1',fontWeight:'bold'}}> 
                Order ID
              </Typography>
              <Typography sx={{color:'gray'}}>
                {details.order_id}
              </Typography>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={4} sx={{'.MuiPaper-root':{boxShadow:'none',textAlign:'left'}}}>
          <Item>
          <Stack gap={0.5}>
              <Typography sx={{color:'#0a97d1',fontWeight:'bold',fontSize:'15px'}}> 
                Status
              </Typography>
              <Typography sx={{color:'gray'}}>
                {details.status}
              </Typography>
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={4} sx={{'.MuiPaper-root':{boxShadow:'none',textAlign:'left'}}}>
          <Item>
          <Stack gap={0.5}>
              <Typography sx={{color:'#0a97d1',fontWeight:'bold',fontSize:'15px'}}> 
                Request Date & Time
              </Typography>
              <Typography sx={{color:'gray'}}>
              {formatDate(details.created_at).time} {formatDate(details.created_at).date}
              </Typography>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </Box>

    <Typography sx={{color:'#0a97d1',fontWeight:'bold',fontSize:'18px',marginTop:'30px'}}>
      Service Details
    </Typography>
    {details.order_products && details.order_products.map((d) => <>
    <Stack direction='row' gap={2} >
      <img src={`${process.env.REACT_APP_API_URL_IMAGE_PRODUCTS}${details.order_products.image}`} 
         onError={(e) => {
          e.target.src = fallbackImageUrl
        }} alt="...loading"  style={{width:'80px',height:'60px',objectFit:'contain'}}/>
      
              <Stack sx={{padding:'5px'}}>
       <Typography sx={{color:'#0a97d1',fontSize:'15px'}}>  Title </Typography>
       <Typography sx={{fontSize:'15px',color:'gray'}}> {d.product_title&&d.product_title}</Typography>
      </Stack>
      <Box sx={{marginLeft:'6.5rem',marginTop:'28px',fontSize:'15px',color:'gray'}}>
       {/* <Typography sx={{color:'#0a97d1'}}> Patient Name </Typography> */}
      {d.quantity && d.quantity}
      </Box>
      <Box sx={{marginLeft:'6.5rem',marginTop:'28px',fontSize:'15px',color:'gray'}}>
      {/* <Typography sx={{color:'#0a97d1'}}> Patient age </Typography> */}
      { d.price && d.price}
      </Box>
      {/*  */}
      {/* <Box sx={{marginLeft:'6.5rem',marginTop:'28px',fontSize:'15px',color:'gray'}}> */}
      {/* <Typography sx={{color:'#0a97d1'}}> price </Typography> */}
       {/* {details.discount} */}
      {/* </Box> */}
     
    </Stack>
    </>)}
    <Typography sx={{color:'#0a97d1',fontWeight:'bold',fontSize:'18px',marginTop:'30px'}}>
      Address Details
    </Typography>

    <DashAddress address={details.address} />

    <Typography sx={{color:'#0a97d1',fontWeight:'bold',fontSize:'18px',marginTop:'30px'}}>
      Payment Details
    </Typography>
    <Grid container spacing={2}>
    <Grid item xs={5} sx={{'.MuiPaper-root':{boxShadow:'none',textAlign:'left'}}}>
          <Item>
            <Stack gap={0.5}>
         {/* { details.service.price ? <Typography sx={{fontSize:'15px',color:'black'}}>
          subtotal 
          </Typography> : null}
          {details.discount ?
          <Typography sx={{fontSize:'15px',color:'black'}}>
          Tax 
          </Typography>  :null }        */}
         {details.total_price ? <Typography sx={{fontWeight:'bold',fontSize:'15px',color:'black'}}>
            total
          </Typography> :null}
            </Stack>
          </Item>
          </Grid>

        <Grid item xs={5} sx={{'.MuiPaper-root':{boxShadow:'none',textAlign:'right'}}}>
          <Item>
            <Stack gap={0.5}>
            {/* { details.service.price ? <Typography sx={{fontSize:'15px',color:'black'}}>
            {details.service.price }
          </Typography> :null}
          {details.discount ? <Typography sx={{fontSize:'15px',color:'black'}}>
          {details.discount} 
          </Typography> : null  }        */}
         {details.total_price ? <Typography sx={{fontWeight:'bold',fontSize:'15px',color:'black'}}>
            {details.total_price}
          </Typography> : null }
            </Stack>
          </Item>
        </Grid>
        </Grid>

        {/* <Typography sx={{color:'#0a97d1',fontWeight:'bold',fontSize:'18px',marginTop:'30px'}}>
      Rating
    </Typography> */}
    </Box>
    </div>
    </>
  )
}
