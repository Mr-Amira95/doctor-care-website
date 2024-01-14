import { Typography, Container, Stack, Box, TextField, Grid, MenuItem, Button, useMediaQuery, Alert } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AddAddress() {
  const windowHeight = React.useRef(window.innerHeight);
  const [title, setTitle] = useState('')
  const [area, setArea] = useState('')
  const [building, setBuilding] = useState('')
  const [street, setStreet] = useState('')
  const [city_id, setCity_id] = useState('')
  const [city, setCity] = useState([])
  const token = localStorage.getItem('token');
  const lang = localStorage.getItem('lang')
  const [alerting,setAlerting]= React.useState(false)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}cities`, {
      headers: {
        Authorization: `Bearer ${token}`,
        lang: lang
      },
    }).then(res => {
      setCity(res.data.data.cities)
    })
  }, [])
    const matches = useMediaQuery('(min-width:940px)');
  const handeNew =()=>{
    if(title&&area&&building&&street&&city_id){
    const formData = new FormData();
    formData.append('address_title',title );
    formData.append('city_id', city_id);
    formData.append('area', area);
    formData.append('building', building);
    formData.append('street', street);
    axios.post(`${process.env.REACT_APP_API_URL}address/store`,formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(res=>{
    window.location.reload(true)
  })
  }
  else{
    setAlerting(true);
  }
}

  return (
    <div style={{ backgroundColor: matches?'#D3D3D370':'', height: windowHeight.current, width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: matches?'center':'', justifyContent: matches?'center':'' }}>
      <Box sx={{ bgcolor: 'white', position: 'absolute', bottom: '0px', width:'55%', height: '30rem', padding: '50px',right:'9rem' }}>
        <Typography sx={{ color: '#0a97d1', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          Add Address
        </Typography>
        <Stack gap={2}>
          <Grid container>
            <TextField
              label={'Address Title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                width: '510px',
                border: '1px solid white',
                '& .MuiInputLabel-root': {
                  marginTop: '-6px'
                },
                '& .MuiInputBase-root': {
                  borderRadius: '100px',
                  border: '1px solid #0a97d1',
                  height: '35px',
                },
              }}
            />
          </Grid>
          <Stack direction='row' gap={1}>
          <Grid>
            <TextField
              select
              label={'City'}
              value={city_id}
              onChange={(e) => {
                setCity_id(e.target.value)
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
                  height: '35px',
                },
              }}
            >
              {city.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid>
            <TextField
              label={'Area'}
              value={area}
              onChange={(e) => { setArea(e.target.value) }}
              sx={{
                width:'250px',
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
            />
          </Grid>
          </Stack>

          <Stack direction='row' gap={1}>
          <Grid>
            <TextField
              label={'Street'}
              value={street}
              onChange={(e) => {
                setStreet(e.target.value)
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
                  height: '35px',
                },
              }}
            />
          </Grid>

          <Grid>
            <TextField
              label={'Building'}
              value={building}
              onChange={(e) => {setBuilding(e.target.value) }}
              sx={{
                width:'250px',
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
            />
          </Grid>

          </Stack>

          {alerting &&
          <Alert severity="error" sx={{width:'470px'}}>fields must be filled</Alert>}
          <Button
        sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1', width: '510px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} ,height:'35px'}}
        onClick={handeNew}>
            Submit</Button>
        </Stack>
      </Box>
    </div>
  )
}