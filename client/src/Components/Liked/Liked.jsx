import React, { useState } from 'react';
import InfoContainer from '../Info/InfoContainer'
import './Liked.css'
import { connect } from 'react-redux';
import Popular from '../MainPage/Popular';
import Navbar from '../Navbar/Navbar';
import NavbarCard from '../Navbar/NavbarCard';
import { Setliked } from '../../redux/navReduser';
import { setCounter } from '../../redux/headerReduser';
import { withRouter } from 'react-router-dom';


function Liked(props) {
  debugger
  let [ls, setLs] = useState(props.liked);
  let navData = Object.entries(ls).filter(item => item[0] !== "count" && item[0] !== "userData")
  .map(item => JSON.parse(item[1])) 
  if (Object.entries(props.liked).filter(item => item[0] !== "count" && item[0] !== "userData").length === 0) return <div className='liked__nothing'>
    <h4 className='liked__nothing-title'>Вам, пока что, ничего не нравится :)</h4>
    <Popular />
  </div>

  return <div>
    <div>
      <h3 className='favorite__title'>
        Избранное
      </h3>
    </div>
<NavbarCard liked={props.liked}
    navData={navData}
    Setliked={props.Setliked}
    setCounter={props.setCounter}
    match={props.match}/>
  </div>
  

}

let mapStateToProps = (state) => {
  return {
    liked: state.navData.liked,
    navData: state.navData.navData
  }
}

export default connect(mapStateToProps, { Setliked, setCounter })(withRouter(Liked));