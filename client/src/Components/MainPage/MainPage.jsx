import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MainPage.css'
import Popular from './Popular';
import {MainPageAPI} from '../../API/api'

function MainPage() {

    let [categores, setCategores] = useState(null);

    useEffect(
        async ()=> {
            const req = await MainPageAPI.getCategories()
            setCategores(req)
        }
        , [])

    return (
        <div>
                        <div className='title__slide-1'>
                            
            <div id='trapezoid'><span></span></div>

                        <div className='title_wrapp'>

                        <div className='__container'>

                            <div className='title__slide-container'>
                                <h3>Добро пожаловать на MosCulture</h3>
                                <div className="sub_title">
                                    Сайт о местах культурного наследия России и Мира
                                </div>
                            </div>
                            
                            </div>

                        </div>

                        </div>

            <div className='__container'>

                <div className='PageHeading'>
                    <div className='PageTile'>
                        Лучшие места
                    </div>
                    <div className='PageSubtitle'>
                        На сайте представлен список как исторических, так и современных мест культурного отдыха жителей Москвы и гостей столици
                    </div>
                </div>

                <div className='place__type-wrapper'>
                    {
                        categores
                            ? categores.map((item,index) =>
                                <div className='place__type'>
                                    <NavLink to={'/category/' + item.categoryUrl} className='place__type__link'>
                                        <div className='plase__type-img'
                                            style={{
                                                'backgroundImage': 'url(' + item.img + ')',
                                            }}
                                            classNmae='plase__type-card'>
                                            <span className='plase__type-title'>
                                                {item.category}
                                            </span>
                                        </div>

                                    </NavLink>
                                </div>)
                            : <Preloader />
                    }
                </div>



                <Popular />
            </div>
        </div>
    );
}

export default MainPage