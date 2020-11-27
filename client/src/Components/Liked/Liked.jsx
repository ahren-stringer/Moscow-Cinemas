import React from 'react';
import NavbarContainer from './Navbar/NavbarContainer'
import InfoContainer from '../Info/InfoContainer'
import s from './Liked.css'


function Liked() {
  return <div className='All'>
  <div className='Navbar'>
      <NavbarContainer />
  </div>
  <div className='Info'>
      <InfoContainer/>
  </div>
</div>
}

export default Liked;