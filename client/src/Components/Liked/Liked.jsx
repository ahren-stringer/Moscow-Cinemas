import React from 'react';
import NavbarContainer from './Navbar/NavbarContainer'
import InfoContainer from './Info/InfoContainer'
import s from './../All/All.module.css'


function Liked() {
  return <div className={s.All}>
  <div className={s.Navbar}>
      <NavbarContainer />
  </div>
  <div className={s.Info}>
      <InfoContainer/>
  </div>
</div>
}

export default Liked;