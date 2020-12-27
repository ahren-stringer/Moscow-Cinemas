import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'
import logo from '../../img/images.png'
import Introdaction from './Introdaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
//localStorage.clear()

function Navbar(props) {
  let [ls, setLs] = useState(props.liked);
  
  useEffect(() => {
    setLs(props.liked)
  }, [props.liked])

  const Liked = (name, categoryUrl) => {
    let counter = +localStorage.getItem('count');
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
      counter = counter - 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
    } else {
      localStorage.setItem(name, categoryUrl)
      counter = counter + 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
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
    props.onPageChange(props.numberOfPage * props.onOnePage, props.type, props.navData)
  };
debugger
  return (
    <div>
      <Introdaction typeTitle={props.typeTitle} />
      <div className={s.nav__wrapper}>
      <div className={s.nav}>
        
        {
          props.navData.map((item, index, array) => {
            
              return <div className={s.cinema}>
                <NavLink to={`/cinemas/${item.name}`}>
                  <div style={{
                    'backgroundImage': 'url(' + item.photos.photoLarge + ')',
                    'minHeight': '185px',
                    'width': '100%',
                    'backgroundSize': 'cover',
                    'backgroundPosition': 'center center',
                  }}>
                  </div>
                  <div className={s.name}>
                    {item.name}
                  </div>
                </NavLink>
                <div className={s.liked} onClick={() => {
                  Liked(item.name, item.categoryUrl)
                }}>
                  Добавить в избранное {
                    !!ls[item.name] && <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                  }
                </div>
              </div>          
          })
        }
        </div>
      </div>
      <div onClick={onPageChange} className={s.pagination}>
        <h4>Загрузить еще</h4>
      </div>
    </div>
  );
}

export default Navbar;