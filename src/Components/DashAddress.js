import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, Container, Stack, useMediaQuery} from '@mui/material';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function DashAddress({address}) {
    const matches = useMediaQuery('(min-width:1000px)');

  return (
    <div style={{marginTop:'20px',position:'relative'}}>
       
    <Card sx={{ padding:'5px', bgcolor:'#0a97d1', borderRadius:'10px',width:'38rem'}}>
        <CardContent  sx={{position:'relative'}}>
            <Stack direction='row' gap={'60%'}>
                <Stack>
            <Typography sx={{fontWeight:'bold', color:'white'}}>
            {address.title} <br />
            </Typography>
          <Typography sx={{ color:'white'}}>
            City <br />
            Area <br />
            Street <br />
            Building
          </Typography>
          </Stack>

          <Stack>
            <br/>
          <Typography sx={{ color:'white'}}>
            {address.city}  <br />
            {address.area}  <br />
            {address.street}  <br />
            {address.building} 
          </Typography>
          </Stack>
          </Stack>
        </CardContent>
    </Card>

    </div>
  )
}
