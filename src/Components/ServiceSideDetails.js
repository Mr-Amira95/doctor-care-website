import { Typography,Container,Stack , TextField , Grid  ,MenuItem, Button, useMediaQuery} from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import LoginDialog from './LoginDialog';


export default function ServiceSideDetails({details,price,total}) {
    const matches = useMediaQuery('(min-width:686px)');
    const [period, setPeiod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [description, setDescription] = useState('');
    const [pname, setPname] = useState('');
    const [btn,setBtn]= React.useState(true)
    const [page, setAge] = useState('');
    const [newPrice, setnewPrice] = useState('');
    const [pGender, setPgender] = useState('');
    const [gender,setGender] = useState(['male','female'])
    const [p,setP] = useState(0)
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

  useEffect(()=>{
    if(details.servicePeriods.length > 0){
      setP(details.servicePeriods[0].price)
      setPeiod(details.servicePeriods[0].period_id)
    }
  },[])

      const handleClick =() =>{
      const token = localStorage.getItem('token')
      if(!token){
        setOpen(true)
      }
      else{
        var forme ;
        if(btn){
          forme= 1
        }
        else{ 
          forme =0
         }
         const arr = [{'period':period,'startDate':startDate,'description':description,'pname':pname,'page':page,
        'pGender':pGender,'forMe':forme}]
        navigate('/Checkout',{state : {arr : arr , details : details , price:price , total:total, p:p}})
      }
    }

    return (
    <div style={{marginTop:'30px'}}>
      <Typography sx={{fontSize:'20px',color:'#0a97d1',padding:matches?'':'20px'}}>
        {details.services.title}
      </Typography>
      <Typography sx={{fontSize:'20px',marginTop:'10px',padding:matches?'':'20px'}}>
        {details.services.description}
      </Typography> 
      {details.servicePeriods.length ===  0 ? <>
      {total ? <Stack direction={matches ? 'row' : 'column'} gap={3}>
       <Typography sx={{fontSize:'20px',marginTop:'10px',padding:matches?'':'20px',textDecoration: 'line-through 1px'}}>
       {price}   
     </Typography>
     <Typography sx={{fontSize:'20px',marginTop:'10px',padding:matches?'':'20px',marginBottom:'30px'}}>
     {total}
      </Typography>
      </Stack> : 
      <Typography sx={{fontSize:'20px',marginTop:'10px',padding:matches?'':'20px',marginBottom:'30px'}}>
        {price} 
      </Typography>}
      </> :  <Typography sx={{fontSize:'20px',marginTop:'10px',padding:matches?'':'20px',marginBottom:'30px'}}>
        {p} 
      </Typography>}
      <div sx={{ marginTop: '30px' }}>
        <Stack direction={matches ? 'row' : 'column'} gap={2}>
         {details.servicePeriods.length > 0 ? <>
          <Grid>
            <TextField
            select
            label={t("Period")}
            value={period}
            onChange={(e) => {
              setPeiod(e.target.value);
              const selectedPeriod = details.servicePeriods.find(p => p.period_id === parseInt(e.target.value));
              if (selectedPeriod) {
                setP(selectedPeriod.price);
              }
            }}
            sx={{
              width: matches ? '300px' : '100px',
              border: '1px solid white',
              '& .MuiInputLabel-root': {
                 marginTop:'-6px'
              },
              '& .MuiInputBase-root': {
                borderRadius: '100px',
                border: '1px solid #0a97d1',
                height: '35px',
              },
            }}
            >
  {details.servicePeriods.map((c) => (
    <MenuItem value={c.period_id}>
      {c.period_title}
    </MenuItem>
  ))}
</TextField>
          </Grid> </>:<></>
          }
        { details.servicePeriods.length > 0 && <Grid>
            <TextField
            type='date'
              value={startDate}
              onChange={(e) => { setStartDate(e.target.value) }}
              sx={{
                width: matches ? '300px' : '100px',
                border: '1px solid white',
                '& .MuiInputLabel-root': {
                   marginTop:'-6px'
                },
                '& .MuiInputBase-root': {
                  borderRadius: '100px',
                  border: '1px solid #0a97d1',
                  height: '35px',
                },
              }}
            />
          </Grid>
}
          {/* { details.servicePeriods.length === 0  &&     <Grid container justifyContent="center">
<TextField
    label={t('Description')}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    sx={{
      width: matches ? '510px' : '100px',
      border: '1px solid white',
      '& .MuiInputLabel-root': {
         marginTop:'-6px'
      },
      '& .MuiInputBase-root': {
        borderRadius: '100px',
        border: '1px solid #0a97d1',
        height: '35px',
      },
    }}
  />
</Grid>} */}
        </Stack>

     {/* {details.servicePeriods.length > 0 && */}
      <Stack sx={{ marginTop: '20px' }}>
        <Grid container justifyContent="center">
  <TextField
    label={t('Description')}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    sx={{
      width: matches ? '618px' : '300px',
      border: '1px solid white',
      '& .MuiInputLabel-root': {
         marginTop:'-6px'
      },
      '& .MuiInputBase-root': {
        borderRadius: '100px',
        border: '1px solid #0a97d1',
        height: '35px',
      },
    }}
  />
</Grid>
        </Stack>
        {/* } */}

        <Grid sx={{ marginTop: '20px' }}>
            <Stack direction='row' 
            sx={{ border: '1px solid', borderColor: '#0a97d1', borderRadius: '20px',width:matches?'620px':'' }} >
              
                <Button sx={{borderRadius:'20px',width:'310px','&:focus':{color:'white',bgcolor:'#0a97d1'},
                '&:active':{color:'white',bgcolor:'#0a97d1'}, bgcolor:btn?'#0a97d1':'',color:btn?'white':'#0a97d1'}}
                 onClick={()=>{setBtn(true)}}>For My Own</Button>
                 
                <Button sx={{borderRadius:'20px',width:'310px','&:focus':{color:'white',bgcolor:'#0a97d1'},
                bgcolor:!btn?'#0a97d1':'',color:!btn?'white':'#0a97d1'}}
                onClick={()=>{setBtn(false)}}>For Other</Button>
            </Stack>
        </Grid>
        {!btn && <Grid sx={{ marginTop: '20px' }}>
                <Stack direction={matches ? 'row' : 'column'} gap={3}>
                <Grid>
                            <TextField
                    label={t("Patient Name")}
                    value={pname}
                    onChange={(e) => { setPname(e.target.value) }}
                    sx={{
                      width: matches ? '190px' : '300px',
                      border: '1px solid white',
                      '& .MuiInputLabel-root': {
                         marginTop:'-6px'
                      },
                      '& .MuiInputBase-root': {
                        borderRadius: '100px',
                        border: '1px solid #0a97d1',
                        height: '35px',
                      },
                    }}
                    />
                </Grid>
                <Grid>
                <TextField
                    label={t("Patient Age")}
                    type='number'
                    value={page}
                    onChange={(e) => { setAge(e.target.value) }}
                    sx={{
                      width: matches ? '190px' : '300px',
                      border: '1px solid white',
                      '& .MuiInputLabel-root': {
                         marginTop:'-6px'
                      },
                      '& .MuiInputBase-root': {
                        borderRadius: '100px',
                        border: '1px solid #0a97d1',
                        height: '35px',
                      },
                    }}
                    />
                    </Grid>
                    <Grid>
                    <TextField
                    label={t("Patient Gender")}
                    value={pGender}
                    select
                    onChange={(e) => { setPgender(e.target.value) }}
                    sx={{
                      width: matches ? '188px' : '300px',
                      border: '1px solid white',
                      '& .MuiInputLabel-root': {
                         marginTop:'-6px'
                      },
                      '& .MuiInputBase-root': {
                        borderRadius: '100px',
                        border: '1px solid #0a97d1',
                        height: '35px',
                      },
                    }}
                    >
                  {gender.map((g) => (
                  <MenuItem value={g}>
                    {g}
                  </MenuItem>
                ))}
                </TextField>
                </Grid>
                </Stack>
        </Grid>}
        <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center'}}>
        <Button onClick={()=>{handleClick()}}
        sx={{ color: 'white', padding: '10px', bgcolor: '#0a97d1', marginTop: '20px', width: '300px'
        ,borderRadius:'100px','&:hover ':{bgcolor: '#0a97d1',color:'white'} }}>
            {t('Request Now')}</Button>
            </div>
      </div>
      <LoginDialog open={open} setOpen={setOpen}/>

    </div>
  )
}
