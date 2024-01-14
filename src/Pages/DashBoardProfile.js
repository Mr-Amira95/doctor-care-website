import { Typography, Stack, Box, TextField, Grid, Button, useMediaQuery, Alert } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PhoneInput from "react-phone-input-2";
import LoadingPage from '../Components/LoadingPage';
import DashResetPassword from '../Components/DashResetPassword';
import DashBoardNav from '../Components/DashBoardNav';

export default function DashBoardProfile({setNav}) {
  const windowHeight = React.useRef(window.innerHeight);
  const [name, setName] = useState('')
  const [Birthdate, setBirthdate] = useState('')
  const [phone, setPhone] = useState('')
  const [Email, setEmail] = useState('')
  const [Gender, setGender] = useState('')
  const [btn,setBtn]= useState(true)
  const [country,setCountry] = useState(true)
  const [load, setLoad] = useState(true);
  const [show,setShow] = useState(true)
  const token = localStorage.getItem('token');
  const [alerting,setAlerting]= React.useState(false)

  useEffect(() => {
    setNav(false)
    if(token)
    { 
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
        setCountry(userData.country)

        if(userData.gender === 'male'){
            setBtn(true)
        }
        else if(userData.gender === 'female'){
            setBtn(false)
        }
        setLoad(false);
      }
    });}
  }, []);


  const handeEdit =()=>{
    if(name&&Email&&phone&&Birthdate&&Gender){
    const formData = {
      'name' :name,
      'email' : Email,
      'phone_number': phone,
      'birthday': Birthdate,
      'gender': Gender,
      "country" : country,
    }
    setLoad(true)
    axios.put(`${process.env.REACT_APP_API_URL}auth/updateProfile`,formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res=>{
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
                setCountry(userData.country)
        
                if(userData.gender === 'male'){
                    setBtn(true)
                }
                else if(userData.gender === 'female'){
                    setBtn(false)
                }
                setLoad(false);
              }
            })    })
  }
  else{
    setAlerting(true)
  }
}

    const matches = useMediaQuery('(min-width:940px)');

    return (
        <>
        <DashBoardNav />
    <div style={{ backgroundColor: matches?'#D3D3D370':'', height: windowHeight.current, width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: matches?'center':'', justifyContent: matches?'center':'' }}>
            {load && <LoadingPage open={load} />}
      {!load && show && 
      <Box sx={{ bgcolor: 'white', position: 'absolute', bottom: '0px', width:'55%', height: '30rem',
       padding: '50px',right:'9rem' }}>
        <Typography sx={{ color: '#0a97d1', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          Profile
        </Typography>
        <Stack gap={2}>
          <Stack direction='row' gap={1}>
          <Grid>
            <TextField
              label={'Name'}
              value={name}
              onChange={(e) => {setName(e.target.value)}}
              sx={{
                width:'250px',
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
              type='date'
              value={Birthdate}
              onChange={(e) => {
                setBirthdate(e.target.value)
              }}
              sx={{
                width: '250px',
                border: '1px solid white',
                '& .MuiInputLabel-root': {
                  marginTop: '-6px'
                },
                '& .MuiInputBase-root': {
                  borderRadius: '100px',
                  border: '1px solid #0a97d1',
                  height: '37px',
                },
              }}
            />
          </Grid>
          </Stack>

          <Stack direction='row' gap={1}>
          <Grid>
          <PhoneInput
            disabled
            placeholder=""
            defaultMask={'sa'}
            renderStringAsFlag={false}
            country={"sa"}
            enableSearch={true}
            value={phone}
            onChange={setPhone}
            inputStyle={{
            borderRadius:'100px', border: '1px solid #0a97d1'
           , height: '32px',
           width: '250px',
        }}
          />
          </Grid>

          <Grid>
            <TextField
              label={'Email'}
              value={Email}
              onChange={(e) => {setEmail(e.target.value) }}
              sx={{
                width:'250px',
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
          </Stack>


          <Grid sx={{ marginTop: '0px' }}>
            <Stack direction='row' 
            sx={{ border: '1px solid', borderColor: '#0a97d1', borderRadius: '20px',width:matches?'510px':'' 
            }} >
              
                <Button sx={{borderRadius:'20px',width:'310px','&:focus':{color:'white',bgcolor:'#0a97d1'},height:'35px',
                '&:hover':{color:'white',bgcolor:'#0a97d1'}, bgcolor:btn?'#0a97d1':'',color:btn?'white':'#0a97d1'}}
                 onClick={()=>{setBtn(true);setGender('male')}}>Male</Button>
                 
                <Button sx={{borderRadius:'20px',width:'310px','&:hover':{color:'white',bgcolor:'#0a97d1'},height:'35px',
                bgcolor:!btn?'#0a97d1':'',color:!btn?'white':'#0a97d1'}}
                onClick={()=>{setBtn(false);setGender('female')}}>Female</Button>
            </Stack>
        </Grid>
        {alerting &&
          <Alert severity="error" sx={{width:'470px'}}>fields must be filled</Alert>}
          <Button
        sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1', width: '510px',marginTop:'50px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} ,height:'37px'}}
        onClick={handeEdit}>
            Submit</Button>
            <Button onClick={()=>{setShow(false)}}
        sx={{ color: 'gray', padding: '10px', width: '510px',border:'1px solid #0a97d1'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} ,height:'37px'}}>
            Change Password</Button>
        </Stack>
      </Box>}

      {!load && !show && <DashResetPassword />}
    </div>
    </>
  )
}