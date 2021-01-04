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

function NavbarCard(props) {
  let [ls, setLs] = useState(props.liked);

  useEffect(() => {
    setLs(props.liked)
  }, [props.liked])

  const Liked = (name, item) => {
    let counter = +localStorage.getItem('count');
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
      counter = counter - 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
    } else {
      localStorage.setItem(name, JSON.stringify(item))
      counter = counter + 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
    }
    props.setCounter(counter)
    console.log(localStorage)
  }
  debugger
  return (
    <div>
      <div className={s.nav__wrapper}>
        <div className={s.nav}>

          {
            props.navData.map((item) => {

              return <div className={s.cinema}>
                <NavLink to={`/cinemas/${item.name}`}>
                  <div className={s.nav__img} style={(item.photos.photoLarge && item.photos.photoLarge != '') ?
                    { 'backgroundImage': 'url(' + item.photos.photoLarge + ')' }
                    : {'backgroundImage': 'url(https://avatars.mds.yandex.net/get-zen_doc/964926/pub_5e95cfdebe5bae634e20a1e3_5e95dac81fba7924e8001525/scale_1200)'}}>
                  </div>
                <div className={s.name}>
                  {item.name}
                </div>
                </NavLink>
              {
                props.match.url === '/liked' ? <p onClick={() => { Liked(item.name, item) }}>
                  Удалить из избранного
            </p> :
                  <div className={s.liked} onClick={() => {
                    Liked(item.name, item)
                  }}>
                    Добавить в избранное {
                      !!ls[item.name] && <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                    }
                  </div>
              }
              </div>
            })
          }
        </div>
    </div>
    </div >
  );
}

export default NavbarCard;