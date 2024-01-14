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
import LoadingPage from '../Components/LoadingPage';
import { Button, Container } from '@mui/material';
import DashProductDetails from '../Components/DashProductDetails';
import DashBoardNav from '../Components/DashBoardNav';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmCancelOrder from '../Components/ConfirmCancelOrder';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RateDialog from '../Components/RateDialog';

export default function DashBoardProduct({setNav}) {
  const [Products, setProducts] = React.useState([]);
  const [load, setLoad] = React.useState(true);
  const [show, setShow] = React.useState(true);
  const [details,setDetails] = React.useState()
  const token = localStorage.getItem('token');
  const [open, setOpen] = React.useState(false);
  const [rateopen, setRateOpen] = React.useState(false);
  const [rateID,setRateID] = React.useState('')
  const [CancelId, setCancelId] = React.useState('');
  React.useEffect(() => {
    setNav(false)
    axios
      .get(`${process.env.REACT_APP_API_URL}all_orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data.data.order_products);
        setLoad(false)
      });
  }, []);

  const handleCancel =(id) =>{
    setCancelId(id)
    setOpen(true)
  }
  const handling =(id) =>{
    axios.get(`${process.env.REACT_APP_API_URL}${id}/order_products_details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res =>{
      setDetails(res.data.data)
      setShow(false)
    })
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
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>quantity</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ color: '#0a97d1', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Products && Products.map((service) => (<>
          {service.order_products.map((p)=>
            <TableRow key={p.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell >{p.id}</TableCell>
              <TableCell >{p.product_title}</TableCell>
              <TableCell >{p.price}</TableCell>
              <TableCell >{formatDate(p.created_at).time} {formatDate(p.created_at).date}</TableCell>
              <TableCell >{p.quantity}</TableCell>
              <TableCell >{service.status}</TableCell>

              <TableCell sx={{display:'flex',flexWrap:'wrap',justifyContent:'start',alignItems:'start'}}>
              {service.status === 'done' && <Button sx={{ bgcolor:"#0a97d1",color:'white',height:'20px',
              '&:hover':{bgcolor:"#0a97d1",color:'white'} }}
              onClick={()=>{setRateOpen(true);setRateID(p.id)}}>
                Rating
              </Button>}
              {service.status === 'confirmed' && <Button sx={{ bgcolor:"#0a97d1",color:'white',height:'20px',
              '&:hover':{bgcolor:"#0a97d1",color:'white'} }}>
                Pay
              </Button>}
              {service.status === 'pending' && <Button onClick={()=>{handleCancel(p.id)}}
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
          )} </>))}
        </TableBody>
      </Table>
    </TableContainer></>}
    {!load && !show && <DashProductDetails details={details} />}
    <ConfirmCancelOrder open={open} setOpen={setOpen} CancelId={CancelId}/>

    <RateDialog rateopen={rateopen} setRateOpen={setRateOpen} type={'product'} rateID={rateID}/>
    </>
  );
}