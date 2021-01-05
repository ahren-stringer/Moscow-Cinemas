import React, { useEffect, useState } from 'react';
import s from './Info.module.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Preloader from '../Preloader/Preloader';
import ImageGallery from 'react-image-gallery';

const Description = (props) => {
  let [ls, setLs] = useState(props.liked);

  const images = [];

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
  debugger
  return (
    <div className={s.description}>

      {/* <div className={s.description__place}
        style={{ 'backgroundImage': 'url(' + props.infoData[0].photos.photoLarge + ')' }}
      >
        {props.infoData[0].name}
      </div> */}
      <div className={s.description__place} style={(props.infoData[0].photos.photoLarge && props.infoData[0].photos.photoLarge != '') ?
        { 'backgroundImage': 'url(' + props.infoData[0].photos.photoLarge + ')' }
        : { 'backgroundImage': 'url(https://avatars.mds.yandex.net/get-zen_doc/964926/pub_5e95cfdebe5bae634e20a1e3_5e95dac81fba7924e8001525/scale_1200)' }}>
        {props.infoData[0].name}
      </div>
      <div className={s.description__wrapper}>
        <div className={s.description__info}>
          <div className={s.description__item}>
            <span className={s.description__item_title}>Адрес:</span> {props.infoData[0].address}
          </div>
          <div className={s.description__item}>
            <span className={s.description__item_title}>Телефоны:</span> {props.infoData[0].phones.map(item => <div>{item}</div>)}
          </div>
          <div className={s.description__item}>
            <span className={s.description__item_title}>E-mail:</span> {props.infoData[0].email}
          </div>
          <div className={s.description__item}>
            <span className={s.description__item_title}>Часы работ:</span> {props.infoData[0].workHours.map(item => <div>
              <span>{item.DayWeek}</span>: <span>{item.WorkHours}</span>
            </div>)}
          </div>
          <div className={s.description__item}>
            <span className={s.description__item_title}>Количество залов:</span> {props.infoData[0].numberOfHalls}
          </div>
          <div className={s.description__item}>
            <span className={s.description__item_title}>Сайт:</span> <a href={'http://www.' + props.infoData[0].webSite}>{props.infoData[0].webSite}</a>
          </div>
        </div>

        <div className={s.photos__galery}>
          {(props.infoData[0].photos.photosSlider && props.infoData[0].photos.photosSlider[0] != '') ? props.infoData[0].photos.photosSlider.map(item => {
            images.push(
              {
                original: item,
                thumbnail: item,

              })
          })
            : null
          }

          <ImageGallery items={images} showNav={false} showFullscreenButton={false} showPlayButton={false} />
        </div>
      </div>


      <div
        className={s.description__liked}
        onClick={() => { Liked(props.infoData[0].name, props.infoData[0].name) }}>
        <span style={{ marginRight: '10px' }}>Добавить в избранное</span>
        {
          !!ls[props.infoData[0].name] && <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
        }
      </div>
    </div>
  );
}

export default Description
