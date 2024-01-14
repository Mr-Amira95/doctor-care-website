import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import { Grid, Stack, TextareaAutosize } from '@mui/material';
import Alert from '@mui/material/Alert';


export default function RateDialog({rateopen, setRateOpen, rateID, type}) {
    const token = localStorage.getItem('token');
    const [value, setValue] = React.useState(0);
    const [message, setMessage] = React.useState('');
    const [afterRate,setAfterRate] = React.useState(false)
  const handleRate = () => {
    const formData = new FormData();
    formData.append('stars', value);
    formData.append('comment', message);
    formData.append('type', type);
    axios.post(`${process.env.REACT_APP_API_URL}${rateID}/add_rating`,formData, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}).then(res=>{
//  window.location.reload(true)
setAfterRate(true)
})
  };

  return (
      <Dialog
      fullWidth='sm'
      open={rateopen}
      >
        <DialogTitle>Rating</DialogTitle>
        <IconButton
        aria-label="close"
        onClick={()=>{setRateOpen(false)}}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color:'#0a97d1'
        }}
      >
        <CloseIcon />
      </IconButton>
        <DialogContent >
         <Stack sx={{ display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center' }}>
      <Rating size="large"
        sx={{ color:'#0a97d1',marginTop:'10px' }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Grid sx={{ marginTop: '20px' }}>
        <TextareaAutosize
        onChange={(e) => {setMessage(e.target.value) }}
        placeholder="Description"
        minRows={10}
        value={message}
        cols={30}
        style={{borderRadius:'5px',padding:'10px 1px 1px 12px',
        fontSize:'12px',fontFamily:'arial',color:'black',border:'1px solid #0a97d1'}}
      />
        </Grid>
        {afterRate && <Alert severity='success'>Rate Added Successfully</Alert>}
        </Stack>
        </DialogContent>
        <DialogActions sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
          <Button onClick={handleRate}>Confirm</Button>
        </DialogActions>
      </Dialog>
  );
}