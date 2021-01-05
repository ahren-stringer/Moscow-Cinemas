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
                    : (item.placeCategory == 'Театры') ?
                      { 'backgroundImage': 'url(https://avatars.mds.yandex.net/get-zen_doc/964926/pub_5e95cfdebe5bae634e20a1e3_5e95dac81fba7924e8001525/scale_1200)' }
                      : (item.placeCategory == 'Галереи') ?
                        { 'backgroundImage': 'url(https://ru.moscovery.com/wp-content/uploads/2016/03/header-92.jpg)' }
                        : { 'backgroundImage': 'url(data:image/jpeg;base64,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)' }
                  }>
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