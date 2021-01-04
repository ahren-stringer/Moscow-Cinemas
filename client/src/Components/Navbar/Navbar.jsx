import React from 'react';
import s from './Navbar.module.css'
import Introdaction from './Introdaction';
import NavbarCard from './NavbarCard';

function Navbar(props) {

  let onPageChange = (e) => {
    props.SetPageCount(props.numberOfPage + 1)
    props.onPageChange(props.numberOfPage * props.onOnePage, props.type, props.navData)
  };

  debugger
  return (
    <div>
      <Introdaction typeTitle={props.typeTitle} />
      <NavbarCard liked={props.liked}
        navData={props.navData}
        Setliked={props.Setliked}
        setCounter={props.setCounter}
        match={props.match}/>
      {props.categoryCount === props.navData.length ? null :
        <div onClick={onPageChange} className={s.pagination}>
          <h4>Загрузить еще</h4>
        </div>
        }
    </div>
  );
}

export default Navbar;