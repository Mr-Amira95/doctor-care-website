import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function ConfirmCancelOrder({open, setOpen, CancelId}) {
    const token = localStorage.getItem('token');

    const handleClose = () => {
    axios.get(`${process.env.REACT_APP_API_URL}cancel_order/${CancelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res=>{
    window.location.reload(true)
    })
  };

  return (
      <Dialog
        maxWidth='xs'
        open={open}
      >
        <DialogTitle>Confirm Canel</DialogTitle>
        <IconButton
        aria-label="close"
        onClick={()=>{setOpen(false)}}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color:'#0a97d1'
        }}
      >
        <CloseIcon />
      </IconButton>
        <DialogContent>
          <DialogContentText>
            Do you want to Cancel this order ?
          </DialogContentText>
      
        </DialogContent>
        <DialogActions sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
          <Button onClick={handleClose}>Canel</Button>
        </DialogActions>
      </Dialog>
  );
}