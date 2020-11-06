import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as axios from 'axios';

class Info extends React.Component{
  componentDidUpdate(prevProps,prevState){
    console.log('udate')
    if (prevProps.infoData[0].Cells.CommonName == this.props.infoData[0].Cells.CommonName){
      let id=this.props.match.params.id;
    axios.get(`https://apidata.mos.ru/v1/datasets/495/rows?$skip=${id}&$top=1&api_key=c70b711784b712cbe482f9701909fd97`,{
        withCredentials:false
    }).then(response=>{
        console.log(response.data)
        this.props.setInfoData(response.data)
    })
    }
}
  render(){
    return (
      <div>
        <div>
          {this.props.infoData[0].Cells.CommonName}
        </div>
        <div>
          Адрес: {this.props.infoData[0].Cells.ObjectAddress[0].Address}
        </div>
        <div>
          Телефоны: {this.props.infoData[0].Cells.PublicPhone.map(item => <div>{item.PublicPhone[0]}</div>)}
        </div>
        <div>
          E-mail: {this.props.infoData[0].Cells.Email[0].Email[0]}
        </div>
        <div>

          Часы работ: {this.props.infoData[0].Cells.WorkingHours.map(item => <div>
            <span>{item.DayWeek}</span>: <span>{item.WorkHours}</span>
        </div>)}

        </div>
        <div>
          Количество залов: {this.props.infoData[0].Cells.NumberOfHalls}
        </div>
        <div>
          Сайт: {this.props.infoData[0].Cells.WebSite}
        </div>
      </div>
    );
  }
 
}

export default compose(
  withRouter
)(Info)
