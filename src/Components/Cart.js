import * as React from 'react';
import { styled, useTheme  } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import pic from '../doctor_care_logo.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button , Stack, Typography} from '@mui/material';
const drawerWidth = '100%';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Cart({opening,setOpening,details}) {
  const theme = useTheme();
    console.log(details)
  const handleDrawerClose = () => {
    setOpening(false);
  };
  const [count,setCount] = React.useState(0)
  const handleAdd =() =>{setCount(count+1) }
    
  const handleSubtract =() =>{
      if(count <= 0 ){
          setCount(0)}
    else
  { setCount(count-1)}
  } 
  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        anchor="right"
        open={opening}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> :
             <ChevronRightIcon sx={{color:'white',bgcolor:'#0a97d1',borderRadius:'100px'}}/>}
          </IconButton>
        </DrawerHeader>
        <Stack sx={{display:'flex',flexWrap:'wrap',padding:'20px',
        alignItems:'center',justifyContent:'center'}}>
      <img src={pic} alt='...loading' style={{width:'250px',height:'200px',objectFit:'contain'}}/>
      <Stack sx={{display:'flex',flexWrap:'wrap',padding:'20px',
        alignItems:'start',justifyContent:'start'}}>
            <Stack direction='row' gap={1}  sx={{display:'flex',flexWrap:'wrap',padding:'20px'}}>
        <Typography sx={{ fontSize:'16px',fontWeight:'bold' }}>  Product : </Typography>
         <Typography sx={{ fontSize:'16px',color:'gray' }}>
          {details.product.title}
        </Typography>
        </Stack>
      <Stack direction='row' gap={1} sx={{display:'flex',flexWrap:'wrap',padding:'20px'}}>
       <Typography sx={{ fontSize:'16px',fontWeight:'bold' }}>  Description : </Typography>
         <Typography sx={{ fontSize:'16px',color:'gray' }}>
          {details.product.description}
        </Typography>
        </Stack>
        <Stack direction='row' gap={1} sx={{display:'flex',flexWrap:'wrap',padding:'20px'}}>
       <Typography sx={{ fontSize:'16px',fontWeight:'bold' }}>  Price : </Typography>
         <Typography sx={{ fontSize:'16px',color:'gray' }}>
          {details.product.price}
        </Typography>
        </Stack>
        </Stack>
      <Stack direction='row' gap={1} sx={{ display: 'flex', flexWrap: 'wrap',
           alignItems: 'center',justifyContent: 'center',marginTop:'10px'}}>
          <Button sx={{ backgroundColor:"white" }} onClick={handleAdd}>
          <AddIcon sx={{ color:'black' }}/>
          </Button>
          <Typography sx={{ color:'#0a97d1' , fontSize:'16px',fontWeight:'bold' }}>
          {count}
          </Typography>
          <Button sx={{ backgroundColor:"white" }} onClick={handleSubtract}>
          <RemoveIcon sx={{ color:'black' }}/>
          </Button>
          </Stack>
      </Stack>
      </Drawer>
    </Box>
  );
}
