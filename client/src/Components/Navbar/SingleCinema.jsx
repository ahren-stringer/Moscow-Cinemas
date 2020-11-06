import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'
import logo from '../../img/images.png'

function SingleCinema(props) {

  return (
    <div className={s.cinema}>
            <NavLink to={`/all/${index}`}>
            <img src={logo}></img>
              <div className={s.name}>
                {item.Cells.CommonName}
              </div>
            </NavLink>
            <div className={s.liked} onClick={()=>{Liked(item.Cells.CommonName
              ,index)}}>
              Добавить в избранное {
               !!localStorage.getItem(item.Cells.CommonName) && <span>+</span>
              }
            </div>
          </div>
  );
}

export default SingleCinema;