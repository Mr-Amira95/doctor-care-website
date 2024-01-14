import { Typography, Container, Stack, Box, TextField, Grid, MenuItem, Button, useMediaQuery } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function EditAddress({editItem}) {
  const windowHeight = React.useRef(window.innerHeight);
  const [title, setTitle] = useState(editItem.address_title)
  const [area, setArea] = useState(editItem.area)
  const [building, setBuilding] = useState(editItem.building)
  const [street, setStreet] = useState(editItem.street)
  const [city_id, setCity_id] = useState(editItem.city_id)
  const [city, setCity] = useState([])

  const token = localStorage.getItem('token');
  const lang = localStorage.getItem('lang')
   
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

    const handeEdit =()=>{
      if(title&&area&&building&&street&&city_id){
      const formData = {
        'address_title' :title,
        'city_id' : city_id.toString(),
        'area': area,
        'building': building,
        'street': street
      }
      axios.put(`${process.env.REACT_APP_API_URL}address/update/${editItem.id}`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res=>{
              window.location.reload(true)
      })
    }
  }

  return (
    <div style={{ backgroundColor: matches?'#D3D3D370':'', height: windowHeight.current, width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: matches?'center':'', justifyContent: matches?'center':'' }}>
      <Box sx={{ bgcolor: 'white', position: 'absolute', bottom: '0px', width:'55%', height: '30rem', padding: '50px',right:'9rem' }}>
        <Typography sx={{ color: '#0a97d1', fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          Edit Address
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

          <Button
        sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1', width: '510px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} ,height:'35px'}}
        onClick={handeEdit}>
            Submit</Button>
        </Stack>
      </Box>
    </div>
  )
}