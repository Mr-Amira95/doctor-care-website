import React from 'react'
import pic from '../doctor_care_logo.png';
import { Typography,Menu ,Grid ,MenuItem, Button, useMediaQuery, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SortIcon from '@mui/icons-material/Sort';
import { useLocation } from 'react-router-dom';
import ProductCards from '../Components/ProductCards';

export default function ProductsPage({setNav}) {
    const [menu, setMenu] = React.useState(null);
    const location = useLocation();
    const { state } = location;
    const { allproduct } = state;
    const { t } = useTranslation();
    const matches = useMediaQuery('(min-width:740px)');
    const [sortedCat, setSortedCat] = React.useState(allproduct); 
    React.useEffect(()=>{
      setNav(true)
      window.scrollTo(0,0)
    },[])
    const handleAlphabet = () => {
        setMenu(null);
        const sortedByAlphabet = allproduct.sort((a, b) => a.title.localeCompare(b.title));
        setSortedCat(sortedByAlphabet);
      };
    
      const handlePrice = () => {
        setMenu(null);
        const sortedByPrice = allproduct.sort((a, b) => {
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

  return (
    <div style={{ marginBottom: '30px',overflowX: 'hidden', }}>
    <img
      style={{
        height: '400px',
        objectFit: 'fill',
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
        top: matches?'78px':'115px',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '400px',
      }}
    ></div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ color: 'white', position: 'absolute', top: '41%', fontWeight: 'bold', fontSize: '40px' }}>
                Products
                </Typography>
      </div>

      <Stack  direction='row'  gap='77rem' sx={{ padding: '30px',display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center' }}>
        <Grid item xs={6} style={{ border: 'none' }}>
          <Grid container component="div" spacing={0} direction="column" alignItems="center">
            <Grid item>
              <Typography sx={{ fontSize: '16px' }}>{sortedCat.length} {t('Products found')}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ border: 'none' }}>
          <Grid container component="div" spacing={0} direction="column" alignItems="center">
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
                    {t('Price Sort')}
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

     {allproduct.length > 0 ?
      <ProductCards product={sortedCat} />
      :  <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',}}>
      <Typography sx={{color:'#0a97d1',padding:'15px', border:'1px solid #0a97d1',width:'250px',
      display:'flex',flexWrap:'wrap',justifyContent:'center',alignItems:'center',}} 
     >{t('No Products Found')}</Typography>
  </div>}
    </div>

    
  )
}
