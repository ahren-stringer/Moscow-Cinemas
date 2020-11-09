import React from 'react';
import s from './Navbar.module.css'

function Introdaction(props) {
  return <div className={s.intro}>
    <h3>Кинотеатры города Москвы</h3>
    <div >
      Информация о кинотеатрах, взятая из официального портала откратых данных Правительства города Москвы
    </div>
  </div>
}
export default Introdaction