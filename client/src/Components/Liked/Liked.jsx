import React from 'react';
import NavbarContainer from './Navbar/NavbarContainer'
import InfoContainer from '../Info/InfoContainer'
import './Liked.css'
import { connect } from 'react-redux';
import Popular from '../MainPage/Popular';


function Liked(props) {
  debugger
  if (Object.entries(props.liked).filter(item => item[0] !== "count" && item[0] !== "userData").length === 0) return <div className='liked__nothing'>
    <h4 className='liked__nothing-title'>Вам, пока что, ничего не нравится :)</h4>
    <Popular />
  </div>

  return <div className='All'>
    <div className='Navbar'>
      <NavbarContainer />
    </div>
    <div className='Info'>
      <InfoContainer />
    </div>
  </div>
}

let mapStateToProps = (state) => {
  return {
    liked: state.navData.liked,
    navData: state.navData.navData
  }
}

export default connect(mapStateToProps, {})(Liked);