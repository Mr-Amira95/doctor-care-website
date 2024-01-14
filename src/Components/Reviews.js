import { Typography, Grid, Stack, useMediaQuery, Container } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import pic from '../6915987.png';
import Rating from '@mui/material/Rating';

export default function Reviews({details}) {
  const { t } = useTranslation();
  const value = 5;
  const matches = useMediaQuery('(min-width:600px)');
console.log(details)
  return (
    <div style={{marginTop:'30px',marginBottom:'50px'}}>
       <Stack direction={matches?'row':'column'}  gap={matches?'68rem':'20px'} sx={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center' }}>
       <Grid item xs={6} style={{ border: 'none' }}>
          <Grid container component="div" spacing={0} direction="column" alignItems="center">
            <Grid item>
              <Typography sx={{ fontSize: '20px',color:'#0a97d1',fontWeight:'bold',marginLeft:'2.5rem' }}>
                {t('Customers Reviews')}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ border: 'none' }}>
          <Grid container component="div" spacing={0} direction="column" alignItems="center">
            <Grid item>
              <Typography sx={{ fontSize: '16px' ,fontWeight:'bold' }}>
                {details.reviews_count} Reviews ({details.ratings_avg})
                </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
<Container>
  {details.reviews.map((d)=>
      <Stack direction="column" gap={3} sx={{ marginTop: '10px' ,marginLeft:'20px'}}>
        <Stack direction="row" gap={2} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginTop: '10px' }}>
          <img src={pic} style={{ height: '50px',
           width: '50px', borderRadius: '100%', objectFit: 'fill' }} alt='...loading'/>
            <Stack  gap={1} sx={{  marginTop: '10px' }}>
              <Stack direction="row" gap={2} >
            <Typography sx={{ fontSize: '20px' }}>{d.username}</Typography>
            <Rating value={d.stars} readOnly sx={{color:'#0a97d1', marginTop:'6px'}}/>
            </Stack>
            <Typography sx={{fontSize:'16px', color:'gray'}}>{d.comment}</Typography>
            </Stack>
        </Stack>
    </Stack>)}
    </Container>
    </div>
  )
}
