import React from 'react';
import s from './Info.module.css'

const Description=(props)=>{
 
    return (
      <div>
        <div>
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
          Сайт: {props.infoData[0].Cells.WebSite}
        </div>
      </div>
    );
}

export default Description
