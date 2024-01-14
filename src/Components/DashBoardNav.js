import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import pic from '../doctor_care_logo.png';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const drawerWidth = 240;

export default function DashBoardNav() {
    const navigate = useNavigate()
    const name = localStorage.getItem('name')

    const handleAddresses=() =>{
      navigate('/DashBoardAddresses')
      window.location.reload(true)
    }

    const handleHistory =() =>{
        navigate('/DashBoardService')
        window.location.reload(true)
     }

     const handleSupport =() =>{
      navigate('/DashBoardSupport')
      window.location.reload(true)
     }
     
     const handleProfile =() =>{
      navigate('/DashBoardProfile')
      window.location.reload(true)
     }

     const handleProductHistory =() =>{
      navigate('/DashBoardProduct')
      window.location.reload(true)
     }

      const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logout())
    navigate('/')
    }

  return (
    <Box sx={{ display: 'flex' }}>
        
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px` , bgcolor:'white',color:'#0a97d1' }}
      >
        <Toolbar>
          <Typography noWrap component="div" sx={{fontSize:'20px'}}>
            Welcome, {name} !
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{ flexShrink: 0,
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <img src={pic} onClick={()=>{navigate('/')}}
        alt='...loading' style={{width:'110px',height:'30px',objectFit:'contain',padding:'30px',cursor:'pointer'}} />
        </div>
        {/* <Toolbar /> */}
        <List>
            <ListItem disablePadding onClick={handleAddresses}>
              <ListItemButton>
                <ListItemIcon sx={{color:'#0a97d1'}}>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText sx={{fontSize:'16px'}} >Addresses</ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={handleHistory}>
              <ListItemButton>
                <ListItemIcon sx={{color:'#0a97d1'}}>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText sx={{fontSize:'16px'}} >Services History</ListItemText>
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding onClick={handleProductHistory}>
              <ListItemButton>
                <ListItemIcon sx={{color:'#0a97d1'}}>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText sx={{fontSize:'16px'}} >Products History</ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={handleSupport}>
              <ListItemButton>
                <ListItemIcon sx={{color:'#0a97d1'}}>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText sx={{fontSize:'16px'}} >Support</ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={handleProfile}>
              <ListItemButton>
                <ListItemIcon sx={{color:'#0a97d1'}}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText sx={{fontSize:'16px'}} >Profile</ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={handlelogout}>
              <ListItemButton>
                <ListItemIcon sx={{color:'#0a97d1'}}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText sx={{fontSize:'16px'}} >Logout</ListItemText>
              </ListItemButton>
            </ListItem>
        </List>
        <Box
        sx={{position:'absolute',top:'93%',left:'15px'}}>
         <Typography sx={{fontSize:'12px'}}>Powered By {" "}
                <Link href='https://smartedge.me' style={{fontSize:'12px',color:'black'}} >SmartEdge</Link>
              </Typography>
       </Box>
       </Drawer>
       </Box>
  );
}
