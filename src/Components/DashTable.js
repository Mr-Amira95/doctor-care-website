import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingPage from './LoadingPage';
import { Button, Container } from '@mui/material';
import AddAddress from './AddAddress';
import EditAdress from './EditAdress';
import ConfirmDialog from './ConfirmDialog';

export default function DashTable() {
  const [addresses, setAddresses] = React.useState([]);
  const [load, setLoad] = React.useState(true);
  const [show, setShow] = React.useState(true);
  const [showedit, setShowedit ] = React.useState(false);
  const [editItem,setEditItem] = React.useState()
  const [open,setOpen] = React.useState(false)
  const [deleteId,setDeleteID] = React.useState('')

  const token = localStorage.getItem('token');

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}address/all_address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAddresses(res.data.data.all_address);
        setLoad(false)
      });
  }, []);

  const handling =(id) =>{
    const selectedAddress = addresses.find((address) => address.id === id);
    setEditItem(selectedAddress);
    setShowedit(true)
    setShow(false)
  }

  const handleDelete =(id)=>{
setOpen(true)
setDeleteID(id)
  }
  const handleAdding =() =>{
   setShow(false)
  }
  return (
    <>
    {load && <LoadingPage open={load} />}
    {!load && show && !showedit && <>
    
    <TableContainer component={Paper} sx={{ boxShadow: 'none', width: '80%',position:'absolute',top:'100px',left:'250px'}}>
    <Container sx={{display:'flex',flexWrap:'wrap',alignItems:'end',justifyContent:'end'}}
    >
    <Button sx={{color:'white',bgcolor:'#0a97d1',borderRadius:'40px',marginBottom:'20px',
    '&:hover':{color:'white',bgcolor:'#0a97d1'},marginRight:'4rem'}} onClick={handleAdding}>
        Add Address
    </Button>
    </Container>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Title</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>City</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Area</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Street</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Building</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addresses && addresses.map((address) => (<>
            <TableRow key={address.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell >{address.id}</TableCell>
              <TableCell >{address.address_title}</TableCell>
              <TableCell >{address.city}</TableCell>
              <TableCell >{address.area}</TableCell>
              <TableCell >{address.street}</TableCell>
              <TableCell >{address.building}</TableCell>
              <TableCell >
              <EditIcon sx={{color:'#0a97d1',cursor:'pointer',marginRight:'5px'}} onClick={()=>{handling(address.id)}}/>
              <DeleteIcon sx={{color:'red',cursor:'pointer'}} onClick={()=>{handleDelete(address.id)}}/>
              </TableCell>
            </TableRow>
           </>))}
        </TableBody>
      </Table>
    </TableContainer></>}
    {!load && !show && !showedit && <AddAddress />}
    {!load && !show && showedit && <EditAdress editItem={editItem}/>}
    <ConfirmDialog open={open} setOpen={setOpen} deleteId={deleteId}/>
    </>
  );
}