import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Category.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function SingleCard(props) {
    let palces;
    if(JSON.parse(localStorage.getItem('likedStore'))){
        palces=Object.keys(JSON.parse(localStorage.getItem('likedStore')).places)
    }else{
        palces=[]
    }
debugger
    return (
        <div className={s.cinema} key={props.key} >
            <NavLink to={`/places/${props.item.name}`}>
                <div className={s.category__img} style={(props.item.photos.photoLarge && props.item.photos.photoLarge !== '') ?
                    { 'backgroundImage': 'url(' + props.item.photos.photoLarge + ')' }
                    : (props.item.placeCategory === 'Театры') ?
                        { 'backgroundImage': 'url(https://avatars.mds.yandex.net/get-zen_doc/964926/pub_5e95cfdebe5bae634e20a1e3_5e95dac81fba7924e8001525/scale_1200)' }
                        : (props.item.placeCategory === 'Галереи') ?
                            { 'backgroundImage': 'url(https://ru.moscovery.com/wp-content/uploads/2016/03/header-92.jpg)' }
                            : { 'backgroundImage': 'url(https://felicina.ru/wp-content/uploads/2018/05/main2-1.jpg)' }
                }>
                </div> </NavLink>
                <div className={s.name}>
                <NavLink to={`/places/${props.item.name}`}>
                    <div className={s.name_name}>
                        {props.item.name}
                    </div>
                </NavLink>

                    {
               ( props.match.url === '/liked' 
               && palces.length !==0
               //Object.entries(localStorage).filter(item => item[0] !== "count" && item[0] !== "userData").length !== 0
               ) 
               ? <p className={s.liked__delete} onClick={() => { props.likedThunk(props.item.name, props.item) }}>
                    Удалить из избранного
            </p> :
                    <div className={s.liked} onClick={() => {
                        props.likedThunk(props.item.name, props.item)
                    }}>
                        Добавить в избранное {
                            !!props.ls.places ? !!props.ls.places[props.item.name] && <FontAwesomeIcon icon={faHeart} style={{ color: 'red',marginLeft: '5px' }} /> :null
                        }
                    </div>
            }

                    
                </div>
            
        </div>

    );
}

export default SingleCard;