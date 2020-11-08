import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'
import logo from '../../img/images.png'
//localStorage.clear()

function Navbar(props) {
  let [follow, followFlag]=useState(props.liked)

  useEffect(()=>{
    followFlag(props.liked)
  },[props.liked])

  const Liked=(name,index)=>{
    let counter=+localStorage.getItem('count');
    if (localStorage.getItem(name)){
      localStorage.removeItem(name)
      counter=counter-1
      localStorage.setItem('count',counter)
      followFlag(false)
    }else{
      localStorage.setItem(name,index)
      counter=counter+1
      localStorage.setItem('count',counter)
      followFlag(false)
    }
    props.setCounter(counter)
    console.log(localStorage)
  }

  let pageCount = Math.ceil(props.totalCount / props.onOnePage);
    let arr = [];
    for (let i = 1; i <= pageCount; i++) {
        arr.push(i)
    }
  let onPageChange=(numberOfPage)=>{
      props.onPageChange(numberOfPage)
  };
  return (
    <div>
      <div className={s.nav}>
      {
        props.navData.map((item, index, array) => {
          return <div className={s.cinema}>
            <NavLink to={`/cinema/${item.Cells.CommonName}`}>
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
        })
      }
      </div>
      <div className={s.pagination}>
        {
            arr.map((item, index) => <span
                onClick={() => {debugger
                  onPageChange(index) }}>{item}</span>)
        }
    </div>
    </div>
  );
}

export default Navbar;