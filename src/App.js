import './App.css';
import { HelmetProvider } from 'react-helmet-async';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import MainPage from './Pages/MainPage';
import Footer from './Footer';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import { createTheme , ThemeProvider} from '@mui/material';
import CategoryPage from './Pages/CategoryPage';
import ServiceDetails from './Pages/ServiceDetails';
import Checkout from './Pages/Checkout';
import ProductsPage from './Pages/ProductsPage';
import ProductsDetails from './Pages/ProductsDetails';
import { useSelector } from 'react-redux';
import React, {useEffect, useState} from 'react'
import LoginDialog from './Components/LoginDialog';
import DashBoardAdresses from './Pages/DashBoardAdresses';
import DashBoardService from './Pages/DashBoardService';
import DashBoardProduct from './Pages/DashBoardProduct';
import DashBoardSupport from './Pages/DashBoardSupport';
import DashBoardProfile from './Pages/DashBoardProfile';

function App() {
  const [open, setOpen] = useState(true);
  const [nav, setNav] = useState(false);
  const [name,setName]=React.useState('')

  const lang = localStorage.getItem('lang')
  
  const theme = createTheme({
    typography: {
      fontFamily: 'arial',
    }
  });
  useEffect(()=>{
    if(!lang){
      localStorage.setItem('lang','en')
    }
  },[])
  const auth = useSelector(state => state.auth.Authinticate)
  return (
    <div style={{direction:lang==='ar'?'rtl':'ltr'}}>
     <HelmetProvider>
        <HashRouter>
        <ThemeProvider theme={theme}>
        <Navbar nav={nav} />
        <Routes>
        <Route path="/" element= {<MainPage setNav={setNav} />}/>
        <Route path="/PrivacyPolicy" element= {<PrivacyPolicy setNav={setNav}/>}/>
        <Route path="/CategoryPage" element= {<CategoryPage setNav={setNav}/>}/>
        <Route path="/ServiceDetails" element= {<ServiceDetails setNav={setNav}/>}/>
        <Route path="/Checkout" element={!auth ? <LoginDialog open={open} setOpen={setOpen}/> : <Checkout setNav={setNav}/>} />
        <Route path="/ProductsPage" element= {<ProductsPage setNav={setNav}/>}/>
        <Route path="/ProductsDetails" element= {<ProductsDetails setNav={setNav}/>}/>
        <Route path="/DashBoardAddresses" element={!auth ? <LoginDialog open={open} setOpen={setOpen}/> : <DashBoardAdresses setNav={setNav}/>} />
        <Route path="/DashBoardService" element={!auth ? <LoginDialog open={open} setOpen={setOpen}/> : <DashBoardService setNav={setNav}/>} />
        <Route path="/DashBoardProduct" element={!auth ? <LoginDialog open={open} setOpen={setOpen}/> : <DashBoardProduct setNav={setNav}/>} />
        <Route path="/DashBoardSupport" element={!auth ? <LoginDialog open={open} setOpen={setOpen}/> : <DashBoardSupport setNav={setNav}/>} />
        <Route path="/DashBoardProfile" element={!auth ? <LoginDialog open={open} setOpen={setOpen}/> : <DashBoardProfile setNav={setNav}/>} />

    </Routes>
    <Footer nav={nav} />
    </ThemeProvider>
        </HashRouter>
        </HelmetProvider>
    </div>
  );
}

export default App;
