import React, { useEffect, useState } from 'react';
import s from './Info.module.css'
import axios from 'axios';
import Preloader from '../Preloader/Preloader';

const Description=(props)=>{
  let [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('http://localhost:8001/cinema/photos');
      req.data.map((item)=>{
        if (item.cinema==props.infoData[0].Cells.CommonName ) setPhotos(item.photosSlider)
      })
      //setPhotos(req.data)
      console.log(req.data)
    }
    fetchData()
  }, [])

  // useEffect(() => {
  //   debugger
  //   setPhotos(photos)
  // }, [photos])
 
    return (
      <div className={s.description}>
        <div className={s.description__cinema}>
          {props.infoData[0].Cells.CommonName}
        </div>
        <div>
          Адрес: {props.infoData[0].Cells.ObjectAddress[0].Address}
        </div>
        <div>
          Телефоны: {props.infoData[0].Cells.PublicPhone.map(item => <div>{item.PublicPhone[0]}</div>)}
        </div>
        <div>
          E-mail: {props.infoData[0].Cells.Email[0].Email[0]}
        </div>
        <div>

          Часы работ: {props.infoData[0].Cells.WorkingHours.map(item => <div>
          <span>{item.DayWeek}</span>: <span>{item.WorkHours}</span>
        </div>)}

        </div>
        <div>
          Количество залов: {props.infoData[0].Cells.NumberOfHalls}
        </div>
        <div>
        Сайт: <a href={'http://www.'+props.infoData[0].Cells.WebSite}>{props.infoData[0].Cells.WebSite}</a> 
        </div>
        <div>
          {photos ? photos.map(item=>{
            return <img src={item}></img>
          }) 
          :<Preloader/>}
        </div>
      </div>
    );
}

export default Description
