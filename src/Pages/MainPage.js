import React, { useEffect, useState } from 'react';
import MainPageNav from '../Components/MainPageNav';
import Sliders from '../Components/Sliders';
import axios from 'axios';
import Categories from '../Components/Categories';
import AboutUs from '../Components/AboutUs';
import Services from '../Components/Services';
import ContactUs from '../Components/ContactUs';
import Products from '../Components/Products';
import LoadingPage from '../Components/LoadingPage';

export default function MainPage({setNav}) {
  const [images, setImages] = useState([]);
  const [cat, setCat] = useState([]);
  const [about, setAbout] = useState({});
  const [services, setServices] = useState([]);
  const [product, setProduct] = useState([]);
  const [allproduct, setAllProduct] = useState([]);
  const [open, setOpen] = React.useState(true);

  const lang = localStorage.getItem('lang');

  useEffect(() => {
    setNav(true)
    window.scrollTo(0, 0);
    axios
      .get(`${process.env.REACT_APP_API_URL}home_page`, {
        headers: {
          lang: lang,
        },
      })
      .then((res) => {
        setImages(res.data.data.sliders);
        setCat(res.data.data.categories);
        setAbout(res.data.data.about_us);
        setServices(res.data.data.services.slice(0, 4));
        setProduct(res.data.data.products.slice(0, 4));
        setAllProduct(res.data.data.products);
        setOpen(false);
        window.scrollTo(0, 0);
      });
  }, []);

  return (
    <div style={{ direction: lang === 'ar' ? 'ltr' : 'rtl' }}>
      {open && <LoadingPage open={open} />}
      {!open && (
        <>
          <MainPageNav />
          <Sliders images={images} />
          <Categories cat={cat}  />
          <AboutUs about={about} />
          <Services services={services} />
          <Products product={product} allproduct={allproduct} />
          <ContactUs />
        </>
      )}
    </div>
  );
}