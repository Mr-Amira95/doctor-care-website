import { Dialog, DialogTitle, Stack, DialogContent, Button,TextField, Alert, InputAdornment } from '@mui/material'
import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PhoneInput from "react-phone-input-2";
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ForgotPassword({openForgotDialog,setOpenForgotDialog,setOpen}) {
  const [phone_number,setphone]= React.useState('')
  const [show,setShow] =React.useState(true)
  const [otp,setOtp]= React.useState('')
  const [newPassword,setNewPassword]= React.useState('')
  const [alerting,setAlerting] = React.useState(false)
  const [secondalerting,setSecondAlerting] = React.useState(false)
  const [secondShow , setSecondShow] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false);

  const matches = useMediaQuery('(min-width:451px)');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
      setOpenForgotDialog(false);
      };

      const handleClick =() =>{
        if(phone_number){
          setAlerting(false)
          const formData = new FormData();
          formData.append('phone_number', phone_number);
        axios.post(`${process.env.REACT_APP_API_URL}generate_code/reset`,formData).then(res =>{
            if(res.data.status === true){
              setShow(false)
            }
            else{
                setSecondAlerting(true)
            }
        })
      }
      else{
        setAlerting(true)
      }
      }

      const handleClickOtp =() =>{
        if(otp){
          setAlerting(false)
          const formData = new FormData();
          formData.append('phone_number', phone_number);
          formData.append('otp', otp);
          axios.post(`${process.env.REACT_APP_API_URL}verify-code`,formData).then(res =>{
            if(res.data.message === 'OTP verified successfully'){
              setSecondShow(true)
            }
        })
        }
        else{
          setAlerting(true)
        }
      }

      const handleReset=() =>{
        if(newPassword){
          setAlerting(false)
          const formData = new FormData();
          formData.append('phone_number', phone_number);
          formData.append('password', newPassword);
          axios.post(`${process.env.REACT_APP_API_URL}reset-password`,formData).then(res =>{
          handleClose()
          setOpen(true)
        })
        }
        else{
          setAlerting(true)
        }
      }
  return (
    <div>
       <Dialog
      fullScreen={fullScreen}
      open={openForgotDialog}
      onClose={handleClose}
    >
        <DialogTitle id="responsive-dialog-title" sx={{color:'#0a97d1',display:'flex',flexWrap:'wrap',
        alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'30px'}}>
        {"Forget Password"}
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
       { show && !secondShow &&<><Stack gap={2}>

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
</Stack>
{alerting && <Alert severity='error'>fields must be filled</Alert>}
{secondalerting && <Alert severity='error'>Phone Number Not Correct</Alert>}

<Button  onClick={handleClick} sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1',
           marginTop: '10px', width: matches?'350px':'300px',height:'35px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} }}>
            Next
          </Button></>}
          {!show && !secondShow &&  <>
          <TextField  
        label="Verification Code"
        value={otp} onChange={(e)=>{setOtp(e.target.value);setAlerting(false)}} 
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
        }}/>
        {alerting && <Alert severity='error'>fields must be filled</Alert>}
      <Button  onClick={handleClickOtp} sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1',
           marginTop: '10px', width: matches?'350px':'300px',height:'35px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} }}>
            Next
          </Button>
          </>}
{secondShow && <>
          <TextField  
        label="New Password"
        value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} 
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{color:'#0a97d1'}}>
                <VisibilityIcon  />
              </IconButton>
            </InputAdornment>
          ),
        }}        sx={{
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
        }}/>
        {alerting && <Alert severity='error'>fields must be filled</Alert>}
      <Button  onClick={handleReset} sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1',
           marginTop: '10px', width: matches?'350px':'300px',height:'35px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} }}>
            Reset
          </Button>
          </> }
</DialogContent>
    </Dialog>
    </div>
  )
}
