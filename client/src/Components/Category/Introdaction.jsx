import React from 'react';
import s from './Category.module.css'

function Introdaction(props) {

  let thumbCheck = async (thumb,cat) => {
    let response = await fetch(thumb);

    if (response.ok) { 
        return thumb
      } else if(thumb === ''){
        //alert("Ошибка HTTP: " + response.status);
        if (cat=== 'Театры'){
            return 'https://avatars.mds.yandex.net/get-zen_doc/964926/pub_5e95cfdebe5bae634e20a1e3_5e95dac81fba7924e8001525/scale_1200'
        }else if(cat=== 'Галереи'){
            return 'https://ru.moscovery.com/wp-content/uploads/2016/03/header-92.jpg'
        }else if(cat=== 'Кинотеатры'){
            return '../../img/cinema.jpg'
        }
        else if(cat=== 'Музеи'){
            return '.https://felicina.ru/wp-content/uploads/2018/05/main2-1.jpg'
        }

      }else{
        return '../../img/cinema.jpg'
      }

  };


  return <div className={s.intro}>
    <h3>{props.typeTitle} города Москвы</h3>
    <div >
      
    </div>
  </div>
}
export default Introdaction