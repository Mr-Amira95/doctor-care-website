import React, { useState } from 'react'
import { Typography, InputAdornment, Stack, Box, TextField, Grid, Button, useMediaQuery, Alert } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useEffect } from 'react';

export default function DashResetPassword() {
    const windowHeight = React.useRef(window.innerHeight);
    const matches = useMediaQuery('(min-width:940px)');
    const [current,setCurrent] = useState('')
    const [newpassword,setNew] = useState('')
    const [confirm,setConfirm] = useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordd, setShowPasswordd] = React.useState(false);
    const [showPassworddd, setShowPassworddd] = React.useState(false);

    const [alerting,setAlerting]= React.useState(false)
    const [name, setName] = useState('')
    const [Birthdate, setBirthdate] = useState('')
    const [phone, setPhone] = useState('')
    const [Email, setEmail] = useState('')
    const [Gender, setGender] = useState('')
    const [country,setCountry] = useState('')

    const token = localStorage.getItem('token');

    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}get_profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        const userData = res.data.data.user;
        if (userData) {
          setName(userData.name);
          setBirthdate(userData.birthday);
          setPhone(userData.phone_number);
          setEmail(userData.email);
          setGender(userData.gender)
          setCountry(userData.country)}})
      },[])

    const handleReset =()=>
    {
      if(newpassword === confirm){
      const formData ={
        'name' :name,
        'email' : Email,
        'phone_number': phone,
        'birthday': Birthdate,
        'gender': Gender,
        "country" : country,
        "change_password" : true,
        "old_password":current,
        "new_password":newpassword,
        "confirm_password":confirm
      }
      axios.put(`${process.env.REACT_APP_API_URL}auth/updateProfile`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res=>{     
        window.location.reload(true)
      })
    } 
    else{
      setAlerting(true)
    }
  }
  return (
    <div style={{ backgroundColor: matches?'#D3D3D370':'', height: windowHeight.current, width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: matches?'center':'', justifyContent: matches?'center':'' }}>
      <Box sx={{ bgcolor: 'white', position: 'absolute', bottom: '0px', width:'55%', height: '30rem'
      , padding: '50px',right:"9rem" }}>
      <Typography sx={{ color: '#0a97d1', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          Change Password
        </Typography>
        <Typography sx={{ color: 'gray', fontSize: '12px', marginBottom: '50px' }}>
        the Password must contain one uppercase character ,one lower case character <br />
        and must be a minimum length of 8 characters
        </Typography>

        <Stack gap={2}>
            <Grid>
        <TextField
              label={'Current Password'}
              value={current}
              onChange={(e) => {setCurrent(e.target.value);setAlerting(false) }}
              sx={{
                width:'280px',
                border: '1px solid white',
                '& .MuiInputLabel-root': {
                   marginTop:'-6px'
                },
                '& .MuiInputBase-root': {
                  borderRadius: '100px',
                  border: '1px solid #0a97d1',
                  height: '35px',
                },
              }}
              autoComplete='new-password'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment edge='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" >
                      <VisibilityIcon  />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid>
          <TextField
              label={'New Password'}
              value={newpassword}
              onChange={(e) => {setNew(e.target.value);setAlerting(false) }}
              sx={{
                width:'280px',
                border: '1px solid white',
                '& .MuiInputLabel-root': {
                   marginTop:'-6px'
                },
                '& .MuiInputBase-root': {
                  borderRadius: '100px',
                  border: '1px solid #0a97d1',
                  height: '35px',
                },
              }}
              type={showPasswordd ? 'text' : 'password'}
              autoComplete='new-password'
              InputProps={{
                endAdornment: (
                  <InputAdornment edge='end'>
                    <IconButton onClick={() => setShowPasswordd(!showPasswordd)} edge="end" >
                      <VisibilityIcon  />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

        <Grid>
          <TextField
           type={showPassworddd ? 'text' : 'password'}
              label={'Confirm Password'}
              value={confirm}
              onChange={(e) => {setConfirm(e.target.value);setAlerting(false) }}
              sx={{
                width:'280px',
                border: '1px solid white',
                '& .MuiInputLabel-root': {
                   marginTop:'-6px'
                },
                '& .MuiInputBase-root': {
                  borderRadius: '100px',
                  border: '1px solid #0a97d1',
                  height: '35px',
                },
              }}
              autoComplete='new-password'
              InputProps={{
                endAdornment: (
                  <InputAdornment edge='end'>
                    <IconButton onClick={() => setShowPassworddd(!showPassworddd)} edge="end" >
                      <VisibilityIcon  />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {alerting && <Alert severity="error"
          sx={{  width: '250px' }}>The passwords do not match</Alert>}
          <Button
        sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1', width: '280px',marginTop:'10px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} ,height:'35px'}}
        onClick={handleReset}>
            Change</Button>
        </Stack>
        </Box>
    </div>
  )
}
