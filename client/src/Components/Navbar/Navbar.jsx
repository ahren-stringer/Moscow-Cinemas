import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'
import logo from '../../img/images.png'
import Introdaction from './Introdaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
//localStorage.clear()

function Navbar(props) {
  let [ls, setLs]=useState(props.liked)

  useEffect(()=>{
    setLs(props.liked)
  },[props.liked])

  const Liked = (name, index) => {
    let counter = +localStorage.getItem('count');
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
      counter = counter - 1
      localStorage.setItem('count', counter)
      props.Setliked({...localStorage})
    } else {
      localStorage.setItem(name, index)
      counter = counter + 1
      localStorage.setItem('count', counter)
      props.Setliked({...localStorage})
    }
    props.setCounter(counter)
    console.log(localStorage)
  }

  let pageCount = Math.ceil(props.totalCount / props.onOnePage);
  let arr = [];
  for (let i = 1; i <= pageCount; i++) {
    arr.push(i)
  }
  let onPageChange = (e) => {
    props.SetPageCount(props.numberOfPage + 1)
    props.onPageChange(props.numberOfPage*props.onOnePage)
  };

  let navData=Object.values(props.navData)
  return (
    <div>
      <Introdaction/>
      <div className={s.nav}>
        {
          navData.map((item, index, array) => {
            if (array.indexOf(item) === index) {
              return <div className={s.cinema}>
                <NavLink to={`/cinema/${item.Cells.CommonName}`}>
                  <img src={logo}></img>
                  <div className={s.name}>
                    {item.Cells.CommonName}
                  </div>
                </NavLink>
                <div className={s.liked} onClick={() => {
                  Liked(item.Cells.CommonName
                    , index)
                }}>
                  Добавить в избранное {
                    !!ls[item.Cells.CommonName] && <FontAwesomeIcon icon={faHeart} style={{color: 'red'}} />
                  }
                </div>
              </div>
            }
          })
        }
      </div>
      <div onClick={onPageChange} className={s.pagination}>
        <h4>Загрузить еще</h4>
      </div>
    </div>
  );
}

export default Navbar;