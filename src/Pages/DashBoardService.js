import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import FeedIcon from '@mui/icons-material/Feed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoadingPage from '../Components//LoadingPage';
import { Button, Container } from '@mui/material';
import DashServiceDetails from '../Components/DashServiceDetails';
import DashBoardNav from '../Components/DashBoardNav';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmCancelOrder from '../Components/ConfirmCancelOrder';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RateDialog from '../Components/RateDialog';

export default function DashBoardService({setNav}) {

  const [services, setServices] = React.useState([]);
  const [load, setLoad] = React.useState(true);
  const [show, setShow] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [CancelId, setCancelId] = React.useState('');
  const [details,setDetails] = React.useState()
  const [rateopen, setRateOpen] = React.useState(false);
  const [rateID,setRateID] = React.useState('')
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    setNav(false)
    window.scrollTo(0,0)
    axios
      .get(`${process.env.REACT_APP_API_URL}all_orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setServices(res.data.data.order_services);
        setLoad(false)
      });
  }, []);

  const handling =(id) =>{
    axios.get(`${process.env.REACT_APP_API_URL}${id}/show_details_order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res =>{
      setDetails(res.data.data.reservation)
      setShow(false)
    })
  }

  const handleCancel =(id) =>{
    setCancelId(id)
    setOpen(true)
  }
  const formatDate = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
    return { date, time };
  };
  return (
    <>
    {load && <LoadingPage open={load} />}
    {!load && show && <>
    <DashBoardNav />
    <TableContainer component={Paper} sx={{ boxShadow: 'none', width: '80%',position:'absolute',top:'100px',left:'250px'}}>
    <Container sx={{display:'flex',flexWrap:'wrap',alignItems:'end',justifyContent:'end'}}
    >
    </Container>
      <Table >
        <TableHead>
          <TableRow>
          <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Service</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Price</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Date & Time </TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Address Title</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services && services.map((service) => (<>
            <TableRow key={service.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell >{service.id}</TableCell>
              <TableCell >{service.service_name}</TableCell>
              <TableCell >{service.amount}</TableCell>
              <TableCell >{formatDate(service.created_at).time} {formatDate(service.created_at).date}</TableCell>
              <TableCell >{service.description}</TableCell>
              <TableCell >{service.status}</TableCell>
              <TableCell sx={{display:'flex',flexWrap:'wrap',justifyContent:'start',alignItems:'start'}}>
              {service.status === 'done' && <Button sx={{ bgcolor:"#0a97d1",color:'white',height:'20px',
              '&:hover':{bgcolor:"#0a97d1",color:'white'} }}  onClick={()=>{setRateOpen(true);setRateID(service.id)}}>
                Rating
              </Button>}
              {service.status === 'confirmed' && <Button sx={{ bgcolor:"#0a97d1",color:'white',height:'20px',
              '&:hover':{bgcolor:"#0a97d1",color:'white'} }}>
                Pay
              </Button>}
              {service.status === 'pending' && <Button onClick={()=>{handleCancel(service.id)}}
               sx={{ bgcolor:"#0a97d1",color:'white',height:'20px',
              '&:hover':{bgcolor:"#0a97d1",color:'white'} }}>
               <CloseIcon />
              </Button>}

              {service.status === 'confirmed'  && 
              <FeedIcon sx={{color:'#0a97d1',cursor:'pointer'}} />}
                {service.status === 'done' && 
              <FeedIcon sx={{color:'#0a97d1',cursor:'pointer'}} />}
                {service.status === 'proceed' && 
              <FeedIcon sx={{color:'#0a97d1',cursor:'pointer'}} />}


              {service.status === 'done'  && 
              <ReceiptIcon sx={{color:'#0a97d1',cursor:'pointer'}} />}
              {service.status === 'proceed' && 
              <ReceiptIcon sx={{color:'#0a97d1',cursor:'pointer'}} />}

             
              <VisibilityIcon sx={{color:'#0a97d1',cursor:'pointer'}} onClick={()=>{handling(service.id)}}/>
              </TableCell>
            </TableRow>
           </>))}
        </TableBody>
      </Table>
    </TableContainer></>}
    {!load && !show && <DashServiceDetails details={details} />}
    <ConfirmCancelOrder open={open} setOpen={setOpen} CancelId={CancelId}/>
    <RateDialog rateopen={rateopen} setRateOpen={setRateOpen} type={'service'} rateID={rateID}/>

    </>
  );
}