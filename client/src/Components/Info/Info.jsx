import React from 'react';
import s from './Info.module.css'
import Description from './Description';
import InfoMap from './InfoMap';
import Coments from './Coments';

const Info = (props) => {
  return (
    <div>
      <Description infoData={props.infoData} />
      <InfoMap infoData={props.infoData} />
      <Coments id={props.match.params.id} infoData={props.infoData} token={props.token}/>
    </div>
  );

}

export default Info
