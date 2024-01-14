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

export default function ConfirmDialog({open, setOpen, deleteId}) {
    const token = localStorage.getItem('token');

  const handleClose = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}address/destroy/${deleteId}`, {
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
        <DialogTitle>Confirm Delete</DialogTitle>
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
            Do you want to delete this Address ?
          </DialogContentText>
      
        </DialogContent>
        <DialogActions sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
  );
}