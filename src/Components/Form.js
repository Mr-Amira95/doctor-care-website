import { Container, Typography, TextField, Grid, Stack, TextareaAutosize, useMediaQuery, Button, Alert } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";

export default function Form({t}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [alerting,setAlerting]= React.useState(false)
  const [message, setMessage] = useState('');
  const matches = useMediaQuery('(min-width:686px)');
  const handlesend=() =>{
    const formData = new FormData();
    if(firstName && lastName && phone && subject && message){
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('phone_number', phone);
    formData.append('subject', subject);
    formData.append('message', message);
    try{
    axios.post(`${process.env.REACT_APP_API_URL}contact_form`,formData).then(
      res=>{
        if(res.data.status === true){
          alert('Message Send Successfully')
          setFirstName('')
          setLastName('')
          setPhone('')
          setMessage('')
          setSubject('')
        }
      }
    )}
    catch(error){
      console.log(error)
    }}
    else{
      setAlerting(true)
    }
  }
  const lang = localStorage.getItem('lang');

  return (
    <div style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      <Container sx={{ marginTop: '30px' }}>
        <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{t('Need help or care with anything?')}</Typography>
        <br />
        <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{t('Get in touch with us!')}</Typography>
      </Container>
      <Container sx={{ marginTop: '30px' }}>
        <Stack direction={matches ? 'row' : 'column'} gap={2}>
          <Grid>
            <TextField
              label={t("First Name")}
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value) }}
              InputLabelProps={{
                sx: {
                  color: 'white'
                }
              }}
              sx={{borderRadius:'5px', width: '300px', border: '1px solid white', 
              '&:focus': { border: '1px solid white' },'.MuiInputBase-input':{color:"white"} }}
            />
          </Grid>
          <Grid>
            <TextField
              label={t("Last Name")}
              value={lastName}
              onChange={(e) => { setLastName(e.target.value) }}
              InputLabelProps={{
                sx: {
                  color: 'white' 
                }
              }}
              sx={{borderRadius:'5px', width: '300px', border: '1px solid white', 
              '&:hover': { border: '1px solid white' },'.MuiInputBase-input':{color:"white"} }}
            />
          </Grid>
        </Stack>

        <Stack direction={matches ? 'row' : 'column'} gap={2} sx={{ marginTop: '20px' }}>
          <Grid>
          <PhoneInput
            placeholder=""
            label="phone"
            name='phone_number'
            country={"sa"}
            enableSearch={true}
            value={phone}
            onChange={setPhone}
            inputStyle={{backgroundColor:'transparent',color:'white',fontSize:'13px',border:'1px solid white'
             }}
          />
          </Grid>
          <Grid>
            <TextField
              label={t("Subject")}
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
              InputLabelProps={{
                sx: {
                  color: 'white' 
                }
              }}
              sx={{ borderRadius:'5px',width: '300px', 
              border: '1px solid white', '&:hover': { border: '1px solid white' } ,'.MuiInputBase-input':{color:"white"}}}
            />
          </Grid>
        </Stack>
        <Grid sx={{ marginTop: '20px' }}>
        <TextareaAutosize
        onChange={(e) => { setMessage(e.target.value) }}
        name="message"
        placeholder={t("Message")}
        minRows={7}
        value={message}
        cols={matches ? 97 : 46}
        className="custom-textarea"
        style={{borderRadius:'5px',padding:'10px 1px 1px 12px',fontSize:'12px',fontFamily:'arial'
      ,color:'white'}}
      />
        </Grid>
        {alerting && <Alert  severity="error" sx={{width:'300px', marginTop: '20px'}}>{t('One of the Feilds is empty')} </Alert>}
        <Button onClick={handlesend}
        sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1', marginTop: '20px'
        , width: '300px' }}>{t('Send')}</Button>
      </Container>
    </div>
  );
}