import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Container, Stack, TextField, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router';
import LanguageIcon from '@mui/icons-material/Language';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import { Tooltip, Menu, MenuItem, Button } from '@mui/material';
import pic from './doctor_care_logo.png';
import axios from 'axios';
import LoginDialog from './Components/LoginDialog';
import profile from './6915987.png';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: '#0a97d1',
  height: '100%',
  position: 'absolute',
  right: '0px',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  direction: 'ltr',
  color: 'inherit',
  width: '200px',
  '& .MuiInputBase-input': {
  padding: theme.spacing(2, 2, 2, 2),
  width: '400px',
  paddingRight: `calc(1em + ${theme.spacing(0)})`,
  [theme.breakpoints.up('xs')]: {
  width: '100px',
  fontSize: '12px',
  },
  },
  }));
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '0.001px solid gray',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: useMediaQuery('(min-width:740px)')?'500px':'200px',
  }));

export default function Navbar({nav}) {
  const [searching,setSearching] = React.useState('')
  const [searchingRes,setSearchingRes] = React.useState('')
  const [searchMenu, setSearchMenu] = React.useState(null);
  const [alerting,setAlerting]= React.useState(false)
  const [message,setMessage]=React.useState('')
  const [name,setName]=React.useState('')
  const [langMenu, setLangMenu] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem('token')
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const dir = i18n.dir();
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:740px)');


  const handleEn = () => {
    i18n.changeLanguage('en');
    handleCloseLangMenu();
    localStorage.setItem('lang','en')
    window.location.reload(true)
  };

  const handleAr = () => {
    i18n.changeLanguage('ar');
    handleCloseLangMenu();
    localStorage.setItem('lang','ar')
    window.location.reload(true)
  };

  const handleCloseLangMenu = () => {
    setLangMenu(null);
  };
  const handleSearchLangMenu = () => {
    setSearchMenu(false);
  };

  const getMenuPosition = () => {
    if (dir === 'ltr') {
      return {
        mt: '50px',
        marginLeft: matches?'-25px':'-95px',
        position: 'absolute',
      };
    } else {
      return {
        mt: '50px',
        marginLeft: matches?'20px':'100px',
        position: 'absolute',
      };
    }
  };


  const getsearchMenuPosition = () => {
    if (dir === 'ltr') {
      return {
        mt: matches?'50px':'20px',
        marginLeft: matches?'-435px':'-30px',
        position: 'absolute',
      };
    } else {
      return {
        mt:  matches?'50px':'20px',
        marginLeft: matches?'250px':'10px',
        position: 'absolute',
      };
    }
  };
  let timeout;

  const handleChange = (e) => {
    setSearchMenu(false);
    setSearching(e.target.value);
    setAlerting(false);
  
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (searching !== '') {
        const formData = new FormData();
        formData.append('search', searching);
        axios
          .post('https://doctor-care.smartedge.me/api/search', formData)
          .then((res) => {
            if (res.data.message === 'No services found!') {
              setMessage(res.data.message);
              setSearchMenu(false);
              setAlerting(true);
            } else {
              setSearchingRes(res.data.data);
              setSearchMenu(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, 1000); 
  };

    const handleService =(id) =>{
      setSearchMenu(false)
      axios.get(`${process.env.REACT_APP_API_URL}${id}/show_details_service`).then(res=>{
        navigate('/ServiceDetails', {state : {details :res.data.data}})
      })
    }

    const handleProfile =() =>{
      axios.get(`${process.env.REACT_APP_API_URL}get_profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res=>{
      localStorage.setItem('name',res.data.data.user.name)
      navigate('/DashBoardAddresses')
    })
    }

    if(token){
      axios.get(`${process.env.REACT_APP_API_URL}get_profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }      ).then(res=>{
      setName(res.data.data.user.name)
    })
    }

  return (
    <>
   { nav && <>
   <Box sx={{ flexGrow: 1, '.MuiToolbar-root': { xs: { padding: '0px' , 
  } } }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: 'white',
          color: 'black',
          paddingRight: '20px',
          boxShadow: 'none',
          borderBottom: '0.1px solid #9292923D',
        }}
      >
        <Toolbar>
          <Container sx={{paddingTop:'10px'}}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { sm: 'block', xs: 'none' }, cursor: 'pointer'}}
              onClick={() => {
                navigate('/');
              }}
            >
              <img alt='...loading' src={pic} style={{width:'90px',height:'60px',objectFit:'contain'}}/>
            </Typography>
          </Container>
          <Stack direction={matches?'row':'column'} sx={{ alignItems: 'flex-start' }}>
            <Stack>
          <Search
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase  
            value={searching}
            onChange={(e) => {handleChange(e)}}
            placeholder={t('search for services')}
          />
          </Search>
          <Box>
              <Menu
                sx={getsearchMenuPosition()}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: dir === 'ltr' ? 'right' : 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: dir === 'ltr' ? 'right' : 'left',
                }}
                open={searchMenu}
                onClose={handleSearchLangMenu}
              >
                 {searchingRes && searchingRes.map((res)=>
                <MenuItem>
                <Stack>
                  <Button sx={{ color: 'black' }} onClick={()=>{handleService(res.id)}}>
                   {res.title}
                  </Button>
                  </Stack>
                </MenuItem>)}
              </Menu>
            </Box>

          {alerting &&
          <Alert severity="error">{message}</Alert>}
          </Stack>
          
          <Box >
            <Tooltip>
              <a onClick={() => setLangMenu(!langMenu)}>
                <LanguageIcon sx={{ color: '#0a97d1', padding: '10px',cursor:'pointer',marginLeft:'15px' }} />
              </a>
            </Tooltip>
            <Box>
              <Menu
                sx={getMenuPosition()}
                anchorEl={langMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: dir === 'ltr' ? 'right' : 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: dir === 'ltr' ? 'right' : 'left',
                }}
                open={Boolean(langMenu)}
                onClose={handleCloseLangMenu}
              >
                <MenuItem>
                  <Button sx={{ color: 'black' }} onClick={() => handleEn()}>
                    {t('English')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button sx={{ color: 'black' }} onClick={() => handleAr()}>
                    {t('Arabic')}
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {!token ?
          <LoginIcon sx={{ color: '#0a97d1',cursor:'pointer', padding: '10px' }} onClick={()=>{
            setOpen(true)
          }}/> : 
          <>
          <Stack sx={{cursor:'pointer',marginLeft:'5px'}} direction='row' onClick={handleProfile}>
          <img alt='...loading' src={profile} style={{height:'20px',width:"30px",objectFit:"contain",marginTop:'10px'}}/>
          <Typography sx={{marginTop:'10px'}}>{name}</Typography>
          </Stack>
          {/* <LogoutIcon sx={{ color: '#0a97d1', padding: '10px',cursor:'pointer' }} onClick={handlelogout} /> */}
          </>
          }
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
    <LoginDialog open={open} setOpen={setOpen}/>
    </>}
    </>
  );
}