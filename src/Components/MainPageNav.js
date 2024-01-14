import React from 'react'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next';

export default function MainPageNav() {
    const { t  } = useTranslation();
    const pages = [t('Get In Touch'),t('Products'),t('Features Services'),t('About Us'),t('Categories'),t('Home')];
    const handleNavigation=(i) =>{
    const sectionElement = document.getElementById(i);
    sectionElement.scrollIntoView();
  }
  return (
    <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',justifyContent:'center',padding:'20px',gap:'20px'}}>
        {pages.map((page,i) => (
      <Button sx={{ color: 'black', '&:focus': {color :'#0a97d1'} }} key={page}
      onClick={()=>{handleNavigation(pages[i])}} 
              >
                {page}
              </Button>
        ))}
    </div>
  )
}
