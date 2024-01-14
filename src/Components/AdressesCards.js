import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button, Stack, useMediaQuery } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router';
export default function AdressesCards() {
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
      const matches = useMediaQuery('(min-width:1000px)');
      const navigate = useNavigate()
  return (
    <div style={{marginTop:'20px',position:'relative'}}>
        <Stack direction={matches ?'row': 'column'} gap={5} sx={{'.MuiPaper-root':{
        width:'250px'
    }}}>
    <Card sx={{ padding:'18px', bgcolor:'#0a97d1', borderRadius:'10px',height:'150px' ,}}>
        <CardContent  sx={{position:'relative'}}>
        <FormGroup sx={{position:'absolute',top:'-15px',left:'0px'}}>
        <FormControlLabel 
          sx={{ color: '#00797C', '.MuiButtonBase-root':{
            borderRadius:'20px'
          } }}
          control={
            <Checkbox
            sx={{color:'white' , '.MuiSvgIcon-root':{
            color:'white'
            }}}
            checked={checked}
            onChange={(e)=>{handleChange(e)}}
            />
          }
        />
      </FormGroup>
            <Typography sx={{fontWeight:'bold', color:'white'}}>
            Home <br />
            </Typography>
          <Typography gutterBottom sx={{ color:'white'}}>
            City : <br />
            Area : <br />
            Street : <br />
            Building :
          </Typography>
        </CardContent>
    </Card>


    <Card sx={{ padding:'18px', bgcolor:'white', borderRadius:'10px',height:'150px' , display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <CardContent  sx={{position:'relative', display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
            <Button sx={{ color: '#0a97d1', padding: '10px', gap:'5px' , fontSize:'15px'}}
            onClick={()=>{navigate('/DashBoard')}}>
             <AddCircleOutlineIcon sx={{color:'#0a97d1' }}/>
                Add new address
            </Button>
        </CardContent>
    </Card>
    </Stack>
    </div>
  );
}