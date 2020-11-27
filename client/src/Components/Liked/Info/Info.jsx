import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as axios from 'axios';
import Preloader from '../../Preloader/Preloader';

let Info = (props) => {

  let [infoData, setInfoData] = useState(props.infoData);
  let [infoFlag, setInfoFlag] = useState(false);

  useEffect(async () => {
    let id = props.match.params.id;
    let req = '';
    debugger
    if (id) {
      setInfoFlag(true)
      req = await axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?&$filter=substringof(%27${id}%27,Cells/CommonName)&api_key=c70b711784b712cbe482f9701909fd97`)
      setInfoData(req.data)
      setInfoFlag(false)
    }else{
      props.setInfoData(null)
    }
  }, [props.match.params.id])

  if (infoFlag) return <Preloader />

  return (
    <div>
      <div>
        {infoData[0].Cells.CommonName}
      </div>
      <div>
        Адрес: {infoData[0].Cells.ObjectAddress[0].Address}
      </div>
      <div>
        Телефоны: {infoData[0].Cells.PublicPhone.map(item => <div>{item.PublicPhone[0]}</div>)}
      </div>
      <div>
        E-mail: {infoData[0].Cells.Email[0].Email[0]}
      </div>
      <div>

        Часы работ: {infoData[0].Cells.WorkingHours.map(item => <div>
        <span>{item.DayWeek}</span>: <span>{item.WorkHours}</span>
      </div>)}

      </div>
      <div>
        Количество залов: {infoData[0].Cells.NumberOfHalls}
      </div>
      <div>
        Сайт: {infoData[0].Cells.WebSite}
      </div>
    </div>
  );
}

export default compose(
  withRouter
)(Info)
