// import { Container } from '@mui/material'
// import React from 'react'

// export default function LoadingPage() {
//   return (
//     <div style={{direction:'ltr'}}>
//         <Container>
//       <div class="loading-container">
//   <div class="loading-text">
//     <span className='ss'>L</span>
//     <span className='ss'>O</span>
//     <span className='ss'>A</span>
//     <span className='ss'>D</span>
//     <span className='ss'>I</span>
//     <span className='ss'>N</span>
//     <span className='ss'>G</span>
//   </div>
// </div>
// </Container>
//     </div>
//   )
// }


import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop({open, setOpen}) {
  const windowHeight = React.useRef(window.innerHeight);

  return (
    <div style={{height: windowHeight.current}}>
     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}