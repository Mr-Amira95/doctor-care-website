import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PhoneInput from "react-phone-input-2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TextField, InputAdornment, Stack, Typography, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import SignupDialog from './SignupDialog';
import ForgotPassword from './ForgotPassword';

export default function LoginDialog({open, setOpen}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = React.useState(false);
  const matches = useMediaQuery('(min-width:451px)');

  const [alerting,setAlerting] = React.useState(false)
    const [password,setPassword]= React.useState('')
    const [phone_number,setphone]= React.useState('')
    const [openDialog,setOpenDialog]= React.useState(null)
    const [openForgotDialog,setOpenForgotDialog]= React.useState(null)

    const dispatch = useDispatch();
  const {error } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    setAlerting(false)
    setPassword(e.target.value)
  }
  const handleClick = () => {
    if(password && phone_number){
    dispatch(login({
        phone_number: phone_number,
        password: password,
      }))
      .then((result) => {
        if (result.payload.status) {
          setOpen(false)
        } else {
          setAlerting(true);
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong please try again later');
      });}
      else{
        setAlerting(true)
      }
  };

  const handleForgotPassword =() =>{
    setOpenForgotDialog(true)
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleSignup =() =>{
    setOpenDialog(true)
    setOpen(false)
  }

  return (
    <>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="responsive-dialog-title" sx={{color:'#0a97d1',display:'flex',flexWrap:'wrap',
        alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'30px'}}>
        {"Login To Your Account"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color:'#0a97d1'
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{display:'flex',flexWrap:'wrap',padding:'50px',
        alignItems:'center',justifyContent:'center',gap:'50px'}}>
        <Stack gap={2}>

              <PhoneInput
            placeholder=""
            renderStringAsFlag={false}
            name='phone_number'
            country={"sa"}
            enableSearch={true}
            value={phone_number}
            onChange={setphone}
            inputStyle={{
            borderRadius:'100px', border: '1px solid #0a97d1'
           , height: '32px',
            width:matches?'350px':'280px',}}
          />

          <TextField
          required
          name='password'
            autoComplete='new-password'
            label="Password"
            value={password}
            onChange={(e)=>{handleChange(e)}}
            sx={{
              width: matches ? '350px' : '280px',
              border: '1px solid white',
              '& .MuiInputLabel-root': {
                 marginTop:'-6px'
              },
              '& .MuiInputBase-root': {
                borderRadius: '100px',
                border: '1px solid #0a97d1',
                height: '37px',
              },
            }}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment edge='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{color:'#0a97d1'}}>
                    <VisibilityIcon  />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
             <Button  sx={{ color: 'gray' ,display:'flex',flexWrap:'wrap',padding:'10px',
            justifyContent:'end'}} onClick={handleForgotPassword}>
            Forgot Password ?
          </Button>

          <Button  onClick={handleClick} sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1',
           marginTop: '10px', width: matches?'350px':'300px',height:'35px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} }}>
            Login
          </Button>
          <Typography sx={{color:'gray',display:'flex',flexWrap:'wrap',marginTop:'10px',
        alignItems:'center',justifyContent:'center', fontWeight:'bold',fontSize:'16px'}}>
            Don't have an account ?
            <Button sx={{color:'#0a97d1',fontWeight:'bold'}} onClick={handleSignup}
            >Create One</Button>
          </Typography>
          {alerting && <Alert severity="error">
            {!password || !phone_number ? 
          'All fields must be filled' : error
          }
            </Alert>
            }
        </Stack>
      </DialogContent>
    </Dialog>
    <SignupDialog setOpenDialog={setOpenDialog} openDialog={openDialog} />
    <ForgotPassword openForgotDialog={openForgotDialog} setOpenForgotDialog={setOpenForgotDialog} setOpen={setOpen}/>
    </>
  );
}