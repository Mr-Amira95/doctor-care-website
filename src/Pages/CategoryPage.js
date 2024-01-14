import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import pic from '../doctor_care_logo.png';
import { Typography, Grid, Menu, Button, MenuItem, Stack, useMediaQuery } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ServicesCards from '../Components/ServicesCards';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function CategoryPage({setNav}) {
  const location = useLocation();
  const { state } = location;
  const { id, name } = state;
  const [menu, setMenu] = useState(null);
  const { t } = useTranslation();
  const [sortedCat, setSortedCat] = useState([]);
  const matches = useMediaQuery('(min-width:740px)');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}${id}/all_services`).then((res) => {
      setSortedCat(res.data.data.services);
      console.log(res.data.data)
    });
    setNav(true)
  }, []);

  const handleAlphabet = () => {
    setMenu(null);
    const sortedByAlphabet = sortedCat.sort((a, b) => a.title.localeCompare(b.title));
    setSortedCat(sortedByAlphabet);
  };

  const handlePrice = () => {
    setMenu(null);
    const sortedByPrice = sortedCat.sort((a, b) => {
      const priceA = typeof a.price === 'string' ? parseFloat(a.price.split(' ')[0]) : a.price;
      const priceB = typeof b.price === 'string' ? parseFloat(b.price.split(' ')[0]) : b.price;
      return priceA - priceB;
    });
    setSortedCat(sortedByPrice);
  };

  const handleRate = () => {
    setMenu(null);
    const sortedByRate = sortedCat.sort((a, b) => {
      const rateA = a.reviews? a.reviews : 0;
      const rateB = b.reviews? b.reviews : 0;
      return rateB - rateA;
    });
    setSortedCat(sortedByRate);
  };

  const handleMenu = () => {
    setMenu(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ marginBottom: '30px', overflowX: 'hidden' }}>
      <img
        style={{
          height: '400px',
          objectFit: 'contain',
          display: 'block',
          maxWidth: '100%',
          overflow: 'hidden',
          width: '100%',
        }}
        alt='Loading ...'
        src={pic}
      />
      <div
        style={{
          position: 'absolute',
          top: matches ? '78px' : '115px',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          height: '400px',
        }}
      ></div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ color: 'white', position: 'absolute', top: '41%', fontWeight: 'bold', fontSize: '40px' }}>
          {name}
        </Typography>
      </div>

      <Stack direction='row' gap='77rem' sx={{ padding: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={6} style={{ border: 'none' }}>
          <Grid component="div" spacing={0} direction="column" alignItems="center">
            <Grid item>
              <Typography sx={{ fontSize: '16px' }}>{sortedCat.length} {t('services found')}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ border: 'none' }}>
          <Grid component="div" spacing={0} direction="column" alignItems="center">
            <Grid item>
              <SortIcon onClick={(event) => setMenu(event.currentTarget)} sx={{ cursor: 'pointer' }} />
              <Menu
                anchorEl={menu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(menu)}
                onClose={handleMenu}
              >
                <MenuItem>
                  <Button sx={{ color: 'black' }} onClick={handleAlphabet}>
                    {t('Alphabet Sort')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button sx={{ color: 'black' }} onClick={handlePrice}>
                    {t('PriceSort')}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button sx={{ color: 'black' }} onClick={handleRate}>
                    {t('Rate Sort')}
                  </Button>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
      
      {sortedCat && sortedCat.length > 0 ? (
        <ServicesCards cat={sortedCat} />
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            sx={{
              color: '#0a97d1',
              padding: '15px',
              border: '1px solid #0a97d1',
              width: '250px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {t('No Services Found')}
          </Typography>
        </div>
      )}
    </div>
  );
}