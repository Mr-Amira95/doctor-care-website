import React from 'react'
import Form from './Form'
import CompanyInfo from './CompanyInfo'
import { Stack, useMediaQuery } from '@mui/material'
import pic from '../doctor_care_logo.png';
import { useTranslation } from 'react-i18next';

export default function ContactUs() {
    const matches = useMediaQuery('(min-width:960px)');
    const { t  } = useTranslation();

  return (
    <div id={t('Get In Touch')} style={{position:'relative',marginBottom:matches?'':'30px'}}>
      <Stack>
                <img
                        style={{
                            height: matches?'500px':'1000px',
                            objectFit: 'contain',
                            display: 'block',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            width: '100%',
                        }}
                        alt='Loading ...'
                        src={pic}
                    />
                   <div className="overlay">
        <Stack direction={matches ? 'row' : 'column'} gap={10} sx={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
      <CompanyInfo t={t} matches={matches}/>
      <Form t={t}/>
      </Stack>
      </div>
      </Stack>
    </div>
  )
}
