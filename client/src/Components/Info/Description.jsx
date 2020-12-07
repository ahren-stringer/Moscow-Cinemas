import React, { useEffect, useState } from 'react';
import s from './Info.module.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Preloader from '../Preloader/Preloader';

const Description=(props)=>{
  let [ls, setLs] = useState(props.liked);

  useEffect(() => {
    setLs(props.liked)
  }, [props.liked])

  const Liked = (name, index) => {
    let counter = +localStorage.getItem('count');
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
      counter = counter - 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
    } else {
      localStorage.setItem(name, index)
      counter = counter + 1
      localStorage.setItem('count', counter)
      props.Setliked({ ...localStorage })
    }
    props.setCounter(counter)
    console.log(localStorage)
  }
  
    return (
      <div className={s.description}>
        <div className={s.description__cinema}>
          {props.infoData[0].name}
        </div>
        <div>
          Адрес: {props.infoData[0].address}
        </div>
        <div>
          Телефоны: {props.infoData[0].phones.map(item => <div>{item}</div>)}
        </div>
        <div>
          E-mail: {props.infoData[0].email}
        </div>
        <div>

          Часы работ: {props.infoData[0].workHours.map(item => <div>
          <span>{item.DayWeek}</span>: <span>{item.WorkHours}</span>
        </div>)}

        </div>
        <div>
          Количество залов: {props.infoData[0].numberOfHalls}
        </div>
        <div>
        Сайт: <a href={'http://www.'+props.infoData[0].webSite}>{props.infoData[0].webSite}</a> 
        </div>
        <div>
          {props.infoData[0].photos.photosSlider ? props.infoData[0].photos.photosSlider.map(item=>{
            return <img src={item}></img>
          }) 
          :<div>
            <h3>Фотокарточки</h3>
            </div>}
            <div 
            //className={s.liked} 
            onClick={() => {Liked(props.infoData[0].name, props.infoData[0].name)}}>
                  Добавить в избранное {
                    !!ls[props.infoData[0].name] && <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                  }
                </div>
        </div>
      </div>
    );
}

export default Description
