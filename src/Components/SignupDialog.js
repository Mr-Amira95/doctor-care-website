import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Stack, useMediaQuery, TextField, Box, Alert ,Grid, MenuItem, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

export default function SignupDialog({openDialog, setOpenDialog}) {
  const [first,setFirst] = React.useState(false)
  const [second,setSecond] = React.useState(false)
  const [show,setShow] = React.useState(true)
  const [showbtn,setShowbtn] = React.useState(true)
  const [phone_number,setphone]= React.useState('')
  const [otp,setOtp]= React.useState('')
  const [email,setEmail]= React.useState('')
  const [name,setName]= React.useState('')
  const [gender, setGender] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [genderdrop,setGenderdrop] = React.useState(['male','female'])
  const [citiesdrop,setCitiesdrop] = React.useState(['syria','jordan'])
  const [cities,setCities] = React.useState(['syria','jordan'])

  const [alerting,setAlerting] = React.useState(false)
  const matches = useMediaQuery('(min-width:784px)');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleFirstStep =() =>{
    if(phone_number){
    setSecond(true)
    setFirst(true)
    setAlerting(false)
    setShowbtn(false)
//     const formData = new FormData();
//     formData.append('phone_number', phone_number);
//     axios.post(`${process.env.REACT_APP_API_URL}generate_code/register` , formData ,{
//         headers: {
//             "Accept": "application/json",
//             "content-type": "application/json",
//         }
//     }).then(res=>{console.log(res.data)})
 }
    else{
        setAlerting(true)
    }
  }

  const handleSecond =() =>{
    const formData = new FormData();
    if(otp){
    setAlerting(false)
    setShow(false)
    formData.append('phone_number', phone_number);
    formData.append('otp', otp);
    // axios.post(`${process.env.REACT_APP_API_URL}verify-code`,formData).then(res=>{
    //     // if(res.data){
    //     // }
    //     // else{

    //     // }
    // })
}
else{
    setAlerting(true)
}
  }
  const handleSignup =() =>{
    if(phone_number && name && email &&password && gender && birthday && cities){
    setAlerting(false)
    const formData = new FormData();
    formData.append('phone_number', phone_number);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('gender', gender);
    formData.append('birthday', birthday);
    formData.append('country', cities);

     // axios.post(`${process.env.REACT_APP_API_URL}auth/register`,formData).then(res=>{
    //     // if(res.data){
    //     // }
    //     // else{

    //     // }
    // })
  }
  else{
    setAlerting(true)
  }
  }

  return (
      <Dialog
      fullScreen={fullScreen}
        fullWidth='sm'
        maxWidth='md'
        open={openDialog}
        onClose={handleClose}
      >
        <DialogTitle  sx={{color:'#0a97d1',display:'flex',flexWrap:'wrap',
        alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'30px'}}>
           Create a New Account</DialogTitle>
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
           {show &&  
           <><DialogContent sx={{display:'flex',flexWrap:'wrap',padding:'50px',
        alignItems:'center',justifyContent:'center',gap:'10px'}}>
            <Stack gap={5}>
                <Box sx={{ marginTop:'0px'}}>
        <PhoneInput
            placeholder=""
            name='phone_number'
            country={"sa"}
            enableSearch={true}
            value={phone_number}
            onChange={setphone}
            inputStyle={{
              borderRadius:'100px', border: '1px solid #0a97d1'
             , height: '32px',
              width:matches?'350px':'250px',}}
          /></Box>
       {first && 
        <TextField  
        label="Verification Code"
        value={otp} onChange={(e)=>{setOtp(e.target.value)}} 
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
       }
                {alerting && <Alert severity='error'>fields must be filled</Alert>}
        </Stack>
        </DialogContent>
        <DialogActions>
          {showbtn && <Button onClick={handleFirstStep}>Next</Button>}
          {second && <Button onClick={handleSecond}>Next</Button>}
        </DialogActions>
        </>}



        {!show && 
        <>
        <DialogContent sx={{display:'flex',flexWrap:'wrap',padding:'50px',
        alignItems:'center',justifyContent:'center',gap:'50px'}}>
          <Stack gap={2}>
            <Stack gap={2} direction={matches?'row':'column'}>
        <Grid>
        <PhoneInput
            disabled
            value={phone_number}
            inputStyle={{
            borderRadius:'100px',border:'1px solid #0a97d1',height:'35px', width:matches?'350px':'250px',
       }}
          />
          </Grid>
          <Grid>
        <TextField  
        label="Email"
        value={email} 
        onChange={(e)=>{setEmail(e.target.value)}} 
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
            </Grid>
            </Stack>
            <Stack gap={2} direction={matches?'row':'column'}>
        <Grid>
        <TextField
           label="Full Name"
           value={name} 
           onChange={(e)=>{setName(e.target.value)}} 
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
          />
          </Grid>
          <Grid>
        <TextField  
            label="Gender"
            value={gender}
            select
            onChange={(e) => {setGender(e.target.value) }}
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
            >
          {genderdrop.map((g) => (
          <MenuItem value={g}>
            {g}
          </MenuItem>
        ))}
        </TextField>
            </Grid>
            </Stack>

            <Stack gap={2} direction={matches?'row':'column'}>
        <Grid>
        <TextField
           value={birthday} 
           onChange={(e)=>{setBirthday(e.target.value)}} 
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
               type='date'
          />
          </Grid>
          <Grid>
          <TextField
          required
          name='password'
            autoComplete='new-password'
            label="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
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
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{color:'#0a97d1'}}>
                    <VisibilityIcon  />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
            </Grid>
            </Stack>
            <Grid>
        <TextField  
            label="Country"
            value={cities}
            select
            onChange={(e) => {setCities(e.target.value) }}
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
            >
          {citiesdrop.map((g) => (
          <MenuItem value={g}>
            {g}
          </MenuItem>
        ))}
        </TextField>
            </Grid>
            {alerting && <Alert severity='error'>fields must be filled</Alert>}

            <Button sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1', marginTop: '10px',height:'35px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} }} 
        onClick={handleSignup}>Signup</Button>
            </Stack>
        </DialogContent>
        </>}
      </Dialog>
  );
}