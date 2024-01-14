import React, { useEffect, useState } from 'react';
import LoadingPage from '../Components/LoadingPage';
import { Typography, Stack, Box, TextField, Grid, Button, useMediaQuery } from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import DashBoardNav from '../Components/DashBoardNav';

export default function DashBoardSupport({setNav}) {
  const [load, setLoad] = useState(true);
  const matches = useMediaQuery('(min-width:940px)');
  const windowHeight = React.useRef(window.innerHeight);
  const token = localStorage.getItem('token');
  const [message, setMessage] = useState(' ');
  const [data, setData] = useState([]);
  const messageContainerRef = React.useRef(null);

  useEffect(() => {
    setNav(false)
    axios.get(`${process.env.REACT_APP_API_URL}chat/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      setData(res.data.data.message);
      setLoad(false);
    });
  }, []);
  if (messageContainerRef.current) {
    messageContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  const handleSend =() =>{
    if(message){
    const formData = new FormData();
    formData.append('message', message);
    axios.post(`${process.env.REACT_APP_API_URL}chat/send`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res=>{
        setLoad(true)
        setMessage(' ')
        axios.get(`${process.env.REACT_APP_API_URL}chat/messages`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(res => {
            setData(res.data.data.message);
            setLoad(false);
          });   
           })
  }
}
const formatDate = (dateTimeString) => {
  const dateObj = new Date(dateTimeString);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return { date, time };
};


return (
    <>
    <DashBoardNav />
    <div
      style={{
        backgroundColor: matches ? '#D3D3D370' : '',
        height: windowHeight.current,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: matches ? 'center' : '',
        justifyContent: matches ? 'center' : '',
        position:'relative',
      }}
    >
      {load && <LoadingPage open={load} />}
      {!load && (
        <>
          <Box 
            sx={{
              bgcolor: 'white',
              position: 'absolute',
              bottom: '0px',
              width: '55%',
              height: '30rem',
              padding: '50px',
              overflowY: 'scroll',
              right:'9rem'
            }}
          >
            {data.map(data => (
              <div ref={messageContainerRef}>
                {/* <Stack style={{ position: 'relative' }} >
                  <Box
                    sx={{
                      color: 'white',
                      bgcolor: '#0a97d1',
                      left: '2rem',
                      borderRadius: '10px',
                      width: '50%',
                      padding: '20px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'start',
                      alignItems: 'start',
                      marginTop: '10px',
                    }}
                  >
                    Paragraphs are the building blocks of papers.
                  </Box>
                  <Typography sx={{ marginTop: '0.5rem' }}>
                    1:24 PM
                  </Typography>
                </Stack> */}

                {data.is_sender === true && (
                  <Stack 
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'end',
                      alignItems: 'end',
                    }}
                  >
                    <Box
                      sx={{
                        color: 'black',
                        bgcolor: '#bcdce5',
                        right: '1rem',
                        borderRadius: '10px',
                        width: '50%',
                        padding: '20px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'start',
                        alignItems: 'start',
                        marginTop: '10px',
                      }}
                    >
                      {data.message}
                    </Box>
                    <Typography sx={{ marginTop: '0.5rem' }}>
                    {formatDate(data.created_at).time}
                    </Typography>
                  </Stack>
                )}
              </div>
            ))}
          </Box>
          
          <Stack direction="row" sx={{ marginTop: '15rem' }}>
              <Grid container>
                <TextField
                  label={'Message'}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  sx={{
                    width: '55%',
                    border: '1px solid white',
                    '& .MuiInputLabel-root': {
                      marginTop: '19px',
                    },
                    '& .MuiInputBase-root': {
                      borderRadius: '100px',
                      bgcolor: '#D3D3D370',
                      border: '1px solid #0a97d1',
                      height: '35px',
                    },               
                   position:'fixed',top:'93.5%',right:'15rem'
                  }}
                />
              </Grid>
              <SendIcon
                sx={{
                  color: 'white',
                  bgcolor: '#0a97d1',
                  borderRadius: '100px',
                  padding: '7px',
                  cursor: 'pointer', position:'fixed',top:'93.5%',right:'12rem'
                }}
                onClick={handleSend}
              />
            </Stack>
        </>
      )}
    </div>
    </>
  );
}