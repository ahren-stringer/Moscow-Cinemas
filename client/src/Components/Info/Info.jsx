import React from 'react';
import s from './Info.module.css'
import Description from './Description';
import InfoMap from './InfoMap';
import Coments from './Coments';

const Info = (props) => {
debugger
  let textarea = React.createRef();

  let onComentChange = () => {
    props.ComentChange(textarea.current.value)
  }

  let Coment = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: textarea.current.value,
        userId: 2,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((json) => {
        console.log(json)
        props.setComent(json)
      })
  }

  return (
    <div>
      <Description infoData={props.infoData} />
      <InfoMap infoData={props.infoData} />
      <Coments id={props.match.params.id}/>
    </div>
  );

}

export default Info
