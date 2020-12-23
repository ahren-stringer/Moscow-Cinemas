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

  return (
    <div className={s.description}>

          <div className={s.description__place} style={{
            'backgroundImage': 'url(' + props.infoData[0].photos.photoLarge + ')',
            'minHeight': '200px',
            'width': '100%',
            'backgroundSize': 'cover',
            'backgroundPosition': 'center center',
            'position': 'relative',
            'borderRadius': '4px',
            'margin': '20px 0 10px'
          }}>
            {props.infoData[0].name}
          </div>
          <div className={s.description__wrapper}>
        <div className={s.description__info}>
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
            Сайт: <a href={'http://www.' + props.infoData[0].webSite}>{props.infoData[0].webSite}</a>
          </div>
        </div>

        <div className={s.photos__galery}>
          {props.infoData[0].photos.photosSlider ? props.infoData[0].photos.photosSlider.map(item => {
            images.push(
              {
                original: item,
                thumbnail: item,

              },
            )
            // return <img src={item}></img>
          })
            : <div>
              <h3>Фотокарточки</h3>
            </div>}

          <ImageGallery items={images} showNav={false} showFullscreenButton={false} showPlayButton={false}/>
        </div>
      </div>


      <div
        className={s.description__liked} 
        onClick={() => { Liked(props.infoData[0].name, props.infoData[0].name) }}>
        <span style={{marginRight: '10px'}}>Добавить в избранное</span>
        {
          !!ls[props.infoData[0].name] && <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
        }
      </div>
    </div>
  );
}

export default Description
